export type Project = { type: string; title: string; description: string; tags: string[] };

export const projects: Project[] = [
  {
    type: 'PLATAFORMA WEB',
    title: 'Propostas comerciais e documentos em PDF',
    description:
      'Aplicação para organizar a criação de propostas, estruturar informações e gerar documentos comerciais com consistência.',
    tags: ['Aplicação web', 'Automação', 'PDF'],
  },
  {
    type: 'AUTOMAÇÃO',
    title: 'Assistente para registros financeiros',
    description:
      'Fluxo conversacional para registrar movimentações, organizar categorias e facilitar consultas financeiras pelo Telegram.',
    tags: ['Integração', 'IA', 'Mensageria'],
  },
  {
    type: 'EXPERIÊNCIA DIGITAL',
    title: 'Plataforma para locação de veículos',
    description:
      'Experiência web para apresentar veículos, explicar a jornada de locação e direcionar clientes para a reserva.',
    tags: ['Website', 'Produto', 'Conversão'],
  },
];
