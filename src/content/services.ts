import type { WhatsAppTopic } from '@/lib/whatsapp';

export type ServiceIcon = 'layers' | 'workflow' | 'blocks' | 'monitor' | 'refresh';

export type Service = {
  slug: string;
  title: string;
  short: string;
  lead: string;
  problem: string;
  deliverables: string[];
  suitable: string;
  icon: ServiceIcon;
  topic: WhatsAppTopic;
  cta: string;
};

export const services: Service[] = [
  {
    slug: 'sistemas-sob-medida',
    title: 'Sistemas sob medida',
    short: 'Plataformas, portais e ferramentas internas adaptadas ao seu processo.',
    lead: 'Um sistema construído em torno da sua operação.',
    problem:
      'Quando a equipe precisa contornar limitações de ferramentas prontas, o processo fica fragmentado e difícil de acompanhar.',
    deliverables: [
      'Mapeamento do processo e definição de prioridades',
      'Portais, painéis administrativos e dashboards',
      'Fluxos específicos para equipes, clientes ou parceiros',
      'Publicação, documentação e plano de evolução',
    ],
    suitable: 'Empresas com um processo importante que não se encaixa bem em sistemas genéricos.',
    icon: 'layers',
    topic: 'sistema',
    cta: 'Conversar sobre um sistema',
  },
  {
    slug: 'automacoes-integracoes',
    title: 'Automações e integrações',
    short: 'Conexões entre ferramentas e fluxos que reduzem tarefas manuais.',
    lead: 'Menos tarefas repetitivas. Mais tempo para o trabalho que importa.',
    problem:
      'Copiar dados, gerar os mesmos documentos e atualizar ferramentas separadamente consome tempo e cria oportunidades para erros.',
    deliverables: [
      'Mapeamento das tarefas repetitivas',
      'Integrações com APIs, CRM, ERP e planilhas',
      'Geração de documentos, alertas e relatórios',
      'Monitoramento do fluxo e tratamento de falhas',
    ],
    suitable:
      'Operações que dependem de planilhas, mensagens e retrabalho para manter informações atualizadas.',
    icon: 'workflow',
    topic: 'automacao',
    cta: 'Identificar uma automação',
  },
  {
    slug: 'mvp-produtos-digitais',
    title: 'MVPs e produtos digitais',
    short: 'Primeiras versões funcionais para colocar uma ideia validada em uso.',
    lead: 'Tire a ideia do papel com uma primeira versão focada no essencial.',
    problem:
      'Produtos grandes demais para a primeira versão demoram, custam mais e adiam o aprendizado com usuários reais.',
    deliverables: [
      'Definição do problema, público e fluxo principal',
      'Escopo da primeira versão e prototipação',
      'Desenvolvimento e validação em etapas',
      'Publicação e plano para os próximos ciclos',
    ],
    suitable:
      'Empresas e empreendedores com uma oportunidade validada e um responsável pelas decisões do produto.',
    icon: 'blocks',
    topic: 'mvp',
    cta: 'Conversar sobre meu MVP',
  },
  {
    slug: 'sites-profissionais',
    title: 'Sites profissionais',
    short: 'Presença digital clara, rápida e conectada aos canais comerciais.',
    lead: 'Um site preparado para representar a empresa e gerar oportunidades.',
    problem:
      'Um site genérico ou desatualizado não explica o valor da empresa e dificulta a conversão de novos contatos.',
    deliverables: [
      'Estrutura de conteúdo e mensagem comercial',
      'Site institucional ou landing page responsiva',
      'Integração com WhatsApp, CRM e mensuração',
      'SEO técnico e publicação',
    ],
    suitable:
      'Empresas que precisam fortalecer sua presença digital e transformar visitas em conversas comerciais.',
    icon: 'monitor',
    topic: 'site',
    cta: 'Conversar sobre meu site',
  },
  {
    slug: 'evolucao-sustentacao',
    title: 'Evolução contínua',
    short: 'Manutenção, melhorias e novas funcionalidades após a primeira entrega.',
    lead: 'Seu produto continua evoluindo depois do lançamento.',
    problem:
      'Sem acompanhamento, correções se acumulam, prioridades ficam dispersas e o produto deixa de acompanhar a operação.',
    deliverables: [
      'Correções e manutenção planejada',
      'Atualizações técnicas e acompanhamento',
      'Novas funcionalidades priorizadas',
      'Ciclos mensais de melhoria e aprendizado',
    ],
    suitable:
      'Empresas que precisam manter e ampliar um sistema ou produto digital com continuidade.',
    icon: 'refresh',
    topic: 'evolucao',
    cta: 'Conversar sobre evolução',
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
