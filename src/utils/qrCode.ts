/**
 * Codificador autónomo de Código QR (ISO/IEC 18004 · Modo Byte UTF-8 · Nivel M)
 * Cero dependencias externas y cero llamadas de red para máxima privacidad ejecutiva.
 * Soporta Versiones 1 a 6 (hasta 106 bytes UTF-8 en Nivel M).
 */

interface VersionSpec {
  version: number;
  totalCodewords: number;
  ecCodewordsPerBlock: number;
  numBlocks: number;
  alignmentCenters: number[];
}

// Especificación oficial ISO/IEC 18004 — Nivel de Corrección M (15% de recuperación)
const VERSION_SPECS_M: readonly VersionSpec[] = [
  { version: 1, totalCodewords: 26, ecCodewordsPerBlock: 10, numBlocks: 1, alignmentCenters: [] },
  { version: 2, totalCodewords: 44, ecCodewordsPerBlock: 16, numBlocks: 1, alignmentCenters: [6, 18] },
  { version: 3, totalCodewords: 70, ecCodewordsPerBlock: 26, numBlocks: 1, alignmentCenters: [6, 22] },
  { version: 4, totalCodewords: 100, ecCodewordsPerBlock: 18, numBlocks: 2, alignmentCenters: [6, 26] },
  { version: 5, totalCodewords: 134, ecCodewordsPerBlock: 24, numBlocks: 2, alignmentCenters: [6, 30] },
  { version: 6, totalCodewords: 172, ecCodewordsPerBlock: 16, numBlocks: 4, alignmentCenters: [6, 34] },
];

function gfMultiply(x: number, y: number): number {
  let z = 0;
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11d);
    z ^= ((y >>> i) & 1) * x;
  }
  return z;
}

function buildReedSolomonDivisor(degree: number): Uint8Array {
  const result = new Uint8Array(degree);
  result[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      result[j] = gfMultiply(result[j], root);
      if (j + 1 < degree) {
        result[j] ^= result[j + 1];
      }
    }
    root = gfMultiply(root, 0x02);
  }
  return result;
}

function computeReedSolomonRemainder(data: Uint8Array, divisor: Uint8Array): Uint8Array {
  const result = new Uint8Array(divisor.length);
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ result[0];
    result.copyWithin(0, 1);
    result[divisor.length - 1] = 0;
    for (let j = 0; j < divisor.length; j++) {
      result[j] ^= gfMultiply(divisor[j], factor);
    }
  }
  return result;
}

