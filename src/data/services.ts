import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'project-management',
    index: '01',
    category: 'Execução com impacto',
    title: 'Project Management',
    description: 'Da visão à entrega: coordenamos projetos agrícolas com rigor, proximidade e foco em resultados mensuráveis.',
    bullets: ['Planeamento e coordenação ponta a ponta', 'Gestão de equipas e parceiros locais', 'Monitorização de metas e indicadores'],
    icon: 'project',
    accent: '#CFEEDC',
  },
  {
    id: 'advisory',
    index: '02',
    category: 'Conhecimento aplicado',
    title: 'Advisory & Consultoria Agrícola',
    description: 'Apoiamos decisões de investimento e produção em cadeias como soja, milho e algodão, com leitura local do mercado.',
    bullets: ['Estudos de viabilidade e mercado', 'Modelos de produção e cadeia de valor', 'Recomendações acionáveis para crescer'],
    icon: 'advisory',
    accent: '#EAF0D4',
  },
  {
    id: 'events',
    index: '03',
    category: 'Conexões que abrem portas',
    title: 'Eventos & Seminários',
    description: 'Desenhamos encontros que aproximam empresas, investidores e decisores — da BVM à Dubai Chamber.',
    bullets: ['Conceito, curadoria e produção', 'Moderação e conteúdos editoriais', 'Activação de parceiros e convidados'],
    icon: 'events',
    accent: '#F3E3C7',
  },
];
