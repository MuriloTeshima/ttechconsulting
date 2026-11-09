import type { LandingPage } from '@/lib/content-types';

/**
 * Paid-traffic landing pages (section 19 of the strategy document).
 * Each page ties one specific pain point to one specific offer.
 * Don't publish numbers, case studies or testimonials without proof and permission.
 */
export const landingPages: Omit<LandingPage, 'quiz'>[] = [
  {
    slug: 'automacao-propostas-documentos',
    segment: 'Serviços B2B',
    metaTitle: 'Automação de propostas e contratos',
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
    projectType: 'automacao',
    whatsappMessage:
      'Olá! Vi a página sobre automação de propostas e documentos e gostaria de avaliar uma automação para minha empresa.',
    index: true,
  },
  {
    slug: 'automacao-atendimento-clinicas',
    segment: 'Clínicas e saúde',
    metaTitle: 'Automação de atendimento para clínicas',
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
    projectType: 'automacao',
    whatsappMessage:
      'Olá! Vi a página para clínicas e gostaria de conversar sobre a automação do atendimento e dos indicadores.',
    index: true,
  },
  {
    slug: 'portal-pedidos-distribuidoras',
    segment: 'Distribuição e vendas',
    metaTitle: 'Portal de pedidos B2B para distribuidoras',
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
    projectType: 'sistema',
    whatsappMessage:
      'Olá! Vi a página sobre portal de pedidos e gostaria de organizar os pedidos da minha empresa.',
    index: true,
  },
  {
    slug: 'desenvolvimento-sistemas-ribeirao-preto',
    segment: 'Ribeirão Preto e região',
    metaTitle: 'Desenvolvimento de sistemas em Ribeirão Preto',
    shortBrand: true,
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
    projectType: 'sistema',
    whatsappMessage:
      'Olá! Sou de Ribeirão Preto e região e gostaria de conversar sobre o desenvolvimento de um sistema para minha empresa.',
    index: true,
  },
  {
    slug: 'sistemas-integrados-erp',
    segment: 'Empresas com ERP',
    metaTitle: 'Sistemas sob medida integrados ao seu ERP',
    metaDescription:
      'Portal de pedidos, app para vendedores, painéis e automações integrados ao ERP que sua empresa já usa. Menos planilhas e retrabalho em Ribeirão Preto e região.',
    eyebrow: 'SISTEMAS INTEGRADOS AO ERP',
    title: 'Tire das planilhas os processos que o seu ERP não',
    highlight: 'cobre.',
    description:
      'Desenvolvemos portais, aplicativos e automações sob medida, integrados ao ERP que sua empresa já usa. A informação passa a circular entre equipe, vendedores e clientes sem redigitação.',
    signalsTitle: 'SINAIS DE QUE É HORA DE INTEGRAR',
    signals: [
      'Pedidos chegam pelo WhatsApp e são redigitados no ERP',
      'Relatórios montados à mão com dados exportados do sistema',
      'Vendedores e clientes sem acesso a estoque, preço e status',
    ],
    problemTitle: 'O ERP organiza a empresa. O que fica fora dele vira retrabalho.',
    problemText:
      'Financeiro, estoque e faturamento estão no ERP, mas parte importante da operação acontece fora dele: em planilhas, mensagens e controles paralelos. A equipe gasta horas copiando e conferindo informações, e os erros aparecem no pedido, na entrega e no fechamento do mês.',
    pains: [
      'Informações digitadas mais de uma vez',
      'Planilhas paralelas que só uma pessoa entende',
      'Equipe externa sem acesso ao que está no sistema',
      'Gestão sem indicadores atualizados',
    ],
    solutionTitle: 'Sistemas sob medida que conversam com o seu ERP.',
    solutionText:
      'Não substituímos o ERP. Construímos em volta dele as ferramentas que a operação precisa, com integração para os dados circularem nos dois sentidos.',
    deliverables: [
      {
        title: 'Portal de pedidos B2B',
        text: 'Clientes fazem pedidos com o catálogo e as condições de cada um, e o pedido entra direto no ERP.',
      },
      {
        title: 'App para vendedores e técnicos',
        text: 'Estoque, preço, histórico do cliente e lançamento de pedidos ou ordens de serviço em campo, integrados ao sistema.',
      },
      {
        title: 'Portal do cliente',
        text: 'Status de pedidos, entregas, documentos e solicitações em um só lugar, sem depender de ligação ou mensagem.',
      },
      {
        title: 'Painéis e relatórios automáticos',
        text: 'Indicadores de vendas, operação e financeiro atualizados com os dados do ERP, sem montar relatório à mão.',
      },
    ],
    note: 'Trabalhamos com ERPs que oferecem API ou outra forma segura de integração, como TOTVS Protheus, Sankhya, Omie e Bling. A viabilidade de cada integração é confirmada no diagnóstico.',
    faq: [
      {
        q: 'Vocês substituem o nosso ERP?',
        a: 'Não. O ERP continua sendo o sistema principal da empresa. Construímos as ferramentas que faltam em volta dele e integramos as informações.',
      },
      {
        q: 'Com quais ERPs vocês trabalham?',
        a: 'Com ERPs que permitem integração segura, por API ou por troca automatizada de arquivos. No diagnóstico avaliamos o seu sistema, o que ele permite e qual é o melhor caminho.',
      },
      {
        q: 'Precisamos ter uma equipe de TI?',
        a: 'Não. Precisamos de alguém que conheça o processo para validar as decisões. A parte técnica, incluindo a integração e a publicação, fica com a TTech.',
      },
      {
        q: 'Dá para começar com uma parte só?',
        a: 'Sim. O projeto começa por um fluxo essencial, como o portal de pedidos ou um painel, e evolui em etapas a partir do uso real.',
      },
    ],
    ctaLabel: 'Conversar sobre integração',
    finalTitle: 'Quais processos da sua empresa ainda acontecem fora do ERP?',
    finalText:
      'Conte onde a equipe mais perde tempo copiando ou conferindo informações. No diagnóstico, mapeamos o processo e propomos um primeiro passo integrado ao seu sistema.',
    projectType: 'sistema',
    whatsappMessage:
      'Olá! Vi a página sobre sistemas integrados ao ERP e gostaria de conversar sobre um processo da minha empresa.',
    index: true,
  },
  {
    slug: 'app-equipe-externa-erp',
    segment: 'Equipes de campo',
    metaTitle: 'App para vendedores e técnicos integrado ao ERP',
    metaDescription:
      'Aplicativo para equipe externa consultar estoque, preço e histórico do cliente e lançar pedidos ou ordens de serviço direto no ERP, inclusive sem internet.',
    eyebrow: 'APP PARA EQUIPE EXTERNA',
    title: 'Sua equipe de campo com o ERP na palma da',
    highlight: 'mão.',
    description:
      'Um aplicativo para vendedores, representantes e técnicos consultarem informações e registrarem pedidos, visitas e ordens de serviço direto no sistema da empresa, sem ligar para o escritório.',
    signalsTitle: 'SINAIS DE QUE É HORA DE UM APP',
    signals: [
      'Vendedores ligam para o escritório para consultar estoque e preço',
      'Ordens de serviço preenchidas em papel e digitadas depois',
      'Gestão sem visão do que acontece em campo',
    ],
    problemTitle: 'A equipe está na rua. A informação ficou no escritório.',
    problemText:
      'Quando vendedores e técnicos dependem de alguém no escritório para consultar o ERP, o atendimento fica lento e o escritório para o que está fazendo. E tudo o que é anotado em papel ou mensagem precisa ser digitado de novo no sistema.',
    pains: [
      'Consultas por telefone e mensagem o dia inteiro',
      'Pedidos e ordens de serviço redigitados no ERP',
      'Informações desatualizadas passadas ao cliente',
      'Nenhum registro confiável das visitas e atendimentos',
    ],
    solutionTitle: 'Um aplicativo feito para a rotina da sua equipe externa.',
    solutionText:
      'Desenhamos o app a partir do que a equipe faz em campo, com integração ao ERP para que o pedido ou a ordem de serviço registrada no celular seja a mesma que o escritório enxerga.',
    deliverables: [
      {
        title: 'Consulta de estoque e preço',
        text: 'Disponibilidade, tabela de preço e condições de cada cliente, atualizadas a partir do ERP.',
      },
      {
        title: 'Pedidos e ordens de serviço',
        text: 'Lançamento em campo com checklist, fotos e assinatura do cliente, enviado direto ao sistema.',
      },
      {
        title: 'Funcionamento sem internet',
        text: 'Registros guardados no aparelho e sincronizados quando a conexão voltar.',
      },
      {
        title: 'Visão da gestão',
        text: 'Visitas, pedidos e atendimentos do dia em um painel, sem depender de relatório manual.',
      },
    ],
    note: 'A integração depende das formas de acesso que o seu ERP oferece. A viabilidade é confirmada no diagnóstico, antes de definir escopo e prazo.',
    faq: [
      {
        q: 'Precisa ser um aplicativo de loja (App Store e Google Play)?',
        a: 'Nem sempre. Para muitas operações, uma aplicação web instalável no celular atende bem e tem custo menor. Avaliamos o caso antes de decidir.',
      },
      {
        q: 'Funciona em celulares da própria equipe?',
        a: 'Sim. O acesso é controlado por usuário, e é possível bloquear o acesso de quem sai da empresa.',
      },
      {
        q: 'E se a equipe ficar sem sinal?',
        a: 'O app pode guardar os dados essenciais no aparelho e permitir registros sem internet, sincronizando com o ERP quando a conexão voltar.',
      },
    ],
    ctaLabel: 'Conversar sobre o app',
    finalTitle: 'O que sua equipe externa mais pede para o escritório hoje?',
    finalText:
      'Conte como vendedores e técnicos trabalham em campo e o que precisam consultar ou registrar. Vamos desenhar juntos uma primeira versão do aplicativo.',
    projectType: 'sistema',
    whatsappMessage:
      'Olá! Vi a página sobre app para equipe externa e gostaria de conversar sobre a rotina da minha equipe de campo.',
    index: true,
  },
  {
    slug: 'paineis-indicadores-erp',
    segment: 'Gestão e indicadores',
    metaTitle: 'Painéis de indicadores com dados do ERP',
    metaDescription:
      'Painéis de vendas, operação e comissões atualizados automaticamente com os dados do ERP. Sem exportar, colar e montar planilha todo mês.',
    eyebrow: 'PAINÉIS E RELATÓRIOS AUTOMÁTICOS',
    title: 'Os indicadores da empresa atualizados sem montar',
    highlight: 'planilha.',
    description:
      'Painéis de vendas, operação, financeiro e comissões que leem os dados direto do ERP e das ferramentas da empresa. A gestão olha para o mesmo número, no mesmo momento.',
    signalsTitle: 'SINAIS DE QUE É HORA DE UM PAINEL',
    signals: [
      'Relatórios montados a partir de exportações do ERP',
      'Números diferentes em cada área para o mesmo indicador',
      'Comissões e metas calculadas em planilhas',
    ],
    problemTitle: 'Relatório que depende de planilha chega atrasado e gera discussão.',
    problemText:
      'Quando cada indicador nasce de uma exportação e de fórmulas manuais, o número chega dias depois, depende de poucas pessoas e nem sempre bate entre as áreas. A reunião vira uma discussão sobre qual planilha está certa.',
    pains: [
      'Horas por mês consolidando dados',
      'Dependência de uma pessoa para montar o relatório',
      'Indicadores divergentes entre áreas',
      'Decisões tomadas com números atrasados',
    ],
    solutionTitle: 'Painéis construídos sobre os dados que a empresa já tem.',
    solutionText:
      'Conectamos o ERP e as demais fontes, tratamos as regras de cálculo da empresa e entregamos painéis com acesso controlado para cada perfil.',
    deliverables: [
      {
        title: 'Painel comercial',
        text: 'Vendas por vendedor, região, cliente e produto, com metas e comparativos.',
      },
      {
        title: 'Comissões automáticas',
        text: 'Regras de comissão da empresa calculadas a partir dos dados do ERP, com memória de cálculo.',
      },
      {
        title: 'Operação e entregas',
        text: 'Pedidos em aberto, prazos, atrasos e produtividade da equipe.',
      },
      {
        title: 'Acesso por perfil',
        text: 'Diretoria, gestores e vendedores veem apenas os indicadores que fazem sentido para cada um.',
      },
    ],
    faq: [
      {
        q: 'Por que não usar uma ferramenta de BI pronta?',
        a: 'Ferramentas de BI são ótimas quando os dados já estão organizados. O painel sob medida faz sentido quando há regras de cálculo próprias, dados que precisam ser tratados ou acesso para clientes e parceiros. No diagnóstico indicamos o melhor caminho, inclusive se for uma ferramenta pronta.',
      },
      {
        q: 'Os dados ficam atualizados em tempo real?',
        a: 'Depende da forma de integração com o ERP. Na maioria dos casos, a atualização acontece em intervalos de minutos ou horas, o que já elimina o relatório manual.',
      },
      {
        q: 'Dá para começar com um indicador só?',
        a: 'Sim. O melhor começo é o relatório que mais dá trabalho hoje. Depois, o painel evolui com os próximos indicadores.',
      },
    ],
    ctaLabel: 'Conversar sobre indicadores',
    finalTitle: 'Qual relatório mais dá trabalho na sua empresa hoje?',
    finalText:
      'Conte quais indicadores a gestão acompanha e como eles são montados. Vamos propor um primeiro painel com os dados que você já tem.',
    projectType: 'sistema',
    whatsappMessage:
      'Olá! Vi a página sobre painéis de indicadores e gostaria de conversar sobre os relatórios da minha empresa.',
    index: true,
  },
];