function applyMaskBit(mask: number, row: number, col: number): boolean {
  switch (mask) {
    case 0:
      return (row + col) % 2 === 0;
    case 1:
      return row % 2 === 0;
    case 2:
      return col % 3 === 0;
    case 3:
      return (row + col) % 3 === 0;
    case 4:
      return (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0;
    case 5:
      return ((row * col) % 2) + ((row * col) % 3) === 0;
    case 6:
      return (((row * col) % 2) + ((row * col) % 3)) % 2 === 0;
    default:
      return (((row + col) % 2) + ((row * col) % 3)) % 2 === 0;
  }
}

function drawFormatBits(
  modules: boolean[][],
  isFunction: boolean[][],
  mask: number
): void {
  const size = modules.length;
  // Nivel M = 00 en ISO/IEC 18004
  const data = (0b00 << 3) | mask;
  let rem = data;
  for (let i = 0; i < 10; i++) {
    rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
  }
  const bits = ((data << 10) | rem) ^ 0x5412;

  const setModule = (r: number, c: number, dark: boolean) => {
    modules[r][c] = dark;
    isFunction[r][c] = true;
  };

  // Primera copia alrededor de la esquina superior izquierda (MSB bit 14 -> LSB bit 0)
  const topCoords: Array<[number, number]> = [
    [8, 0],
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
    [8, 5],
    [8, 7],
    [8, 8],
    [7, 8],
    [5, 8],
    [4, 8],
    [3, 8],
    [2, 8],
    [1, 8],
    [0, 8],
  ];

  for (let i = 0; i < 15; i++) {
    const bitIndex = 14 - i;
    const isDark = ((bits >>> bitIndex) & 1) !== 0;
    const [r, c] = topCoords[i];
    setModule(r, c, isDark);
  }

  // Segunda copia dividida entre esquina inferior izquierda y superior derecha
  for (let i = 0; i < 7; i++) {
    const bitIndex = 14 - i;
    const isDark = ((bits >>> bitIndex) & 1) !== 0;
    setModule(size - 1 - i, 8, isDark);
  }
  for (let i = 0; i < 8; i++) {
    const bitIndex = 7 - i;
    const isDark = ((bits >>> bitIndex) & 1) !== 0;
    setModule(8, size - 8 + i, isDark);
  }

  // Módulo oscuro fijo obligatorio
  setModule(size - 8, 8, true);
}

function computePenalty(modules: boolean[][]): number {
  const size = modules.length;
  let penalty = 0;

  // Regla 1: 5+ módulos consecutivos del mismo color en filas y columnas
  for (let r = 0; r < size; r++) {
    let runColor = modules[r][0];
    let runLen = 1;
    for (let c = 1; c < size; c++) {
      if (modules[r][c] === runColor) {
        runLen++;
        if (runLen === 5) penalty += 3;
        else if (runLen > 5) penalty += 1;
      } else {
        runColor = modules[r][c];
        runLen = 1;
      }
    }
  }

  for (let c = 0; c < size; c++) {
    let runColor = modules[0][c];
    let runLen = 1;
    for (let r = 1; r < size; r++) {
      if (modules[r][c] === runColor) {
        runLen++;
        if (runLen === 5) penalty += 3;
        else if (runLen > 5) penalty += 1;
      } else {
        runColor = modules[r][c];
        runLen = 1;
      }
    }
  }

  // Regla 2: bloques homogéneos 2×2
  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      const color = modules[r][c];
      if (
        color === modules[r][c + 1] &&
        color === modules[r + 1][c] &&
        color === modules[r + 1][c + 1]
      ) {
        penalty += 3;
      }
    }
  }

  return penalty;
}

