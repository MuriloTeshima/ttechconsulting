import type { FaqItem } from './faq';
import type { WhatsAppTopic } from '@/lib/whatsapp';

/**
 * Landing pages de tráfego pago (seção 19 do documento de estratégia).
 * Cada página liga uma dor específica a uma oferta específica.
 * Não publicar números, cases ou depoimentos sem comprovação e autorização.
 */
export type LandingPage = {
  slug: string;
  segment: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  signalsTitle: string;
  signals: string[];
  problemTitle: string;
  problemText: string;
  pains: string[];
  solutionTitle: string;
  solutionText: string;
  deliverables: { title: string; text: string }[];
  note?: string;
  faq: FaqItem[];
  ctaLabel: string;
  finalTitle: string;
  finalText: string;
  topic: WhatsAppTopic;
  /** Liga/desliga a indexação da página pelos buscadores. */
  index: boolean;
};

export const landingPages: LandingPage[] = [
  {
    slug: 'automacao-propostas-documentos',
    segment: 'Serviços B2B',
    metaTitle: 'Automação de propostas, contratos e relatórios',
    metaDescription:
      'Automatize propostas, contratos, documentos e relatórios da sua empresa de serviços. Menos retrabalho e mais consistência nas entregas.',
    eyebrow: 'AUTOMAÇÃO PARA EMPRESAS DE SERVIÇOS',
    title: 'Automatize propostas, documentos e relatórios da sua',
    highlight: 'empresa.',
    description:
      'Sua equipe ainda copia informações entre planilhas e modelos para montar propostas e relatórios? Transformamos esse processo em um fluxo automático, padronizado e fácil de acompanhar.',
    signalsTitle: 'SINAIS DE QUE É HORA DE AUTOMATIZAR',
    signals: [
      'Propostas montadas a partir de cópias de arquivos antigos',
      'Relatórios consolidados manualmente todo mês',
      'Informações do cliente digitadas mais de uma vez',
    ],
    problemTitle: 'Documentos repetitivos consomem o tempo de quem deveria atender clientes.',
    problemText:
      'Consultorias, escritórios contábeis, agências e empresas de BPO produzem os mesmos tipos de documento todos os dias. Quando isso depende de cópia manual, surgem versões diferentes, erros de valores e atrasos.',
    pains: [
      'Propostas e contratos feitos manualmente',
      'Informações espalhadas entre planilhas e e-mails',
      'Relatórios repetitivos para clientes',
      'Dificuldade para acompanhar o que foi enviado',
    ],
    solutionTitle: 'Um fluxo de documentos construído para o seu processo.',
    solutionText:
      'Mapeamos como sua equipe trabalha hoje e automatizamos a parte repetitiva, mantendo o controle de quem revisa e aprova.',
    deliverables: [
      {
        title: 'Geração automática',
        text: 'Propostas, contratos e relatórios em PDF gerados a partir dos dados já cadastrados.',
      },
      {
        title: 'Modelos padronizados',
        text: 'Textos, valores e condições comerciais consistentes em todos os documentos.',
      },
      {
        title: 'Integração com ferramentas',
        text: 'Conexão com planilhas, CRM, e-mail ou WhatsApp para evitar redigitação.',
      },
      {
        title: 'Acompanhamento',
        text: 'Visão do que foi criado, enviado e aprovado, sem depender de mensagens soltas.',
      },
    ],
    faq: [
      {
        q: 'Preciso trocar as ferramentas que já uso?',
        a: 'Não necessariamente. Sempre que possível, a automação se conecta às planilhas, ao CRM e aos modelos que a equipe já utiliza.',
      },
      {
        q: 'A automação funciona com os nossos modelos atuais?',
        a: 'Sim. Partimos dos documentos que a empresa já usa e os transformamos em modelos com campos preenchidos automaticamente.',
      },
      {
        q: 'Quanto tempo leva para colocar em uso?',
        a: 'Depende da quantidade de documentos e integrações. Depois da conversa inicial, propomos uma primeira entrega com escopo e prazo definidos.',
      },
    ],
    ctaLabel: 'Avaliar uma automação',
    finalTitle: 'Quais documentos sua equipe ainda faz manualmente?',
    finalText:
      'Conte quais propostas, contratos ou relatórios mais consomem tempo hoje. Vamos avaliar juntos o primeiro fluxo a automatizar.',
    topic: 'lp-propostas',
    index: true,
  },
  {
    slug: 'automacao-atendimento-clinicas',
    segment: 'Clínicas e saúde',
    metaTitle: 'Automação de atendimento e indicadores para clínicas',
    metaDescription:
      'Integre site, WhatsApp, CRM e agenda da sua clínica. Automação do atendimento administrativo e dashboard de agendamentos e indicadores.',
    eyebrow: 'AUTOMAÇÃO PARA CLÍNICAS',
    title: 'Atendimento organizado e indicadores claros para a sua',
    highlight: 'clínica.',
    description:
      'Integramos site, WhatsApp, CRM e agenda para reduzir tarefas manuais da recepção e mostrar, com clareza, como estão contatos, agendamentos e faltas.',
    signalsTitle: 'SINAIS DE QUE É HORA DE ORGANIZAR',
    signals: [
      'Atendimento dividido entre telefone e WhatsApp',
      'Confirmações de consulta feitas uma a uma',
      'Nenhum número confiável sobre conversão e faltas',
    ],
    problemTitle: 'Contatos perdidos e confirmações manuais custam agenda.',
    problemText:
      'Clínicas médicas, odontológicas, de estética e de saúde ocupacional recebem pedidos por vários canais. Sem integração, a recepção repete cadastros e a gestão não enxerga onde os pacientes se perdem.',
    pains: [
      'Cadastro e confirmação manuais',
      'Contatos comerciais sem acompanhamento',
      'Informações duplicadas em ferramentas diferentes',
      'Dificuldade para medir agendamentos e faltas',
    ],
    solutionTitle: 'Processos administrativos conectados de ponta a ponta.',
    solutionText:
      'Começamos pelo fluxo que mais gera retrabalho na recepção e evoluímos em etapas, sem interromper o atendimento.',
    deliverables: [
      {
        title: 'Atendimento automatizado',
        text: 'Respostas iniciais, coleta de dados e encaminhamento dos contatos recebidos pelo WhatsApp.',
      },
      {
        title: 'Integração com agenda e CRM',
        text: 'Cadastros sincronizados entre site, WhatsApp, CRM e sistema de agendamento.',
      },
      {
        title: 'Confirmações e lembretes',
        text: 'Mensagens automáticas de confirmação e lembrete para reduzir faltas.',
      },
      {
        title: 'Dashboard de indicadores',
        text: 'Contatos, agendamentos, conversão e faltas acompanhados em um só lugar.',
      },
    ],
    note: 'Atuamos em processos administrativos e de atendimento. Prontuários e sistemas clínicos exigem análise específica de segurança, privacidade e regulamentação antes de qualquer proposta.',
    faq: [
      {
        q: 'Vocês substituem o sistema que a clínica já usa?',
        a: 'Não. O objetivo é integrar e complementar as ferramentas atuais, sempre que elas permitirem integração segura.',
      },
      {
        q: 'Como os dados dos pacientes são tratados?',
        a: 'Cada integração é avaliada considerando a LGPD, regras de acesso e o mínimo de dados necessário para o fluxo funcionar.',
      },
      {
        q: 'Atendem clínicas com mais de uma unidade?',
        a: 'Sim. Portais administrativos e dashboards podem ser organizados por unidade, equipe ou profissional.',
      },
    ],
    ctaLabel: 'Conversar sobre minha clínica',
    finalTitle: 'Onde o atendimento da sua clínica mais depende de trabalho manual?',
    finalText:
      'Conte como os contatos chegam e como a agenda é confirmada hoje. Vamos identificar juntos o primeiro processo a automatizar.',
    topic: 'lp-clinicas',
    index: true,
  },
  {
    slug: 'portal-pedidos-distribuidoras',
    segment: 'Distribuição e vendas',
    metaTitle: 'Portal de pedidos B2B para distribuidoras e representantes',
    metaDescription:
      'Organize pedidos recebidos pelo WhatsApp com um portal B2B: catálogo com condições por cliente, acompanhamento de pedidos e dashboard comercial.',
    eyebrow: 'PORTAL DE PEDIDOS B2B',
    title: 'Organize os pedidos que hoje chegam pelo',
    highlight: 'WhatsApp.',
    description:
      'Um portal de pedidos para distribuidoras e representantes comerciais: catálogo com condições por cliente, pedidos organizados e visão clara das vendas.',
    signalsTitle: 'SINAIS DE QUE É HORA DE UM PORTAL',
    signals: [
      'Pedidos perdidos no meio das conversas',
      'Tabelas de preço em arquivos separados',
      'Comissões calculadas em planilhas',
    ],
    problemTitle: 'Pedido por mensagem funciona até o dia em que a operação cresce.',
    problemText:
      'Quando pedidos, preços e estoque dependem de mensagens e planilhas, o time comercial perde tempo conferindo informações e o cliente fica sem saber o andamento do pedido.',
    pains: [
      'Pedidos recebidos por WhatsApp sem organização',
      'Consulta manual de estoque',
      'Condições comerciais dispersas por cliente',
      'Falta de acompanhamento dos pedidos',
    ],
    solutionTitle: 'Um canal de pedidos feito para a sua operação comercial.',
    solutionText:
      'Estruturamos o catálogo e as regras comerciais da empresa em um portal simples para clientes e vendedores, integrado ao que já existe.',
    deliverables: [
      {
        title: 'Catálogo por cliente',
        text: 'Produtos, tabelas de preço e condições comerciais específicas para cada cliente.',
      },
      {
        title: 'Pedidos organizados',
        text: 'Pedidos registrados em um só lugar, com status visível para a equipe e para o cliente.',
      },
      {
        title: 'Aplicação para vendedores',
        text: 'Representantes lançam pedidos e consultam informações em campo.',
      },
      {
        title: 'Dashboard e integração com ERP',
        text: 'Indicadores comerciais e sincronização com o ERP, quando ele oferecer integração.',
      },
    ],
    faq: [
      {
        q: 'O portal se integra ao nosso ERP?',
        a: 'Avaliamos as formas de integração que o ERP oferece. Quando não há API, definimos alternativas seguras, como importação e exportação automatizada.',
      },
      {
        q: 'Os clientes continuam podendo pedir pelo WhatsApp?',
        a: 'Sim. O portal pode conviver com o WhatsApp, enviando links e notificações, enquanto os pedidos ficam organizados em um só lugar.',
      },
      {
        q: 'É possível começar só com uma parte?',
        a: 'Sim. Uma primeira versão pode focar no catálogo e no registro de pedidos, e evoluir para estoque, comissões e ERP depois.',
      },
    ],
    ctaLabel: 'Organizar meus pedidos',
    finalTitle: 'Como sua empresa recebe pedidos hoje?',
    finalText:
      'Conte como pedidos, preços e estoque são controlados atualmente. Vamos desenhar juntos uma primeira versão do seu portal.',
    topic: 'lp-pedidos',
    index: true,
  },
  {
    slug: 'desenvolvimento-sistemas-ribeirao-preto',
    segment: 'Ribeirão Preto e região',
    metaTitle: 'Desenvolvimento de sistemas sob medida em Ribeirão Preto',
    metaDescription:
      'Empresa de desenvolvimento de software em Ribeirão Preto. Sistemas web sob medida, portais, dashboards e automações para empresas da região.',
    eyebrow: 'DESENVOLVIMENTO DE SOFTWARE EM RIBEIRÃO PRETO',
    title: 'Transforme um processo manual em um sistema',
    highlight: 'web.',
    description:
      'Desenvolvemos sistemas sob medida, portais, dashboards e automações para empresas de Ribeirão Preto e região, com conversa presencial quando o projeto pede.',
    signalsTitle: 'SINAIS DE QUE É HORA DE UM SISTEMA',
    signals: [
      'Controles paralelos em planilhas e mensagens',
      'Sistemas atuais que não atendem uma parte da operação',
      'Gestão sem indicadores confiáveis',
    ],
    problemTitle: 'Processos improvisados limitam o crescimento da operação.',
    problemText:
      'Planilhas paralelas, informações duplicadas e tarefas repetitivas consomem o tempo da equipe. Um sistema sob medida organiza o processo em torno de como a sua empresa realmente trabalha.',
    pains: [
      'Informações espalhadas entre planilhas e mensagens',
      'Equipe executando tarefas repetitivas',
      'Sistemas que não se comunicam',
      'Clientes sem visibilidade sobre solicitações e entregas',
    ],
    solutionTitle: 'Um parceiro de desenvolvimento perto da sua operação.',
    solutionText:
      'Entendemos o processo antes de escrever código e construímos a primeira versão com foco no que precisa funcionar.',
    deliverables: [
      {
        title: 'Sistemas internos',
        text: 'Ferramentas para equipes controlarem serviços, pedidos, projetos ou operações.',
      },
      {
        title: 'Portais do cliente',
        text: 'Documentos, solicitações e status centralizados para clientes e parceiros.',
      },
      {
        title: 'Dashboards gerenciais',
        text: 'Indicadores de vendas, projetos ou produtividade sem consolidar planilhas.',
      },
      {
        title: 'Automações e integrações',
        text: 'Conexão entre ferramentas e eliminação de tarefas manuais repetitivas.',
      },
    ],
    faq: [
      {
        q: 'A TTech atende presencialmente em Ribeirão Preto?',
        a: 'Sim. A empresa está em Ribeirão Preto e pode realizar reuniões presenciais na região quando o projeto pede. Também atendemos remotamente.',
      },
      {
        q: 'Quando vale a pena desenvolver um sistema sob medida?',
        a: 'Quando um processo importante depende de muitos controles paralelos, retrabalho ou adaptações que as ferramentas atuais não resolvem. A conversa inicial ajuda a avaliar se desenvolver é realmente o melhor caminho.',
      },
      {
        q: 'É possível começar com uma versão menor?',
        a: 'Sim. Projetos maiores podem começar por um fluxo essencial, permitindo colocar a solução em uso, aprender e evoluir sem tentar construir tudo de uma vez.',
      },
    ],
    ctaLabel: 'Conversar sobre um sistema',
    finalTitle: 'Existe um processo na sua empresa que pode funcionar melhor?',
    finalText:
      'Conte o que sua equipe faz hoje, onde está o retrabalho e o que você deseja melhorar. Vamos conversar sobre um primeiro passo possível.',
    topic: 'lp-ribeirao',
    index: true,
  },
];

export function getLandingPage(slug: string) {
  return landingPages.find((page) => page.slug === slug);
}
