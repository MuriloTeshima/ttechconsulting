import type { Project } from '@/lib/content-types';

export const projects: Project[] = [
  {
    type: 'PLATAFORMA WEB',
    title: 'Propostas comerciais e documentos em PDF',
    description:
      'Aplicação para organizar a criação de propostas, estruturar informações e gerar documentos comerciais com consistência.',
    problem:
      'Cada proposta era montada copiando um arquivo antigo, com risco de valores desatualizados, nomes trocados e versões diferentes circulando.',
    solution:
      'Aplicação web que reúne os dados da proposta em um só lugar e gera o PDF padronizado, sempre com a mesma estrutura.',
    isDemo: true,
    tags: ['Aplicação web', 'Automação', 'PDF'],
  },
  {
    type: 'AUTOMAÇÃO',
    title: 'Assistente para registros financeiros',
    description:
      'Fluxo conversacional para registrar movimentações, organizar categorias e facilitar consultas financeiras pelo Telegram.',
    problem:
      'Registrar gastos e consultar saldos dependia de abrir planilhas, e os lançamentos acabavam ficando para depois.',
    solution:
      'Assistente no Telegram que registra movimentações por mensagem, organiza as categorias e responde consultas financeiras.',
    isDemo: true,
    tags: ['Integração', 'IA', 'Mensageria'],
  },
  {
    type: 'EXPERIÊNCIA DIGITAL',
    title: 'Plataforma para locação de veículos',
    description:
      'Experiência web para apresentar veículos, explicar a jornada de locação e direcionar clientes para a reserva.',
    problem:
      'Clientes chegavam sem entender como funciona a locação e repetiam as mesmas dúvidas antes de reservar.',
    solution:
      'Site que apresenta os veículos, explica cada etapa da locação e leva o cliente direto para a reserva.',
    isDemo: true,
    tags: ['Website', 'Produto', 'Conversão'],
  },
];