export function encodeQrMatrix(text: string): boolean[][] {
  const payload = new TextEncoder().encode(text);

  const spec = VERSION_SPECS_M.find((candidate) => {
    const dataCodewords =
      candidate.totalCodewords - candidate.ecCodewordsPerBlock * candidate.numBlocks;
    // 4 bits modo + 8 bits longitud = 12 bits -> caben dataCodewords - 2 bytes
    return payload.length <= dataCodewords - 2;
  });

  if (!spec) {
    throw new Error('El texto excede la capacidad de versión QR configurada.');
  }

  const dataCodewordsCount =
    spec.totalCodewords - spec.ecCodewordsPerBlock * spec.numBlocks;

  // 1. Construir flujo de bits (Modo Byte = 0100)
  const bits: number[] = [];
  const pushBits = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) {
      bits.push((val >>> i) & 1);
    }
  };

  pushBits(0b0100, 4);
  pushBits(payload.length, 8);
  for (let i = 0; i < payload.length; i++) {
    pushBits(payload[i], 8);
  }

  const capacityBits = dataCodewordsCount * 8;
  pushBits(0, Math.min(4, capacityBits - bits.length));
  while (bits.length % 8 !== 0) {
    bits.push(0);
  }

  const dataBytes = new Uint8Array(dataCodewordsCount);
  for (let i = 0; i < bits.length / 8; i++) {
    let byte = 0;
    for (let b = 0; b < 8; b++) {
      byte = (byte << 1) | bits[i * 8 + b];
    }
    dataBytes[i] = byte;
  }

  let padIndex = 0;
  for (let i = bits.length / 8; i < dataCodewordsCount; i++) {
    dataBytes[i] = padIndex % 2 === 0 ? 0xec : 0x11;
    padIndex++;
  }

  // 2. Bloques Reed-Solomon e intercalado
  const divisor = buildReedSolomonDivisor(spec.ecCodewordsPerBlock);
  const blockDataLen = Math.floor(dataCodewordsCount / spec.numBlocks);
  const dataBlocks: Uint8Array[] = [];
  const ecBlocks: Uint8Array[] = [];

  let offset = 0;
  for (let b = 0; b < spec.numBlocks; b++) {
    const slice = dataBytes.slice(offset, offset + blockDataLen);
    offset += blockDataLen;
    dataBlocks.push(slice);
    ecBlocks.push(computeReedSolomonRemainder(slice, divisor));
  }

  const allCodewords = new Uint8Array(spec.totalCodewords);
  let cwIdx = 0;
  for (let i = 0; i < blockDataLen; i++) {
    for (let b = 0; b < spec.numBlocks; b++) {
      allCodewords[cwIdx++] = dataBlocks[b][i];
    }
  }
  for (let i = 0; i < spec.ecCodewordsPerBlock; i++) {
    for (let b = 0; b < spec.numBlocks; b++) {
      allCodewords[cwIdx++] = ecBlocks[b][i];
    }
  }

  // 3. Construir matriz base y patrones funcionales
  const size = spec.version * 4 + 17;
  const baseModules: boolean[][] = Array.from({ length: size }, () =>
    Array<boolean>(size).fill(false)
  );
  const isFunction: boolean[][] = Array.from({ length: size }, () =>
    Array<boolean>(size).fill(false)
  );

  const setFunction = (r: number, c: number, dark: boolean) => {
    if (r < 0 || r >= size || c < 0 || c >= size) return;
    baseModules[r][c] = dark;
    isFunction[r][c] = true;
  };

  // Patrones de búsqueda 7×7 + separadores blancos
  const drawFinder = (topR: number, leftC: number) => {
    for (let dr = -1; dr <= 7; dr++) {
      for (let dc = -1; dc <= 7; dc++) {
        const dist = Math.max(Math.abs(dr - 3), Math.abs(dc - 3));
        const dark = dist !== 2 && dist !== 4;
        setFunction(topR + dr, leftC + dc, dark);
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  // Líneas de sincronización (Timing Patterns)
  for (let i = 8; i < size - 8; i++) {
    setFunction(6, i, i % 2 === 0);
    setFunction(i, 6, i % 2 === 0);
  }

  // Patrones de alineación 5×5
  const centers = spec.alignmentCenters;
  for (let i = 0; i < centers.length; i++) {
    for (let j = 0; j < centers.length; j++) {
      if (
        (i === 0 && j === 0) ||
        (i === 0 && j === centers.length - 1) ||
        (i === centers.length - 1 && j === 0)
      ) {
        continue;
      }
      const cr = centers[i];
      const cc = centers[j];
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const dist = Math.max(Math.abs(dr), Math.abs(dc));
          setFunction(cr + dr, cc + dc, dist !== 1);
        }
      }
    }
  }

  // Reservar bits de formato temporalmente
  drawFormatBits(baseModules, isFunction, 0);

  // 4. Colocación zig-zag de datos
  let bitIdx = 0;
  const totalDataBits = allCodewords.length * 8;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      const upward = ((right + 1) & 2) === 0;
      const r = upward ? size - 1 - vert : vert;
      for (let j = 0; j < 2; j++) {
        const c = right - j;
        if (!isFunction[r][c]) {
          let dark = false;
          if (bitIdx < totalDataBits) {
            const byte = allCodewords[bitIdx >>> 3];
            dark = ((byte >>> (7 - (bitIdx & 7))) & 1) !== 0;
            bitIdx++;
          }
          baseModules[r][c] = dark;
        }
      }
    }
  }

  // 5. Seleccionar la máscara (0..7) con menor penalización visual
  let bestMask = 0;
  let bestPenalty = Number.POSITIVE_INFINITY;
  let bestMatrix = baseModules;

  for (let mask = 0; mask < 8; mask++) {
    const candidate = baseModules.map((row) => [...row]);
    const fnCopy = isFunction.map((row) => [...row]);

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!fnCopy[r][c] && applyMaskBit(mask, r, c)) {
          candidate[r][c] = !candidate[r][c];
        }
      }
    }

    drawFormatBits(candidate, fnCopy, mask);
    const penalty = computePenalty(candidate);
    if (penalty < bestPenalty) {
      bestPenalty = penalty;
      bestMask = mask;
      bestMatrix = candidate;
    }
  }

  void bestMask;
  return bestMatrix;
}
