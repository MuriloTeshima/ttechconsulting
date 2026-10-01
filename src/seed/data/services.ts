import type { Service } from '@/lib/content-types';

export const services: Service[] = [
  {
    slug: 'sistemas-sob-medida',
    seoTitle: 'Sistemas web sob medida para empresas',
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
    projectType: 'sistema',
    cta: 'Conversar sobre um sistema',
    examples: [
      {
        title: 'Portal do cliente',
        text: 'Documentos, solicitações e status em um só lugar para clientes e parceiros acompanharem o que foi pedido.',
      },
      {
        title: 'Painel administrativo',
        text: 'Cadastros, aprovações e regras do negócio centralizados para a equipe trabalhar no mesmo fluxo.',
      },
      {
        title: 'Dashboard gerencial',
        text: 'Indicadores de vendas, projetos ou produtividade atualizados, sem consolidar planilhas à mão.',
      },
      {
        title: 'Controle de operações',
        text: 'Pedidos, serviços ou agendamentos acompanhados do início ao fim, com histórico e responsáveis.',
      },
    ],
    faq: [
      {
        q: 'Qual a diferença entre um sistema sob medida e um software pronto?',
        a: 'Um software pronto faz a operação se adaptar a ele. Um sistema sob medida é construído em torno do processo da empresa e evolui junto com ela. Na conversa inicial avaliamos se uma ferramenta pronta já resolveria o problema.',
      },
      {
        q: 'Quanto tempo leva para desenvolver um sistema?',
        a: 'Depende do escopo, das integrações e das regras envolvidas. Projetos maiores começam por uma primeira entrega focada no fluxo principal, com prazo definido na proposta.',
      },
      {
        q: 'Como ficam a propriedade do código e a hospedagem?',
        a: 'A propriedade do código, a hospedagem e as responsabilidades de cada parte são definidas em contrato antes do início do projeto.',
      },
    ],
  },
  {
    slug: 'automacoes-integracoes',
    seoTitle: 'Automação de processos e integrações',
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
    projectType: 'automacao',
    cta: 'Identificar uma automação',
    examples: [
      {
        title: 'Documentos automáticos',
        text: 'Propostas, contratos e relatórios gerados a partir dos dados já cadastrados, com modelos padronizados.',
      },
      {
        title: 'Integração entre sistemas',
        text: 'CRM, ERP, planilhas e outras ferramentas conectados para a informação não ser digitada duas vezes.',
      },
      {
        title: 'Notificações e lembretes',
        text: 'Mensagens por e-mail ou WhatsApp enviadas no momento certo, sem depender de alguém lembrar.',
      },
      {
        title: 'Fluxos com inteligência artificial',
        text: 'Leitura, classificação e resumo de informações para apoiar a equipe em tarefas repetitivas.',
      },
    ],
    faq: [
      {
        q: 'Quais ferramentas vocês conseguem integrar?',
        a: 'Sistemas que oferecem API ou outro meio seguro de integração, como CRMs, ERPs, planilhas, e-mail e WhatsApp. A viabilidade de cada integração é confirmada na análise inicial.',
      },
      {
        q: 'Preciso trocar os sistemas que já uso?',
        a: 'Não necessariamente. Sempre que possível, a automação trabalha com as ferramentas que a equipe já utiliza.',
      },
      {
        q: 'O que acontece se uma integração falhar?',
        a: 'Os fluxos são monitorados e têm tratamento de falhas, para que problemas sejam identificados e corrigidos sem perda de informação.',
      },
    ],
  },
  {
    slug: 'mvp-produtos-digitais',
    seoTitle: 'MVP e desenvolvimento de produto digital',
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
    projectType: 'mvp',
    cta: 'Conversar sobre meu MVP',
    examples: [
      {
        title: 'Plataforma para um novo serviço',
        text: 'Uma versão funcional para testar com clientes reais um serviço que hoje é feito de forma manual.',
      },
      {
        title: 'Aplicação web para um novo negócio',
        text: 'O fluxo principal do produto construído primeiro, com espaço para crescer depois.',
      },
      {
        title: 'Ferramenta interna que vira produto',
        text: 'Uma solução criada para a própria operação, preparada para ser oferecida a outras empresas.',
      },
      {
        title: 'Protótipo navegável',
        text: 'Telas e fluxos para validar a ideia com usuários antes de investir no desenvolvimento completo.',
      },
    ],
    faq: [
      {
        q: 'O que é um MVP?',
        a: 'É a primeira versão funcional de um produto, com o essencial para ser usada por pessoas reais e gerar aprendizado antes de investimentos maiores.',
      },
      {
        q: 'Preciso ter a ideia validada antes de começar?',
        a: 'É o ideal. Trabalhamos melhor com ideias que já têm um público e um problema claros e com um responsável pelas decisões do produto.',
      },
      {
        q: 'O MVP pode evoluir para um produto completo?',
        a: 'Sim. A primeira versão é construída preparada para receber novas funcionalidades nos ciclos seguintes.',
      },
    ],
  },
  {
    slug: 'sites-profissionais',
    seoTitle: 'Criação de sites e landing pages',
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
    projectType: 'site',
    cta: 'Conversar sobre meu site',
    examples: [
      {
        title: 'Site institucional',
        text: 'Apresentação clara da empresa, dos serviços e dos diferenciais, com mensagem pensada para quem vai contratar.',
      },
      {
        title: 'Landing pages para campanhas',
        text: 'Páginas focadas em uma oferta específica, prontas para receber tráfego pago.',
      },
      {
        title: 'Integração com canais comerciais',
        text: 'WhatsApp, formulário de contato e CRM conectados para nenhuma oportunidade se perder.',
      },
      {
        title: 'SEO técnico e mensuração',
        text: 'Estrutura preparada para os buscadores e eventos de conversão configurados desde o lançamento.',
      },
    ],
    faq: [
      {
        q: 'O site já vem preparado para aparecer no Google?',
        a: 'Sim. A entrega inclui a estrutura técnica de SEO: títulos e descrições por página, sitemap, dados estruturados e bom desempenho no celular.',
      },
      {
        q: 'Vocês criam landing pages para anúncios?',
        a: 'Sim. Cada página é construída em torno de uma oferta e de um público, com a mensuração das conversões configurada.',
      },
      {
        q: 'Consigo atualizar o conteúdo depois?',
        a: 'A forma de atualização é definida no projeto, de acordo com a frequência das mudanças e com quem vai cuidar do conteúdo.',
      },
    ],
  },
  {
    slug: 'evolucao-sustentacao',
    seoTitle: 'Manutenção e evolução de sistemas',
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
    projectType: 'evolucao',
    cta: 'Conversar sobre evolução',
    examples: [
      {
        title: 'Correções e estabilidade',
        text: 'Problemas identificados e resolvidos com prioridade, para o sistema continuar funcionando bem.',
      },
      {
        title: 'Novas funcionalidades',
        text: 'Melhorias planejadas a partir do uso real e das prioridades do negócio.',
      },
      {
        title: 'Atualizações técnicas',
        text: 'Bibliotecas, dependências e infraestrutura mantidas em dia, com atenção à segurança.',
      },
      {
        title: 'Acompanhamento de desempenho',
        text: 'Monitoramento do uso e do funcionamento para antecipar ajustes antes que virem problemas.',
      },
    ],
    faq: [
      {
        q: 'Vocês assumem sistemas desenvolvidos por outras empresas?',
        a: 'Pode ser possível, depois de uma análise do código, da infraestrutura e da documentação existentes.',
      },
      {
        q: 'Como funciona o plano mensal?',
        a: 'Uma quantidade de trabalho por mês é definida em contrato para manutenção, melhorias e novas funcionalidades, priorizadas junto com a empresa.',
      },
      {
        q: 'Sou obrigado a contratar a evolução depois da entrega?',
        a: 'Não. A evolução mensal é uma opção para quem quer continuidade no produto depois da primeira versão.',
      },
    ],
  },
];
