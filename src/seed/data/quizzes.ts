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

/** Landing pages que convidam para o quiz (quando existirem). */
export const quizLandingPages = ['sistemas-integrados-erp', 'portal-pedidos-distribuidoras'];
