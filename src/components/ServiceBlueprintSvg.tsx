import { motion } from 'framer-motion';
import type { ServiceId } from '../data/services';

interface ServiceBlueprintSvgProps {
  serviceId: ServiceId;
}

/**
 * Esquemas Geométricos / Blueprints Técnicos Animados (Decisión 3)
 * Cada uno de los 4 pilares cuenta con un diagrama vectorial horológico
 * único en trazos dorados finos con ejes de rotación matemáticamente exactos.
 */
export function ServiceBlueprintSvg({ serviceId }: ServiceBlueprintSvgProps) {
  switch (serviceId) {
    case 'web-ecosystems':
      return (
        <svg
          viewBox="0 0 360 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-full sm:h-28"
          aria-hidden="true"
        >
          {/* Marco de proporción áurea & retícula óptica */}
          <rect
            x="14"
            y="14"
            width="332"
            height="82"
            stroke="rgba(197,160,89,0.28)"
            strokeWidth="0.8"
          />
          <line x1="219" y1="14" x2="219" y2="96" stroke="rgba(197,160,89,0.24)" strokeWidth="0.8" />
          <line x1="219" y1="64" x2="346" y2="64" stroke="rgba(197,160,89,0.22)" strokeWidth="0.8" />
          <line
            x1="14"
            y1="55"
            x2="346"
            y2="55"
            stroke="rgba(197,160,89,0.12)"
            strokeDasharray="3 3"
            strokeWidth="0.75"
          />

          {/* Lente focal concéntrica centrada exactamente en (116, 55) */}
          <circle cx="116" cy="55" r="31" stroke="#C5A059" strokeOpacity="0.45" strokeWidth="0.9" />
          <g transform="translate(116, 55)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="0"
                cy="0"
                r="20"
                stroke="#E5C787"
                strokeWidth="1"
                strokeDasharray="6 4"
              />
            </motion.g>
          </g>
          <circle cx="116" cy="55" r="3" fill="#E5C787" />

          {/* Curva de fluidez a 60fps */}
          <motion.path
            d="M 28 74 C 66 74, 82 36, 116 36 C 150 36, 168 74, 206 74"
            stroke="#E5C787"
            strokeWidth="1.15"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 0.95 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />

          {/* Telemetría derecha */}
          <circle cx="250" cy="39" r="3.5" stroke="#C5A059" strokeWidth="1" />
          <line x1="258" y1="39" x2="328" y2="39" stroke="rgba(229,199,135,0.55)" strokeWidth="1" />
          <line x1="234" y1="80" x2="305" y2="80" stroke="rgba(197,160,89,0.4)" strokeWidth="0.9" />
          <circle cx="322" cy="80" r="2.2" fill="#C5A059" />
        </svg>
      );

    case 'bespoke-software':
      return (
        <svg
          viewBox="0 0 360 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-full sm:h-28"
          aria-hidden="true"
        >
          {/* Anillo orbital geoespacial */}
          <ellipse
            cx="180"
            cy="55"
            rx="132"
            ry="36"
            stroke="rgba(197,160,89,0.22)"
            strokeDasharray="4 4"
            strokeWidth="0.85"
          />
          <ellipse
            cx="180"
            cy="55"
            rx="76"
            ry="22"
            stroke="rgba(197,160,89,0.36)"
            strokeWidth="0.85"
          />

          {/* Líneas de microservicios desacoplados */}
          <motion.path
            d="M 68 55 L 146 55 M 214 55 L 292 55 M 180 21 L 180 37 M 180 73 L 180 89"
            stroke="#E5C787"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />

          {/* Núcleo hexagonal propietario */}
          <polygon
            points="180,35 198,45 198,65 180,75 162,65 162,45"
            stroke="#E5C787"
            strokeWidth="1.15"
            fill="rgba(197,160,89,0.08)"
          />
          <circle cx="180" cy="55" r="3" fill="#E5C787" />

          {/* Nodos satélites Cloud / API */}
          {[
            { x: 64, y: 55 },
            { x: 296, y: 55 },
            { x: 118, y: 28 },
            { x: 242, y: 28 },
            { x: 118, y: 82 },
            { x: 242, y: 82 },
          ].map((node, idx) => (
            <g key={idx}>
              <line
                x1={node.x}
                y1={node.y}
                x2="180"
                y2="55"
                stroke="rgba(197,160,89,0.22)"
                strokeWidth="0.7"
              />
              <rect
                x={node.x - 4.5}
                y={node.y - 4.5}
                width="9"
                height="9"
                stroke="#C5A059"
                strokeWidth="0.95"
                fill="#07070A"
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="1.7"
                fill="#E5C787"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 2.4, delay: idx * 0.25, repeat: Infinity }}
              />
            </g>
          ))}
        </svg>
      );

    case 'ai-agents':
      return (
        <svg
          viewBox="0 0 360 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-full sm:h-28"
          aria-hidden="true"
        >
          {/* Malla vectorial RAG izquierda y herramientas derecha */}
          <path
            d="M 42 30 L 138 55 M 42 55 L 138 55 M 42 80 L 138 55"
            stroke="rgba(197,160,89,0.32)"
            strokeWidth="0.85"
          />
          <path
            d="M 222 55 L 318 30 M 222 55 L 318 55 M 222 55 L 318 80"
            stroke="rgba(229,199,135,0.42)"
            strokeWidth="0.85"
          />

          {/* Anillo de orquestación cognitiva autónoma centrado en (180, 55) */}
          <circle cx="180" cy="55" r="40" stroke="rgba(197,160,89,0.35)" strokeWidth="0.9" />
          <g transform="translate(180, 55)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="0"
                cy="0"
                r="30"
                stroke="#E5C787"
                strokeWidth="1"
                strokeDasharray="12 8"
              />
              <circle cx="0" cy="-30" r="2.6" fill="#E5C787" />
              <circle cx="30" cy="0" r="2.2" fill="#C5A059" />
              <circle cx="-30" cy="0" r="2.2" fill="#C5A059" />
              <circle cx="0" cy="30" r="2.2" fill="#C5A059" />
            </motion.g>
          </g>

          {/* Núcleo Cognitivo Central */}
          <polygon
            points="180,39 196,55 180,71 164,55"
            stroke="#E5C787"
            strokeWidth="1.15"
            fill="rgba(197,160,89,0.1)"
          />
          <circle cx="180" cy="55" r="3.2" fill="#E5C787" />

          {/* Nodos de memoria documental (izquierda) y ejecución operativa (derecha) */}
          {[30, 55, 80].map((yPos, i) => (
            <g key={yPos}>
              <circle cx="42" cy={yPos} r="3.5" fill="#07070A" stroke="#C5A059" strokeWidth="1" />
              <motion.circle
                cx="318"
                cy={yPos}
                r="3.8"
                fill="#07070A"
                stroke="#E5C787"
                strokeWidth="1.05"
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 2.2, delay: i * 0.35, repeat: Infinity }}
              />
            </g>
          ))}
        </svg>
      );

    case 'data-science-ml':
      return (
        <svg
          viewBox="0 0 360 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-full sm:h-28"
          aria-hidden="true"
        >
          {/* Capas sinápticas de Red Neuronal Profunda */}
          {[26, 55, 84].map((y1) =>
            [34, 68].map((y2) => (
              <line
                key={`l1-${y1}-${y2}`}
                x1="44"
                y1={y1}
                x2="118"
                y2={y2}
                stroke="rgba(197,160,89,0.26)"
                strokeWidth="0.75"
              />
            ))
          )}
          {[34, 68].map((y1) =>
            [28, 55, 82].map((y2) => (
              <line
                key={`l2-${y1}-${y2}`}
                x1="118"
                y1={y1}
                x2="190"
                y2={y2}
                stroke="rgba(229,199,135,0.32)"
                strokeWidth="0.8"
              />
            ))
          )}

          {/* Nodos de capas neuronales */}
          {[26, 55, 84].map((y) => (
            <circle key={`n1-${y}`} cx="44" cy={y} r="3.2" fill="#07070A" stroke="#C5A059" strokeWidth="1" />
          ))}
          {[34, 68].map((y) => (
            <circle key={`n2-${y}`} cx="118" cy={y} r="3.8" fill="#07070A" stroke="#E5C787" strokeWidth="1.05" />
          ))}
          {[28, 55, 82].map((y) => (
            <circle key={`n3-${y}`} cx="190" cy={y} r="3.4" fill="#C5A059" />
          ))}

          {/* Plano derecho: Proyección probabilística y auditoría financiera */}
          <line x1="216" y1="88" x2="338" y2="88" stroke="rgba(197,160,89,0.35)" strokeWidth="0.85" />
          <line x1="216" y1="22" x2="216" y2="88" stroke="rgba(197,160,89,0.35)" strokeWidth="0.85" />

          {/* Banda de intervalo de confianza */}
          <path
            d="M 222 76 L 254 66 L 284 56 L 312 37 L 334 24 L 334 40 L 312 50 L 284 67 L 254 74 Z"
            fill="rgba(197,160,89,0.12)"
          />

          {/* Curva predictiva animada */}
          <motion.path
            d="M 222 76 L 254 68 L 284 60 L 312 42 L 334 30"
            stroke="#E5C787"
            strokeWidth="1.35"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
          />
          <circle cx="284" cy="60" r="3" fill="#07070A" stroke="#E5C787" strokeWidth="1.1" />
          <circle cx="334" cy="30" r="2.8" fill="#E5C787" />
        </svg>
      );
  }
}
