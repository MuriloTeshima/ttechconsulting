import type { RequiredDataFromCollectionSlug } from 'payload';

type QuizData = RequiredDataFromCollectionSlug<'quizzes'>;

/** Primeiro quiz: diagnóstico de operação fora do ERP (nicho de empresas médias com ERP). */
export const erpQuiz: Omit<QuizData, 'generateSlug'> = {
  title: 'Diagnóstico de operação fora do ERP',
  slug: 'operacao-fora-do-erp',
  segment: 'Empresas com ERP',
  projectType: 'sistema',
  index: true,
  eyebrow: 'DIAGNÓSTICO GRATUITO',
  headline: 'Quanto da sua operação acontece fora do ERP?',
  description:
    'Responda 8 perguntas rápidas e descubra onde sua empresa perde tempo com planilhas, redigitação e controles paralelos, e quais soluções fazem sentido para começar.',
  startLabel: 'Começar diagnóstico',
  estimatedTime: 'Leva cerca de 2 minutos',
  questions: [
    {
      blockType: 'single',
      key: 'porte',
      question: 'Quantas pessoas trabalham na empresa?',
      required: true,
      options: [
        { label: 'Até 20', points: 0 },
        { label: 'De 21 a 50', points: 0 },
        { label: 'De 51 a 200', points: 0 },
        { label: 'Mais de 200', points: 0 },
      ],
    },
    {
      blockType: 'single',
      key: 'erp',
      question: 'Qual ERP a empresa usa hoje?',
      required: true,
      options: [
        { label: 'TOTVS Protheus', points: 0 },
        { label: 'Sankhya', points: 0 },
        { label: 'Omie', points: 0 },
        { label: 'Bling', points: 0 },
        { label: 'Outro ERP', points: 0 },
        { label: 'Ainda não usamos ERP', points: 3, recommends: 'sistema-interno' },
      ],
    },
    {
      blockType: 'multiple',
      key: 'processos',
      question: 'Quais processos acontecem fora do ERP hoje?',
      help: 'Considere tudo o que depende de planilha, WhatsApp, e-mail ou redigitação.',
      required: true,
      options: [
        {
          label: 'Pedidos recebidos por WhatsApp ou e-mail',
          points: 3,
          recommends: 'portal-pedidos',
        },
        {
          label: 'Consulta de estoque e preço pelos vendedores',
          points: 3,
          recommends: 'app-equipe-externa',
        },
        {
          label: 'Ordens de serviço ou atividades da equipe em campo',
          points: 3,
          recommends: 'app-equipe-externa',
        },
        {
          label: 'Relatórios e indicadores montados em planilha',
          points: 3,
          recommends: 'paineis',
        },
        { label: 'Comissões ou metas calculadas em planilha', points: 2, recommends: 'paineis' },
        {
          label: 'Clientes pedindo status de pedidos e entregas',
          points: 2,
          recommends: 'portal-cliente',
        },
        { label: 'Nenhum, tudo passa pelo ERP', points: 0 },
      ],
    },
    {
      blockType: 'scale',
      key: 'retrabalho',
      question:
        'Quanto tempo a equipe perde copiando ou conferindo informações entre sistemas e planilhas?',
      required: true,
      minLabel: 'Quase nada',
      maxLabel: 'Muito tempo',
      weight: 2,
    },
    {
      blockType: 'number',
      key: 'pessoas',
      question: 'Quantas pessoas trabalham nesses processos manuais?',
      help: 'Uma estimativa é suficiente.',
      required: true,
      unit: 'pessoas',
      placeholder: 'Ex.: 4',
      ranges: [
        { min: 0, max: 1, points: 0 },
        { min: 2, max: 5, points: 2 },
        { min: 6, max: 15, points: 4 },
        { min: 16, points: 5 },
      ],
    },
    {
      blockType: 'single',
      key: 'erros',
      question: 'Com que frequência acontecem erros por informação digitada ou desatualizada?',
      required: true,
      options: [
        { label: 'Raramente', points: 0 },
        { label: 'Algumas vezes por mês', points: 2 },
        { label: 'Toda semana', points: 4, recommends: 'integracao' },
        { label: 'Todos os dias', points: 5, recommends: 'integracao' },
      ],
    },
    {
      blockType: 'single',
      key: 'urgencia',
      question: 'Quando vocês gostariam de resolver isso?',
      required: true,
      options: [
        { label: 'Agora, já é prioridade', points: 3 },
        { label: 'Nos próximos 3 meses', points: 2 },
        { label: 'Ainda estamos avaliando', points: 1 },
        { label: 'Sem previsão', points: 0 },
      ],
    },
    {
      blockType: 'text',
      key: 'contexto',
      question: 'Quer contar algo mais sobre a operação?',
      required: false,
      placeholder: 'Ex.: o processo que mais gera retrabalho hoje.',
    },
  ],
  solutions: [
    {
      key: 'portal-pedidos',
      title: 'Portal de pedidos B2B',
      description:
        'Clientes e representantes fazem pedidos com o catálogo e as condições de cada um, e o pedido entra direto no ERP.',
    },
    {
      key: 'app-equipe-externa',
      title: 'App para vendedores e técnicos',
      description:
        'Estoque, preço e histórico do cliente na mão da equipe externa, com lançamento de pedidos ou ordens de serviço integrado ao sistema.',
    },
    {
      key: 'paineis',
      title: 'Painéis e relatórios automáticos',
      description:
        'Indicadores de vendas, operação e comissões atualizados com os dados do ERP, sem montar planilha.',
    },
    {
      key: 'portal-cliente',
      title: 'Portal do cliente',
      description:
        'Status de pedidos, entregas e documentos em um só lugar, sem depender de ligação ou mensagem.',
    },
    {
      key: 'integracao',
      title: 'Integração entre sistemas',
      description:
        'Conexão do ERP com as demais ferramentas da empresa, para a informação não ser digitada duas vezes.',
    },
    {
      key: 'sistema-interno',
      title: 'Sistema sob medida para o processo central',
      description:
        'Antes de um ERP completo, um sistema focado no processo que mais pesa na operação, preparado para crescer.',
    },
  ],
  results: [
    {
      title: 'Operação bem integrada',
      minScore: 0,
      summary:
        'Pelas suas respostas, a maior parte da operação já passa pelo sistema. Ainda assim, automações pontuais e painéis podem tirar o trabalho manual que sobrou e dar mais visibilidade à gestão.',
    },
    {
      title: 'Retrabalho em pontos específicos',
      minScore: 10,
      summary:
        'Alguns processos importantes ainda dependem de planilhas e redigitação. Integrar esses pontos ao ERP costuma ser o melhor primeiro passo: escopo enxuto e ganho visível para a equipe.',
    },
    {
      title: 'Operação dependente de planilhas',
      minScore: 20,
      summary:
        'Boa parte da operação acontece fora do ERP, com retrabalho e risco de erro frequentes. Vale mapear o processo mais crítico e começar por ele, integrando ao sistema em etapas.',
    },
  ],
  whatsappMessage:
    'Olá! Fiz o diagnóstico de operação fora do ERP no site da TTech e gostaria de conversar sobre o resultado.',
  leadTitle: 'Seu diagnóstico está pronto.',
  leadDescription:
    'Informe seus dados para ver o resultado e as soluções indicadas para a sua operação.',
  askCompany: true,
  askRole: true,
  submitLabel: 'Ver meu resultado',
  metaTitle: 'Diagnóstico de operação fora do ERP',
  metaDescription:
    'Responda 8 perguntas e descubra onde sua empresa perde tempo com planilhas e redigitação fora do ERP, e quais soluções fazem sentido para começar.',
};

