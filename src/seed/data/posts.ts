/**
 * Initial blog posts, in Markdown (converted to the CMS editor format by the seed).
 * Covers in `src/seed/images/blog`: StockSnap photos, CC0 license (free use, no attribution).
 * No numbers, case studies or testimonials that can't be backed up.
 */
export type SeedPost = {
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  cover: { file: string; alt: string };
  content: string;
  seo?: { title?: string; description?: string };
};

export const posts: SeedPost[] = [
  {
    title: '7 sinais de que sua operação está acontecendo fora do ERP',
    slug: 'sinais-operacao-fora-do-erp',
    category: 'Sistemas sob medida',
    publishedAt: '2026-08-18T12:00:00.000Z',
    excerpt:
      'O ERP está implantado, mas a equipe ainda vive em planilhas e mensagens? Veja os sinais mais comuns de que parte importante da operação ficou fora do sistema.',
    cover: {
      file: 'operacao-fora-do-erp.jpg',
      alt: 'Pessoa usando calculadora ao lado de um notebook com planilha aberta',
    },
    content: `Implantar um ERP costuma resolver o básico: financeiro, estoque, faturamento e fiscal passam a ter um lugar oficial. O problema é o que fica em volta. Com o tempo, a operação cria atalhos para tudo o que o sistema não cobre bem, e esses atalhos viram rotina.

Abaixo estão os sinais mais comuns de que isso está acontecendo na sua empresa.

## 1. Pedidos chegam por WhatsApp e são redigitados

O cliente manda a lista por mensagem, alguém confere preço e estoque e depois lança tudo no ERP. Cada pedido passa por duas digitações, e cada digitação é uma chance de erro.

## 2. Relatórios são montados à mão todo mês

Os dados estão no ERP, mas o relatório que a diretoria usa nasce de uma exportação, alguns filtros e várias fórmulas. Quando a pessoa que monta sai de férias, o relatório atrasa.

## 3. Existe uma planilha que só uma pessoa entende

Comissões, metas, controle de entregas ou previsão de compras. A planilha funciona, mas ninguém mais sabe mexer nela com segurança. É um processo crítico sem dono no sistema.

## 4. A equipe externa liga para o escritório para consultar informações

Vendedores e técnicos em campo precisam de estoque, preço ou histórico do cliente e dependem de alguém no escritório para consultar o ERP.

## 5. Clientes perguntam o status do pedido por mensagem

Se o cliente não tem onde consultar, ele pergunta. E a equipe para o que está fazendo para responder.

## 6. A mesma informação aparece diferente em lugares diferentes

O preço da planilha não bate com o do sistema, ou o estoque informado ao cliente já não existe. Esse é o sintoma mais caro, porque chega até o cliente.

## 7. O fechamento do mês depende de conferência manual

Quando fechar o mês significa cruzar exportações e planilhas para achar diferenças, a empresa paga em horas de trabalho que poderiam ir para outra coisa.

## O que fazer com esses sinais

Nem tudo precisa virar sistema, e trocar de ERP raramente é a resposta. O caminho mais seguro costuma ser:

1. Listar os processos que acontecem fora do ERP.
2. Estimar quanto tempo e quantos erros cada um gera.
3. Escolher o mais crítico e resolvê-lo com uma ferramenta integrada ao ERP, em vez de mais uma planilha.

Se você quer um ponto de partida, o [diagnóstico de operação fora do ERP](/diagnostico/operacao-fora-do-erp) leva cerca de dois minutos e indica quais soluções fazem mais sentido para o seu caso.`,
  },
  {
    title: 'Portal de pedidos B2B: como tirar os pedidos do WhatsApp sem perder o cliente',
    slug: 'portal-de-pedidos-b2b',
    category: 'Sistemas sob medida',
    publishedAt: '2026-08-25T12:00:00.000Z',
    excerpt:
      'Receber pedidos por mensagem funciona até a operação crescer. Entenda o que um portal de pedidos B2B resolve e como implantar sem obrigar o cliente a mudar de uma vez.',
    cover: {
      file: 'portal-pedidos.jpg',
      alt: 'Prateleiras com caixas numeradas organizadas em um estoque',
    },
    content: `Para muitas distribuidoras e indústrias, o WhatsApp virou o principal canal de pedidos. É rápido para o cliente e não exige nenhum treinamento. O custo aparece do lado de dentro: pedidos perdidos no meio das conversas, preços consultados em arquivos separados e tudo redigitado no ERP.

## O que um portal de pedidos B2B faz

Um portal de pedidos é um canal onde clientes e representantes montam o pedido diretamente, com as regras comerciais da empresa já aplicadas:

- **Catálogo por cliente**, com tabela de preço, condições de pagamento e mix de produtos de cada um.
- **Estoque consultado na hora**, a partir do ERP, para não vender o que não existe.
- **Pedido direto no ERP**, sem redigitação e com o status visível para todos.
- **Histórico e recompra**, para o cliente repetir um pedido anterior em poucos cliques.

## O medo de obrigar o cliente a mudar

A principal objeção é: "meu cliente não vai querer entrar em um site". Na prática, não é preciso escolher entre um e outro. Algumas formas de fazer a transição:

1. **Começar pelos representantes.** A equipe comercial usa o portal para lançar os pedidos que recebe, e o cliente continua mandando mensagem.
2. **Enviar o link do pedido pelo próprio WhatsApp.** O cliente recebe um link já autenticado, com o catálogo dele.
3. **Migrar primeiro os clientes que mais compram.** Eles são os que mais ganham com recompra e histórico.

## Por onde começar

Uma primeira versão costuma ter apenas catálogo, carrinho e envio do pedido para o ERP. Comissões, painel comercial e condições mais complexas entram depois, a partir do uso real.

Antes de qualquer desenvolvimento, vale confirmar como o seu ERP permite integração: por API, por banco de dados ou por troca de arquivos. Isso define o escopo e o prazo do projeto.

Se esse é o seu cenário, veja como funciona o [portal de pedidos para distribuidoras](/lp/portal-pedidos-distribuidoras).`,
  },
  {
    title: 'Integração com ERP: API, banco de dados ou arquivos? Como escolher',
    slug: 'integracao-com-erp-api-banco-ou-arquivos',
    category: 'Automação',
    publishedAt: '2026-09-01T12:00:00.000Z',
    excerpt:
      'Existem três formas principais de integrar um sistema ao ERP. Cada uma tem vantagens, riscos e custos diferentes. Veja como avaliar qual faz sentido para o seu caso.',
    cover: {
      file: 'integracao-erp.jpg',
      alt: 'Cabo de rede amarelo com conector em destaque',
    },
    content: `Quando uma empresa decide construir um portal, um aplicativo ou um painel em volta do ERP, a primeira pergunta técnica é: como os dois sistemas vão conversar? A resposta muda o prazo, o custo e o risco do projeto.

## 1. Integração por API

A API é uma porta oficial que o fabricante do ERP oferece para outros sistemas lerem e gravarem informações, como pedidos, clientes, produtos e estoque.

**Vantagens:** é o caminho suportado pelo fabricante, respeita as regras de negócio do ERP e costuma sobreviver às atualizações do sistema.

**Cuidados:** nem toda informação está disponível na API, algumas versões limitam o volume de chamadas, e certos fabricantes cobram pelo acesso.

## 2. Integração pelo banco de dados

Alguns ERPs instalados nos servidores da própria empresa permitem ler, e às vezes gravar, diretamente no banco de dados.

**Vantagens:** acesso a praticamente toda a informação e boa performance para leitura, o que é útil em painéis e relatórios.

**Cuidados:** gravar direto no banco pode pular validações do ERP e causar inconsistências. Atualizações do sistema podem mudar a estrutura das tabelas. Em geral, recomendamos usar o banco apenas para leitura.

## 3. Integração por arquivos

O ERP exporta ou importa arquivos (CSV, XML, TXT) em uma pasta ou servidor, e o outro sistema processa esses arquivos em intervalos definidos.

**Vantagens:** funciona até com sistemas antigos, sem API, e é simples de auditar.

**Cuidados:** a informação não é em tempo real, e é preciso tratar arquivos duplicados, incompletos ou fora do padrão.

## Como escolher

Algumas perguntas ajudam a decidir:

- O ERP tem API documentada para as informações que você precisa?
- A informação precisa estar atualizada em segundos, minutos ou uma vez por dia?
- O novo sistema só lê dados do ERP ou também grava?
- Quem dá suporte ao ERP e o que o contrato permite?

Na maioria dos projetos, a melhor resposta é uma combinação: API para gravar pedidos e cadastros, e leitura do banco ou arquivos para relatórios.

Essa avaliação faz parte do diagnóstico de qualquer projeto de [sistema integrado ao ERP](/lp/sistemas-integrados-erp), antes de definir escopo e prazo.`,
  },
  {
    title: 'Como calcular o custo do retrabalho manual na sua empresa',
    slug: 'custo-do-retrabalho-manual',
    category: 'Gestão e processos',
    publishedAt: '2026-09-08T12:00:00.000Z',
    excerpt:
      'Redigitar, conferir e corrigir informações custa caro, mas raramente aparece em algum relatório. Veja um método simples para estimar esse custo e decidir o que automatizar.',
    cover: {
      file: 'custo-retrabalho.jpg',
      alt: 'Calculadora azul sobre a mesa ao lado de blocos de anotação',
    },
    content: `Todo gestor sabe que existe retrabalho na operação. O difícil é dizer quanto ele custa. Sem esse número, investir em automação parece despesa, e não economia.

O método abaixo não exige nenhuma ferramenta, apenas uma conversa honesta com quem executa o processo.

## Passo 1: liste as tarefas repetitivas

Pergunte à equipe quais tarefas envolvem copiar, conferir ou consolidar informações entre sistemas, planilhas e mensagens. Exemplos comuns:

- lançar no ERP pedidos recebidos por mensagem;
- montar relatórios a partir de exportações;
- calcular comissões em planilha;
- responder clientes sobre status de pedidos.

## Passo 2: estime tempo e frequência

Para cada tarefa, anote quanto tempo leva cada execução e quantas vezes ela acontece por mês. Não precisa ser exato: uma estimativa razoável já mostra a ordem de grandeza.

## Passo 3: converta em custo

A conta é simples:

**horas por mês × custo da hora da equipe = custo mensal da tarefa**

Para o custo da hora, considere salário, encargos e benefícios, e não apenas o salário bruto.

Um exemplo hipotético: uma tarefa de 15 minutos, repetida 20 vezes por dia útil, consome cerca de 100 horas por mês. Multiplicadas pelo custo da hora da equipe, essas horas mostram rapidamente se a tarefa merece atenção.

## Passo 4: some o custo dos erros

O tempo é só uma parte. Inclua também o que acontece quando a informação sai errada: pedidos refeitos, fretes de reenvio, descontos concedidos para compensar o cliente, notas canceladas. Mesmo uma estimativa conservadora costuma mudar a prioridade das tarefas.

## Passo 5: compare com o custo de resolver

Com o custo mensal em mãos, fica mais fácil comparar alternativas: ajustar o processo, configurar algo no ERP, usar uma ferramenta pronta ou desenvolver uma solução sob medida. Uma automação que se paga em poucos meses é, na prática, uma redução de custo.

## Comece pelo processo mais caro

Não tente resolver tudo de uma vez. Escolha a tarefa com maior custo somado e comece por ela. O resultado serve de referência para os próximos passos.

Se quiser ajuda para fazer esse levantamento, [fale com a gente](/contato): o mapeamento do processo é a primeira etapa de qualquer projeto.`,
  },
  {
    title: 'MVP: o que entra na primeira versão (e o que fica para depois)',
    slug: 'o-que-entra-no-mvp',
    category: 'Produto digital',
    publishedAt: '2026-09-15T12:00:00.000Z',
    excerpt:
      'Um MVP não é uma versão pior do produto, é a menor versão capaz de testar a ideia com usuários reais. Veja como decidir o que entra e o que pode esperar.',
    cover: {
      file: 'mvp.jpg',
      alt: 'Quadro branco com planejamento semanal e notas adesivas coloridas',
    },
    content: `MVP, ou produto mínimo viável, é uma das ideias mais citadas e mais mal interpretadas no desenvolvimento de software. Não se trata de entregar algo mal feito, mas de entregar pouco, bem feito, para aprender rápido.

## Comece pela pergunta, não pela lista de funcionalidades

Antes de listar telas, responda: **qual é a principal hipótese que precisa ser testada?** Por exemplo:

- clientes aceitam fazer pedidos sozinhos, sem falar com um vendedor;
- profissionais pagam uma assinatura para organizar a agenda;
- a equipe de campo usa um aplicativo em vez de ligar para o escritório.

O MVP deve conter apenas o necessário para confirmar ou descartar essa hipótese.

## O que normalmente entra

- **O fluxo principal, do começo ao fim.** Se o produto é um portal de pedidos, o cliente precisa conseguir montar e enviar o pedido.
- **Cadastro e acesso.** O mínimo para identificar quem está usando.
- **Uma forma de medir o uso.** Sem dados, não há aprendizado.
- **Um canal de contato.** Os primeiros usuários vão encontrar problemas e precisam de um jeito fácil de avisar.

## O que normalmente pode esperar

- painéis administrativos completos (uma planilha ou tela simples resolve no início);
- automações de casos raros;
- personalização visual avançada;
- integrações que podem ser feitas manualmente nas primeiras semanas;
- aplicativo nativo, quando uma aplicação web responsiva atende.

## Sinais de que o escopo cresceu demais

- a primeira versão leva mais de alguns meses para ficar pronta;
- toda funcionalidade é "essencial";
- ninguém consegue dizer qual hipótese o MVP testa.

## Depois do lançamento

O trabalho de verdade começa quando os primeiros usuários entram. Acompanhe o uso, converse com eles e priorize a próxima versão a partir do que acontece na prática, não do que foi imaginado no início.

Se você tem uma ideia e quer transformá-la em uma primeira versão, conheça como trabalhamos com [MVP e produtos digitais](/mvp-produtos-digitais) ou faça o [teste de prontidão para MVP](/diagnostico/prontidao-mvp).`,
  },
  {
    title: 'Painéis de indicadores: do relatório em planilha ao dado sempre atualizado',
    slug: 'paineis-de-indicadores-com-dados-do-erp',
    category: 'Gestão e processos',
    publishedAt: '2026-09-22T12:00:00.000Z',
    excerpt:
      'Se o relatório da diretoria depende de alguém exportar dados e montar planilhas, ele chega atrasado e com risco de erro. Veja como sair desse modelo.',
    cover: {
      file: 'paineis.jpg',
      alt: 'Pessoa analisando gráficos em um notebook sobre a mesa',
    },
    content: `Em muitas empresas, os indicadores mais importantes nascem do mesmo ritual: exportar dados do ERP, colar em uma planilha, ajustar fórmulas e enviar por e-mail. Funciona, mas tem três problemas.

1. **Atraso.** O número chega dias depois do fechamento, quando a decisão já devia ter sido tomada.
2. **Dependência.** Só uma ou duas pessoas sabem montar o relatório.
3. **Divergência.** Cada área tem a sua versão da planilha, e os números não batem.

## O que muda com um painel conectado

Um painel de indicadores lê os dados direto da origem (ERP, CRM, planilhas oficiais) e atualiza automaticamente. A gestão passa a olhar para o mesmo número, no mesmo momento.

Exemplos de indicadores que costumam ir primeiro para um painel:

- vendas por vendedor, região e cliente;
- pedidos em aberto e prazo de entrega;
- margem por produto ou linha;
- comissões e metas;
- produtividade da equipe de campo.

## Ferramenta pronta ou painel sob medida?

Ferramentas de BI resolvem bem quando os dados já estão organizados e a necessidade é análise. Um painel sob medida faz mais sentido quando:

- os dados precisam ser tratados ou cruzados antes de virar indicador;
- o painel precisa ser usado por clientes ou parceiros, com acesso controlado;
- as regras de cálculo, como comissões, são específicas da empresa;
- o indicador precisa disparar uma ação, como um alerta ou uma tarefa.

## Comece pelo relatório que mais dá trabalho

Escolha o relatório que consome mais horas por mês ou que gera mais discussão sobre qual número está certo. Transformá-lo em painel costuma ser um primeiro projeto curto e com resultado visível.

Veja como funcionam os [painéis integrados ao ERP](/lp/paineis-indicadores-erp).`,
  },
  {
    title: 'Automação de propostas e contratos: por onde começar',
    slug: 'automacao-de-propostas-e-contratos',
    category: 'Automação',
    publishedAt: '2026-09-29T12:00:00.000Z',
    excerpt:
      'Propostas montadas a partir de cópias de arquivos antigos geram erros de valores, versões diferentes e atrasos. Veja um caminho prático para automatizar esse processo.',
    cover: {
      file: 'propostas.jpg',
      alt: 'Documento impresso sobre uma mesa de madeira com caneta ao lado',
    },
    content: `Em empresas de serviços, a proposta comercial é muitas vezes montada assim: abrir a proposta parecida mais recente, salvar com outro nome, trocar o nome do cliente, ajustar os valores e torcer para nada ter ficado para trás.

O resultado é conhecido: valores desatualizados, cláusulas que não se aplicam e o nome de outro cliente esquecido no meio do texto.

## O que pode ser automatizado

- **Geração do documento** a partir dos dados do cliente e dos itens escolhidos, em PDF.
- **Tabelas de preço e condições** sempre atualizadas, em um só lugar.
- **Contrato gerado a partir da proposta aprovada**, sem redigitar nada.
- **Acompanhamento** do que foi enviado, visualizado e aprovado.
- **Assinatura eletrônica**, quando fizer sentido para o negócio.

## Um caminho em etapas

### 1. Padronize os modelos

Antes de qualquer automação, revise os modelos de proposta e contrato. Separe o que é texto fixo do que muda por cliente.

### 2. Centralize os dados

Clientes, serviços, preços e condições precisam estar em um lugar só, seja um sistema, um CRM ou, no começo, uma planilha bem estruturada.

### 3. Automatize a geração

Com modelos e dados organizados, a geração do documento passa a ser automática. É aqui que o ganho de tempo aparece.

### 4. Conecte o resto do fluxo

Depois vêm as integrações: enviar por e-mail, registrar no CRM, avisar o financeiro quando a proposta for aprovada.

## Quanto controle a equipe mantém

Automação não significa perder o controle. Um bom fluxo mantém etapas de revisão e aprovação, registra quem alterou o quê e permite exceções quando o caso pede.

Quer saber o quanto do seu processo comercial pode ser automatizado? Faça o [diagnóstico de automação de documentos](/diagnostico/automacao-documentos) ou veja a página de [automação de propostas e documentos](/lp/automacao-propostas-documentos).`,
  },
  {
    title: 'App para equipe externa: o que vendedores e técnicos precisam ter na mão',
    slug: 'app-para-equipe-externa',
    category: 'Sistemas sob medida',
    publishedAt: '2026-10-05T12:00:00.000Z',
    excerpt:
      'Quando vendedores e técnicos dependem do escritório para consultar o ERP, a operação trava. Veja o que um aplicativo para equipe externa precisa resolver.',
    cover: {
      file: 'equipe-externa.jpg',
      alt: 'Técnico de capacete trabalhando em uma instalação elétrica',
    },
    content: `Vendedores, representantes e técnicos passam a maior parte do tempo fora da empresa, mas as informações de que precisam estão dentro dela, no ERP. O resultado é uma rotina de ligações e mensagens para o escritório: tem estoque? qual o preço para esse cliente? essa ordem de serviço já foi liberada?

## O que a equipe externa precisa consultar

- **Estoque e preço** atualizados, com as condições de cada cliente.
- **Histórico do cliente:** últimos pedidos, títulos em aberto, visitas e atendimentos anteriores.
- **Agenda e rotas** de visitas ou atendimentos do dia.

## O que a equipe externa precisa registrar

- **Pedidos**, que entram direto no ERP.
- **Ordens de serviço**, com checklist, fotos e assinatura do cliente.
- **Visitas e ocorrências**, para a gestão saber o que aconteceu em campo.

## Funcionar sem internet

Em campo, o sinal nem sempre ajuda. Um bom aplicativo guarda os dados essenciais no aparelho, permite registrar sem conexão e sincroniza quando a internet volta.

## Aplicativo nativo ou aplicação web?

Para muitas operações, uma aplicação web instalável no celular resolve bem e tem custo menor. O aplicativo nativo faz sentido quando é preciso usar recursos específicos do aparelho de forma intensa, como leitura de código de barras em grande volume ou funcionamento offline prolongado.

## Integrado ao ERP, não paralelo a ele

O erro mais comum é criar um aplicativo que vira mais uma base de dados separada. O aplicativo precisa ler e gravar no ERP, para que o pedido lançado em campo seja o mesmo que o faturamento enxerga.

Veja como funciona o [app para equipe externa integrado ao ERP](/lp/app-equipe-externa-erp).`,
  },
];
