import type { Audience } from '@/lib/content-types';

export const audiences: Audience[] = [
  {
    title: 'Serviços B2B',
    description:
      'Consultorias, escritórios e operações que precisam organizar propostas, projetos e atendimento.',
    icon: 'services',
    solutions: ['Automação de propostas', 'Portal do cliente', 'Gestão de projetos'],
  },
  {
    title: 'Clínicas e saúde',
    description:
      'Negócios que querem integrar atendimento, agenda, indicadores e processos administrativos.',
    icon: 'health',
    solutions: ['Atendimento automatizado', 'Agenda e CRM integrados', 'Dashboard de agendamentos'],
  },
  {
    title: 'Distribuição e vendas',
    description:
      'Empresas que precisam estruturar pedidos, catálogos, vendedores e informações comerciais.',
    icon: 'distribution',
    solutions: ['Portal de pedidos B2B', 'Catálogo por cliente', 'App para vendedores'],
  },
  {
    title: 'Novos produtos',
    description: 'Empresas e empreendedores que precisam construir uma primeira versão funcional.',
    icon: 'product',
    solutions: ['Definição de escopo', 'Protótipo navegável', 'MVP publicado'],
  },
];