/** Diagnóstico de automação de propostas, contratos e relatórios (empresas de serviços B2B). */
export const documentsQuiz: Omit<QuizData, 'generateSlug'> = {
  title: 'Diagnóstico de automação de documentos',
  slug: 'automacao-documentos',
  segment: 'Serviços B2B',
  projectType: 'automacao',
  index: true,
  eyebrow: 'DIAGNÓSTICO GRATUITO',
  headline: 'Quanto das suas propostas e relatórios pode ser automatizado?',
  description:
    'Responda 8 perguntas sobre como sua equipe produz propostas, contratos e relatórios e descubra onde a automação traz mais ganho de tempo e consistência.',
  startLabel: 'Começar diagnóstico',
  estimatedTime: 'Leva cerca de 2 minutos',
  questions: [
    {
      blockType: 'single',
      key: 'segmento',
      question: 'Qual é o tipo da empresa?',
      required: true,
      options: [
        { label: 'Consultoria', points: 0 },
        { label: 'Escritório contábil', points: 0 },
        { label: 'Agência', points: 0 },
        { label: 'BPO ou serviços administrativos', points: 0 },
        { label: 'Engenharia ou arquitetura', points: 0 },
        { label: 'Outro', points: 0 },
      ],
    },
    {
      blockType: 'multiple',
      key: 'documentos',
      question: 'Quais documentos a equipe produz com frequência?',
      required: true,
      options: [
        { label: 'Propostas comerciais', points: 2, recommends: 'gerador-propostas' },
        { label: 'Contratos', points: 2, recommends: 'contratos' },
        { label: 'Relatórios periódicos para clientes', points: 3, recommends: 'relatorios' },
        { label: 'Laudos, ordens de serviço ou checklists', points: 2, recommends: 'relatorios' },
        { label: 'Cobranças e recibos', points: 1, recommends: 'integracao' },
      ],
    },
    {
      blockType: 'single',
      key: 'como',
      question: 'Como esses documentos são montados hoje?',
      required: true,
      options: [
        {
          label: 'Copiando e editando arquivos antigos',
          points: 4,
          recommends: 'gerador-propostas',
        },
        { label: 'Com modelos padronizados preenchidos à mão', points: 2 },
        { label: 'Uma ferramenta gera parte, com ajustes manuais', points: 1 },
        { label: 'Já são gerados automaticamente', points: 0 },
      ],
    },
    {
      blockType: 'number',
      key: 'volume',
      question: 'Quantos documentos a equipe produz por mês, aproximadamente?',
      help: 'Some propostas, contratos e relatórios.',
      required: true,
      unit: 'documentos',
      placeholder: 'Ex.: 40',
      ranges: [
        { min: 0, max: 10, points: 0 },
        { min: 11, max: 50, points: 2 },
        { min: 51, max: 200, points: 4 },
        { min: 201, points: 5 },
      ],
    },
    {
      blockType: 'scale',
      key: 'erros',
      question: 'Com que frequência aparecem erros de valores, nomes ou versões nos documentos?',
      required: true,
      minLabel: 'Quase nunca',
      maxLabel: 'Com frequência',
      weight: 2,
    },
    {
      blockType: 'single',
      key: 'acompanhamento',
      question: 'Vocês sabem o que foi enviado, visualizado e aprovado pelo cliente?',
      required: true,
      options: [
        { label: 'Sim, em um sistema', points: 0 },
        { label: 'Mais ou menos, por e-mail e planilha', points: 2, recommends: 'integracao' },
        { label: 'Não acompanhamos', points: 3, recommends: 'integracao' },
      ],
    },
    {
      blockType: 'single',
      key: 'urgencia',
      question: 'Quando vocês gostariam de resolver isso?',
      required: true,
      options: [
        { label: 'Agora, já é prioridade', points: 3 },
        { label: 'Nos próximos 3 meses', points: 2 },
        { label: 'Ainda estamos avaliando', points: 1 },
        { label: 'Sem previsão', points: 0 },
      ],
    },
    {
      blockType: 'text',
      key: 'contexto',
      question: 'Qual documento mais consome tempo da equipe hoje?',
      required: false,
      placeholder: 'Ex.: o relatório mensal que enviamos para cada cliente.',
    },
  ],
  solutions: [
    {
      key: 'gerador-propostas',
      title: 'Gerador de propostas',
      description:
        'Propostas em PDF montadas a partir do cadastro do cliente e dos serviços escolhidos, com preços e condições sempre atualizados.',
    },
    {
      key: 'contratos',
      title: 'Contratos a partir da proposta aprovada',
      description:
        'O contrato nasce com os dados da proposta, sem redigitação, e pode seguir para assinatura eletrônica.',
    },
    {
      key: 'relatorios',
      title: 'Relatórios automáticos para clientes',
      description:
        'Relatórios periódicos, laudos e checklists gerados a partir dos dados já registrados, no padrão visual da empresa.',
    },
    {
      key: 'integracao',
      title: 'Integração com CRM, e-mail e financeiro',
      description:
        'Envio, acompanhamento e aprovação registrados automaticamente, com aviso ao financeiro quando o cliente aprovar.',
    },
  ],
  results: [
    {
      title: 'Processo já organizado',
      minScore: 0,
      summary:
        'Pelas suas respostas, a produção de documentos já é bem estruturada. Ajustes pontuais, como integrar o envio ao CRM ou ao financeiro, ainda podem tirar tarefas manuais da equipe.',
    },
    {
      title: 'Boas oportunidades de automação',
      minScore: 10,
      summary:
        'Parte importante dos documentos ainda depende de cópia e preenchimento manual. Padronizar os modelos e automatizar a geração costuma trazer ganho rápido de tempo e consistência.',
    },
    {
      title: 'Alto potencial de automação',
      minScore: 20,
      summary:
        'A equipe gasta muito tempo montando e conferindo documentos, com risco frequente de erro. Vale começar pelo documento de maior volume e automatizar o fluxo em etapas, da geração à aprovação.',
    },
  ],
  whatsappMessage:
    'Olá! Fiz o diagnóstico de automação de documentos no site da TTech e gostaria de conversar sobre o resultado.',
  leadTitle: 'Seu diagnóstico está pronto.',
  leadDescription:
    'Informe seus dados para ver o resultado e as automações indicadas para o seu processo.',
  askCompany: true,
  askRole: true,
  submitLabel: 'Ver meu resultado',
  metaTitle: 'Diagnóstico de automação de documentos',
  metaDescription:
    'Descubra quanto das propostas, contratos e relatórios da sua empresa pode ser automatizado. 8 perguntas, resultado na hora.',
};

