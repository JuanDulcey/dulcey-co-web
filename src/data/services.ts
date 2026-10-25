export type ServiceId =
  | 'web-ecosystems'
  | 'bespoke-software'
  | 'ai-agents'
  | 'data-science-ml';

export interface ServicePillar {
  id: ServiceId;
  index: '01' | '02' | '03' | '04';
  title: string;
  subtitle: string;
  modalLabel: string;
  description: string;
  capabilities: readonly string[];
  businessImpact: string;
  architectureCode: string;
  architectureSummary: string;
  useCases: readonly {
    title: string;
    detail: string;
  }[];
}

export interface PhilosophyPillar {
  romanIndex: 'I' | 'II' | 'III';
  title: string;
  description: string;
  code: string;
}

export const HERO_MANIFESTO = {
  tag: '[ 00 // MANIFIESTO DE PRECISIÓN ]',
  headlinePrefix: 'Ingeniería de software con ',
  headlineHighlight: 'precisión de alta relojería',
  headlineSuffix: ' y arquitectura sin límites.',
  paragraph:
    'En Dulcey & Co. concebimos cada sistema digital como una pieza única de ingeniería. Fusionamos diseño web de alto impacto, desarrollo de software a medida, agentes autónomos de inteligencia artificial y modelos matemáticos predictivos para transformar la complejidad de su negocio en ventaja competitiva absoluta.',
} as const;

