export type ServiceId =
  | 'arquitectura-web'
  | 'software-medida'
  | 'agentes-ia'
  | 'ciencia-datos';

export interface ServicePillar {
  id: ServiceId;
  index: '01' | '02' | '03' | '04';
  title: string;
  subtitle: string;
  shortLabel: string;
  description: string;
  capabilities: readonly string[];
  businessImpact: string;
}

export interface PhilosophyPillar {
  romanIndex: 'I' | 'II' | 'III';
  title: string;
  description: string;
}

export const HERO_MANIFESTO = {
  overline: 'Firma de Ingeniería y Arquitectura de Software',
  headlinePrefix: 'Ingeniería de software con ',
  headlineHighlight: 'precisión de alta relojería',
  headlineSuffix: ' y arquitectura sin límites.',
  paragraph:
    'En Dulcey & Co. concebimos cada sistema digital como una pieza única de ingeniería. Integramos diseño web de alto impacto, desarrollo de software propietario, agentes autónomos de inteligencia artificial y modelos matemáticos predictivos para convertir la complejidad operativa de su empresa en una ventaja competitiva duradera.',
} as const;

export const SERVICES_DATA: readonly ServicePillar[] = [
  {
    id: 'arquitectura-web',
    index: '01',
    title: 'Arquitectura Web y Ecosistemas Digitales',
    subtitle: 'Diseño de Autor, Comercio Electrónico y Plataformas de Alto Rendimiento',
    shortLabel: 'Arquitectura Web y Comercio Electrónico',
    description:
      'Desarrollamos presencias institucionales y plataformas comerciales que se apartan de lo convencional. Cada interfaz responde a criterios rigurosos de proporción, velocidad y sobriedad estética para proyectar autoridad inmediata y ofrecer una experiencia impecable en computador y teléfono móvil.',
    capabilities: [
      'Diseño de Interfaz y Experiencia de Firma',
      'Comercio Electrónico de Alta Conversión',
      'Arquitectura Web de Respuesta Inmediata',
      'Animación Editorial y Gráficos Interactivos',
    ],
    businessImpact:
      'Posicionamiento institucional inmediato, tiempos de carga inferiores a un segundo y permanencia superior.',
  },
  {
    id: 'software-medida',
    index: '02',
    title: 'Ingeniería de Software a Medida',
    subtitle: 'Sistemas Propietarios, Arquitecturas Escalables y Plataformas Corporativas',
    shortLabel: 'Ingeniería de Software a Medida',
    description:
      'Cuando las herramientas comerciales genéricas resultan insuficientes, diseñamos y construimos el núcleo tecnológico exacto que su operación exige. Desde plataformas de dirección interna y sistemas geoespaciales hasta infraestructuras en la nube preparadas para crecer sin fricciones.',
    capabilities: [
      'Desarrollo Integral de Sistemas Propietarios',
      'Arquitectura Modular e Integración por API',
      'Sistemas Geoespaciales y Operación en Tiempo Real',
      'Seguridad y Escalabilidad en la Nube',
    ],
    businessImpact:
      'Eliminación de cuellos de botella operativos, propiedad intelectual íntegra para su empresa y ajuste exacto a sus reglas de negocio.',
  },
  {
    id: 'agentes-ia',
    index: '03',
    title: 'Inteligencia Artificial y Agentes Empresariales',
    subtitle: 'Fuerza Laboral Digital, Automatización Cognitiva y Agentes Autónomos',
    shortLabel: 'Inteligencia Artificial y Agentes',
    description:
      'Incorporamos modelos avanzados de inteligencia artificial directamente en la operación diaria de su compañía. Desplegamos agentes capaces de atender clientes, consultar catálogos, elaborar cotizaciones, procesar documentación interna y operar de forma ininterrumpida con criterio empresarial.',
    capabilities: [
      'Agentes de IA Conversacionales y Operativos',
      'Modelos de Lenguaje sobre Documentación Propia',
      'Automatización de Procesos Comerciales',
      'Atención Ejecutiva y Operación Continua',
    ],
    businessImpact:
      'Reducción sustancial de costos operativos, atención inmediata sin errores manuales y capacidad comercial continua.',
  },
  {
    id: 'ciencia-datos',
    index: '04',
    title: 'Ciencia de Datos y Analítica Predictiva',
    subtitle: 'Redes Neuronales, Cruce Relacional de Datos y Auditoría Algorítmica',
    shortLabel: 'Ciencia de Datos y Redes Neuronales',
    description:
      'Transformamos registros dispersos en decisiones financieras precisas. Mediante aprendizaje automático, redes neuronales profundas y minería de datos, cruzamos múltiples tablas operativas para descubrir correlaciones ocultas, detectar líneas de negocio con pérdidas silenciosas y proyectar escenarios futuros con rigor matemático.',
    capabilities: [
      'Cruce Relacional de Tablas y Minería de Datos',
      'Aprendizaje Automático y Redes Neuronales Profundas',
      'Detección de Fugas de Capital y Pérdidas Ocultas',
      'Modelos Predictivos y Proyección de Demanda',
    ],
    businessImpact:
      'Visibilidad financiera exacta, detección de patrones invisibles a simple vista y decisiones respaldadas por probabilidad matemática.',
  },
] as const;

export const PHILOSOPHY_PILLARS: readonly PhilosophyPillar[] = [
  {
    romanIndex: 'I',
    title: 'Rigor Matemático',
    description:
      'Código limpio, arquitecturas sólidas y algoritmos eficientes concebidos bajo principios formales de ingeniería de sistemas.',
  },
  {
    romanIndex: 'II',
    title: 'Estética de Autor',
    description:
      'Interfaces que proyectan autoridad serena. Cuidamos cada proporción tipográfica, transición y silencio visual como una pieza de colección.',
  },
  {
    romanIndex: 'III',
    title: 'Confidencialidad y Exclusividad',
    description:
      'Tratamiento estrictamente reservado de los datos, modelos matemáticos y lógica operativa de cada cliente bajo estándares directivos.',
  },
] as const;