/** Teste de prontidão para MVP (empreendedores e empresas criando um produto digital). */
export const mvpQuiz: Omit<QuizData, 'generateSlug'> = {
  title: 'Teste de prontidão para MVP',
  slug: 'prontidao-mvp',
  segment: 'Novos produtos digitais',
  projectType: 'mvp',
  index: true,
  eyebrow: 'TESTE GRATUITO',
  headline: 'Sua ideia está pronta para virar um MVP?',
  description:
    'Responda 8 perguntas sobre o estágio da sua ideia e descubra qual é o próximo passo mais seguro: validar o problema, prototipar ou desenvolver a primeira versão.',
  startLabel: 'Começar teste',
  estimatedTime: 'Leva cerca de 2 minutos',
  questions: [
    {
      blockType: 'single',
      key: 'estagio',
      question: 'Em que estágio está a ideia?',
      required: true,
      options: [
        { label: 'Ainda é só uma ideia', points: 0, recommends: 'descoberta' },
        { label: 'Já conversei com potenciais clientes', points: 2, recommends: 'prototipo' },
        {
          label: 'Já tenho interessados ou atendo de forma manual',
          points: 4,
          recommends: 'mvp',
        },
        { label: 'Já existe uma versão que precisa evoluir', points: 3, recommends: 'evolucao' },
      ],
    },
    {
      blockType: 'single',
      key: 'problema',
      question: 'Você consegue descrever o problema que o produto resolve em uma frase?',
      required: true,
      options: [
        { label: 'Sim, e já ouvi isso de clientes', points: 3 },
        { label: 'Sim, mas ainda não validei', points: 1, recommends: 'descoberta' },
        { label: 'Ainda não está claro', points: 0, recommends: 'descoberta' },
      ],
    },
    {
      blockType: 'single',
      key: 'publico',
      question: 'Quem vai usar o produto primeiro?',
      required: true,
      options: [
        { label: 'Empresas (B2B)', points: 0 },
        { label: 'Consumidores finais', points: 0 },
        { label: 'Profissionais autônomos', points: 0 },
        { label: 'A própria equipe da minha empresa', points: 0 },
      ],
    },
    {
      blockType: 'number',
      key: 'conversas',
      question: 'Com quantos potenciais usuários você já conversou sobre o problema?',
      help: 'Conversas de verdade, não apenas opiniões de amigos.',
      required: true,
      unit: 'pessoas',
      placeholder: 'Ex.: 8',
      ranges: [
        { min: 0, max: 0, points: 0, recommends: 'descoberta' },
        { min: 1, max: 4, points: 1 },
        { min: 5, max: 14, points: 3 },
        { min: 15, points: 4 },
      ],
    },
    {
      blockType: 'single',
      key: 'receita',
      question: 'Como o produto vai gerar receita ou economia?',
      required: true,
      options: [
        { label: 'O modelo já está definido', points: 2 },
        { label: 'Tenho algumas hipóteses', points: 1 },
        { label: 'Ainda não pensei nisso', points: 0, recommends: 'descoberta' },
      ],
    },
    {
      blockType: 'multiple',
      key: 'recursos',
      question: 'O que já está disponível para o projeto?',
      required: true,
      options: [
        { label: 'Orçamento definido para a primeira versão', points: 2, recommends: 'mvp' },
        { label: 'Alguém dedicado ao negócio', points: 2 },
        { label: 'Rascunhos ou protótipo das telas', points: 2, recommends: 'mvp' },
        { label: 'Lista de interessados', points: 2 },
        { label: 'Nada disso ainda', points: 0, recommends: 'prototipo' },
      ],
    },
    {
      blockType: 'single',
      key: 'prazo',
      question: 'Quando você quer ter a primeira versão em uso?',
      required: true,
      options: [
        { label: 'Em até 3 meses', points: 3 },
        { label: 'De 3 a 6 meses', points: 2 },
        { label: 'Sem prazo definido', points: 1 },
      ],
    },
    {
      blockType: 'text',
      key: 'ideia',
      question: 'Quer descrever a ideia em poucas palavras?',
      required: false,
      placeholder: 'Ex.: um app para clínicas confirmarem consultas automaticamente.',
    },
  ],
  solutions: [
    {
      key: 'descoberta',
      title: 'Validação do problema antes do código',
      description:
        'Entrevistas com potenciais usuários e um teste simples, como uma página de interesse, para confirmar que o problema existe antes de investir em desenvolvimento.',
    },
    {
      key: 'prototipo',
      title: 'Protótipo navegável',
      description:
        'Telas clicáveis do fluxo principal para mostrar a potenciais clientes e investidores e ajustar a proposta antes de desenvolver.',
    },
    {
      key: 'mvp',
      title: 'MVP com o fluxo principal',
      description:
        'Primeira versão funcional, com o essencial para usuários reais e medição de uso, pronta para evoluir a partir do que acontecer na prática.',
    },
    {
      key: 'evolucao',
      title: 'Evolução do produto existente',
      description:
        'Revisão técnica do que já existe e um plano de melhorias priorizado pelo impacto para os usuários.',
    },
  ],
  results: [
    {
      title: 'Ideia em descoberta',
      minScore: 0,
      summary:
        'A ideia ainda precisa de validação. Antes de desenvolver, vale conversar com potenciais usuários e testar o interesse de forma simples. Isso reduz o risco de construir algo que ninguém usa.',
    },
    {
      title: 'Pronta para um protótipo',
      minScore: 8,
      summary:
        'Há sinais de que o problema existe. Um protótipo navegável ajuda a validar a solução com clientes e a definir com clareza o que entra na primeira versão.',
    },
    {
      title: 'Pronta para o MVP',
      minScore: 15,
      summary:
        'A ideia tem validação, recursos e prazo. É um bom momento para desenvolver a primeira versão com o fluxo principal e colocá-la nas mãos de usuários reais.',
    },
  ],
  whatsappMessage:
    'Olá! Fiz o teste de prontidão para MVP no site da TTech e gostaria de conversar sobre a minha ideia.',
  leadTitle: 'Seu resultado está pronto.',
  leadDescription: 'Informe seus dados para ver o resultado e o próximo passo indicado para a sua ideia.',
  askCompany: false,
  askRole: false,
  submitLabel: 'Ver meu resultado',
  metaTitle: 'Teste de prontidão para MVP',
  metaDescription:
    'Sua ideia está pronta para virar um MVP? Responda 8 perguntas e descubra o próximo passo: validar, prototipar ou desenvolver a primeira versão.',
};

/** Quizzes do seed e as landing pages que convidam para cada um (quando existirem). */
export const quizzes = [
  {
    quiz: erpQuiz,
    landingPages: [
      'sistemas-integrados-erp',
      'portal-pedidos-distribuidoras',
      'app-equipe-externa-erp',
      'paineis-indicadores-erp',
    ],
  },
  { quiz: documentsQuiz, landingPages: ['automacao-propostas-documentos'] },
  { quiz: mvpQuiz, landingPages: [] },
];