export const SERVICES_DATA: readonly ServicePillar[] = [
  {
    id: 'web-ecosystems',
    index: '01',
    title: 'Arquitectura Web & Ecosistemas Digitales',
    subtitle: 'Diseño de Autor, E-Commerce & Plataformas de Alto Rendimiento',
    modalLabel: 'Web / E-commerce',
    description:
      'Desarrollamos presencias digitales y tiendas en línea que desafían lo convencional. Cada interfaz está diseñada bajo estándares estéticos de lujo, optimizada al milisegundo para ofrecer transiciones fluidas, máxima conversión comercial y una experiencia impecable tanto en dispositivos móviles como en escritorio.',
    capabilities: [
      'Diseño UI/UX de Élite',
      'E-Commerce de Alta Conversión',
      'Arquitectura Frontend Ultrarrápida',
      'Animaciones & WebGL/Canvas',
    ],
    businessImpact:
      'Posicionamiento de marca inmediato, tiempos de carga inferiores a 1 segundo y retención visual superior.',
    architectureCode: 'SPEC-01 // EDGE RENDER & BESPOKE INTERACTION',
    architectureSummary:
      'Distribución en nodos Edge globales, renderizado reactivo sub-segundo y motores gráficos acelerados por hardware.',
    useCases: [
      {
        title: 'Flagships Digitales de Firma',
        detail:
          'Portales corporativos de autor que proyectan autoridad institucional y diferencian marcas de alto ticket.',
      },
      {
        title: 'E-Commerce de Lujo & Catálogos Complejos',
        detail:
          'Flujos de compra sin fricción, pasarelas blindadas y visualización interactiva de producto.',
      },
      {
        title: 'Showrooms & Experiencias Interactivas',
        detail:
          'Micro-interacciones a 60 FPS y narrativas visuales diseñadas para maximizar permanencia y conversión.',
      },
    ],
  },
  {
    id: 'bespoke-software',
    index: '02',
    title: 'Ingeniería de Software a Medida',
    subtitle: 'Sistemas Propietarios, Arquitecturas Escalables & Plataformas Corporativas',
    modalLabel: 'Software a Medida',
    description:
      'Cuando el software comercial genérico se queda corto, diseñamos y construimos el motor tecnológico exacto que su operación demanda. Desde plataformas de gestión interna y sistemas geoespaciales hasta infraestructuras en la nube capaces de escalar sin fricciones.',
    capabilities: [
      'Desarrollo Full-Stack a Medida',
      'Arquitectura de Microservicios & APIs',
      'Sistemas Geoespaciales & Tiempo Real',
      'Seguridad & Escalabilidad Cloud',
    ],
    businessImpact:
      'Automatización de cuellos de botella operativos, propiedad intelectual 100% suya y acoplamiento perfecto a las reglas de su empresa.',
    architectureCode: 'SPEC-02 // DISTRIBUTED CORE & CLOUD TOPOLOGY',
    architectureSummary:
      'Núcleos modulares desacoplados, sincronización en tiempo real, trazabilidad criptográfica y alta disponibilidad.',
    useCases: [
      {
        title: 'ERPs & Núcleos Operativos Propietarios',
        detail:
          'Plataformas centrales diseñadas exactamente alrededor de sus reglas financieras, logísticas y de auditoría.',
      },
      {
        title: 'Inteligencia Geoespacial & Telemetría Viva',
        detail:
          'Monitoreo de activos en mapa, ruteo dinámico y paneles de mando con actualización en milisegundos.',
      },
      {
        title: 'Ecosistemas B2B & Orquestación de APIs',
        detail:
          'Integración limpia entre sistemas heredados, bancos, facturación y servicios en la nube sin tiempos muertos.',
      },
    ],
  },
  {
    id: 'ai-agents',
    index: '03',
    title: 'Inteligencia Artificial & Agentes para Negocios',
    subtitle: 'Fuerza Laboral Digital, Automatización Cognitiva & Agentes Autónomos',
    modalLabel: 'Agentes IA',
    description:
      'Integramos modelos avanzados de Inteligencia Artificial directamente en el flujo de trabajo de su empresa. Desplegamos agentes inteligentes capaces de atender clientes, consultar catálogos, calcular presupuestos, ejecutar tareas administrativas y operar 24/7 con criterio empresarial.',
    capabilities: [
      'Agentes IA Conversacionales & Operativos',
      'Integración de LLMs & RAG',
      'Automatización de Flujos Comerciales',
      'Asistentes de Ventas & Soporte 24/7',
    ],
    businessImpact:
      'Reducción drástica de costos operativos, atención inmediata sin errores humanos y escalabilidad comercial ilimitada.',
    architectureCode: 'SPEC-03 // COGNITIVE MULTI-AGENT & RAG MESH',
    architectureSummary:
      'Memoria vectorial privada sobre documentos corporativos, ejecución segura de herramientas (Tool-Calling) y supervisión determinista.',
    useCases: [
      {
        title: 'Ejecutivos Comerciales Autónomos 24/7',
        detail:
          'Calificación de prospectos, consulta de inventario en vivo y cotización precisa por WhatsApp y canales web.',
      },
      {
        title: 'Cerebros Corporativos Privados (RAG)',
        detail:
          'Consulta instantánea sobre contratos, manuales técnicos y bases documentales internas con citas verificables.',
      },
      {
        title: 'Back-Office Cognitivo Automatizado',
        detail:
          'Agentes que procesan solicitudes, concilian documentos y disparan acciones en su CRM o ERP sin intervención manual.',
      },
    ],
  },
  {
    id: 'data-science-ml',
    index: '04',
    title: 'Ciencia de Datos, Machine Learning & Analítica Predictiva',
    subtitle: 'Redes Neuronales, Cruce Relacional de Datos & Auditoría Algorítmica',
    modalLabel: 'Ciencia de Datos / Redes Neuronales',
    description:
      'Transformamos bases de datos dispersas en decisiones financieras exactas. Mediante algoritmos de Machine Learning, redes neuronales profundas y minería de datos, cruzamos múltiples tablas operativas para descubrir correlaciones ocultas, detectar si una línea de negocio está entrando en pérdidas invisibles y proyectar escenarios futuros con rigor matemático.',
    capabilities: [
      'Cruce Relacional de Tablas & Data Mining',
      'Redes Neuronales & Deep Learning',
      'Detección de Fugas de Capital & Pérdidas',
      'Modelos Predictivos & Proyección de Demanda',
    ],
    businessImpact:
      'Visibilidad financiera total, descubrimiento de patrones invisibles al ojo humano y decisiones respaldadas por probabilidad matemática.',
    architectureCode: 'SPEC-04 // NEURAL TENSOR & ALGORITHMIC AUDIT',
    architectureSummary:
      'Pipelines de reconciliación multi-tabla, detección estadística de anomalías y modelos neuronales de pronóstico financiero.',
    useCases: [
      {
        title: 'Auditoría Algorítmica de Fugas de Margen',
        detail:
          'Cruce de ventas, costos, descuentos e inventarios para aislar líneas, sedes o SKUs con pérdidas silenciosas.',
      },
      {
        title: 'Pronóstico de Demanda & Flujo de Caja',
        detail:
          'Redes neuronales entrenadas con su histórico real para anticipar compras, estacionalidad y capital de trabajo.',
      },
      {
        title: 'Scoring de Riesgo & Retención de Clientes',
        detail:
          'Modelos probabilísticos que detectan deserción temprana de cuentas clave y oportunidades de venta cruzada.',
      },
    ],
  },
] as const;

export const PHILOSOPHY_PILLARS: readonly PhilosophyPillar[] = [
  {
    romanIndex: 'I',
    title: 'I. RIGOR MATEMÁTICO',
    description:
      'Código limpio, arquitecturas sólidas y algoritmos eficientes diseñados bajo principios formales de ingeniería de sistemas.',
    code: 'AXIOM // 01',
  },
  {
    romanIndex: 'II',
    title: 'II. ESTÉTICA DE AUTOR',
    description:
      'Interfaces que proyectan autoridad. Cuidamos cada tipografía, transición y espacio negativo como una pieza de colección.',
    code: 'AXIOM // 02',
  },
  {
    romanIndex: 'III',
    title: 'III. CONFIDENCIALIDAD & EXCLUSIVIDAD',
    description:
      'Tratamiento reservado de los datos, modelos y lógica de negocio de cada cliente bajo estándares ejecutivos.',
    code: 'AXIOM // 03',
  },
] as const;
