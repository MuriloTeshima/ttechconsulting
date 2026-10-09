# TTech Consulting — site

Site institucional e de campanhas da TTech Consulting. A conversão acontece pelo formulário de contato, com o WhatsApp como alternativa direta.

## Stack

- Next.js 16 (App Router, páginas estáticas revalidadas sob demanda) + React 19 + React Compiler
- Payload CMS 3 (painel em `/admin`) sobre Postgres, com Drizzle ORM
- TypeScript (strict)
- Tailwind CSS v4 + CSS da marca em `src/app/(frontend)/globals.css`
- Yarn 4 (`nodeLinker: node-modules`)
- `next/font` (Space Grotesk e Inter), `next/image`, imagens Open Graph geradas com `next/og`

## Rodando localmente

Pré-requisitos: Node 20+, Yarn 4 (via Corepack) e Docker.

```bash
yarn install
cp .env.example .env          # preencha PAYLOAD_SECRET e PREVIEW_SECRET (openssl rand -hex 32)
docker compose up -d          # Postgres local na porta 5434
yarn seed                     # carga inicial: serviços, landing pages, quizzes, posts do blog, projetos, públicos, logos e FAQ
yarn dev                      # site em http://localhost:3000 e painel em http://localhost:3000/admin
```

No primeiro acesso ao `/admin`, o Payload pede para criar o usuário administrador. Em desenvolvimento, as tabelas são criadas e atualizadas automaticamente a partir das coleções, e as imagens enviadas ficam na pasta `media/`.

## Comandos

```bash
yarn dev                 # desenvolvimento
yarn build && yarn start # build de produção local (precisa do Postgres rodando)
yarn lint
yarn typecheck
yarn seed                # carga inicial do CMS (idempotente)
yarn generate:types      # tipos das coleções em src/payload-types.ts
yarn generate:db-schema  # esquema Drizzle tipado em src/payload-generated-schema.ts
yarn generate:importmap  # componentes do painel (após adicionar componentes customizados)
yarn migrate:create nome # nova migração após alterar coleções
yarn migrate             # aplica migrações pendentes
yarn ci                  # migrate + build (comando de build na Vercel)
```

## CMS (Payload)

O conteúdo do site é editado no painel `/admin`:

| Grupo | Coleções | Observação |
| --- | --- | --- |
| Site | Serviços, Públicos, Projetos, Logos de clientes, Perguntas frequentes (home) | A ordem no painel (arrastar) é a ordem no site |
| Campanhas | Landing pages | Rascunho, pré-visualização e publicação; `/lp/<slug>` |
| Blog | Posts, Categorias | Editor rico, rascunho, pré-visualização e SEO por post; `/blog/<slug>` |
| Mídia | Arquivos | Texto alternativo obrigatório |

- **Leitura:** `src/lib/cms.ts` usa a API local do Payload e converte os documentos para os tipos de `src/lib/content-types.ts`, usados pelos componentes.
- **Consultas próprias:** use `(await getCms()).db.drizzle` com o esquema tipado de `src/payload-generated-schema.ts`.
- **Atualização do site:** os hooks das coleções (`src/collections/shared/revalidate.ts`) revalidam as páginas ao salvar, publicar ou apagar. Conteúdo novo aparece sem novo deploy.
- **Pré-visualização:** o botão "Pré-visualizar" do painel abre `/next/preview`, que exige o `PREVIEW_SECRET` e um usuário logado.
- **Migrações:** ao alterar uma coleção, rode `yarn migrate:create <nome>` e commite o arquivo em `src/migrations/`. A Vercel aplica as migrações pendentes no build.

### Quizzes (diagnósticos)

Diagnósticos interativos em `/diagnostico/<slug>`, criados e editados em *Captação → Quizzes*:

- **Perguntas** em blocos: escolha única, múltipla escolha, escala de 1 a 5, número (pontuado por faixas) e texto livre. O identificador de cada pergunta precisa ser único no quiz.
- **Pontuação e recomendações:** cada opção (ou faixa de número) soma pontos e pode indicar soluções pelo campo *Recomenda* (chaves da aba *Soluções*, separadas por vírgula). A escala soma `(resposta − 1) × peso`.
- **Resultados:** vale o perfil com a maior *pontuação mínima* que o total atinge.
- **Contato antes do resultado:** nome, e-mail e WhatsApp sempre; empresa e cargo opcionais.
- A pontuação é calculada só no servidor (`src/lib/quiz-scoring.ts`); o navegador recebe apenas perguntas e opções.
- Rascunho e pré-visualização como nas landing pages; na pré-visualização o resultado aparece, mas nada é gravado nem enviado.
- Uma landing page pode convidar para o quiz do nicho pelo campo *Quiz do nicho*.

As respostas ficam em *Captação → Respostas de quiz*, com status, anotações, respostas legíveis, perfil, pontuação, página e UTMs, e podem ser exportadas em CSV pelo botão *Exportar*. Cada resposta também gera o aviso por e-mail do formulário de contato.

Eventos no `dataLayer`/GA4: `quiz_start`, `quiz_step` (com `step` e `question_key`) e `quiz_complete` (com `profile`).

### Configuração na Vercel

1. **Banco:** *Storage → Create → Neon (Postgres)*, conectado ao projeto. A Vercel cria `DATABASE_URL`.
2. **Imagens:** *Storage → Create → Blob*, conectado ao projeto. A Vercel cria `BLOB_READ_WRITE_TOKEN`.
3. **Variáveis:** cadastre `PAYLOAD_SECRET` e `PREVIEW_SECRET` (valores novos, diferentes dos locais).
4. **Build:** em *Settings → Build and Deployment*, defina o *Build Command* como `yarn ci`.
5. Depois do primeiro deploy, rode o seed apontando para o banco de produção (uma única vez) e crie o usuário em `https://ttechcs.com.br/admin`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local`.

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Domínio de produção. Usado em canonical, sitemap, Open Graph e JSON-LD. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número comercial (55 + DDD + número). Sem ele, os links abrem o WhatsApp sem destinatário. |
| `NEXT_PUBLIC_GA_ID` | ID do Google Analytics 4 (`G-...`). Carrega o GA4 com Consent Mode e envia os eventos de conversão direto para ele. |
| `NEXT_PUBLIC_GTM_ID` | Container do Google Tag Manager. Sem ele, nenhuma tag nem banner de cookies é carregado. |

| `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY` | Envio do formulário de contato pelo servidor. Sem elas, o envio é simulado no modo dev e falha em produção. |
| `CONTACT_TO` | Destinatário dos contatos. Padrão: e-mail em `src/config/site.ts`. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile no contato e nos quizzes. Sem elas, a verificação fica desligada. |
| `RESEND_API_KEY`, `EMAIL_FROM` | E-mails do painel (redefinição de senha) via Resend. Sem a chave, o e-mail só aparece no console. |

## Formulário de contato

Fica no fim da home, na página `/contato` e nas landing pages (antes do CTA final).

Os botões de chamada (header, hero, CTA final, rodapé, landing pages) usam `FormLink`: na página que tem o formulário, rolam até ele; nas demais, abrem `/contato?tipo=<tipo>#formulario` com o tipo de projeto pré-selecionado. O WhatsApp continua no atalho ao lado do formulário e no botão flutuante (`WhatsAppLink`).

- Envio por Server Action (`src/app/actions/contact.ts`), com validação em `src/lib/contact-schema.ts`.
- Cada envio é gravado em **Captação → Contatos do site** no painel (com exportação em CSV) antes do aviso por e-mail. Se o e-mail falhar, o contato continua salvo, com "Aviso por e-mail enviado" desmarcado.
- O e-mail sai pela API REST do EmailJS chamada do servidor (`src/lib/emailjs.ts`), com a chave privada; nada de chave no navegador.
- Anti-spam: Cloudflare Turnstile (invisível na maioria dos acessos, `src/components/contact/Turnstile.tsx` e `src/lib/turnstile.ts`), campo invisível, tempo mínimo de preenchimento (3 s) e limite de 5 envios válidos a cada 10 minutos por IP. O quiz usa as mesmas proteções.
- Evento `form_submit` no `dataLayer`, com os mesmos parâmetros de atribuição do `whatsapp_click`.

**Configuração no EmailJS:**

1. Em *Email Services*, conecte o Gmail (ou outro provedor).
2. Em *Account > Security*, ative *Allow EmailJS API for non-browser applications*.
3. Em *Email Templates*, crie um template com:
   - **To Email:** `{{to_email}}`
   - **Reply To:** `{{email}}`
   - **Subject:** `Novo contato: {{project_type}} — {{name}}`
   - **Conteúdo:** use as variáveis `{{name}}`, `{{email}}`, `{{phone}}`, `{{whatsapp_link}}`, `{{company}}`, `{{project_type}}`, `{{message}}`, `{{page}}` e `{{attribution}}`.

## Segurança do painel

- Login bloqueado por 15 minutos depois de 5 senhas erradas seguidas.
- API GraphQL desligada (o painel usa só a REST).
- `/admin`, `/api` e `/next` fora dos buscadores (`robots.txt` e `X-Robots-Tag: noindex`).
- "Esqueci minha senha" envia o e-mail pelo Resend, com o link montado a partir de `NEXT_PUBLIC_SITE_URL`.

## Estrutura

```
src/
  app/
    (frontend)/                 layout raiz do site
      (site)/                   páginas institucionais, serviços ([servico]) e blog
      (campanhas)/lp/[campanha]/  landing pages de tráfego pago (sem navegação)
    (payload)/                  painel /admin e API do Payload (arquivos gerados)
    next/preview, next/exit-preview  modo de pré-visualização de rascunhos
    global-not-found.tsx        404 para URLs inexistentes (há dois layouts raiz)
    sitemap.ts, robots.ts, manifest.ts
  collections/, globals/        modelos de conteúdo do CMS
  components/                   layout/, sections/, contact/, blog/, analytics/
  config/site.ts                dados da empresa e navegação
  lib/cms.ts                    leitura do conteúdo do CMS
  lib/                          whatsapp, analytics, atribuição (UTM), consentimento, SEO, OG
  migrations/                   migrações do banco (geradas pelo Payload)
  seed/                         carga inicial do CMS (images/blog: capas CC0 do StockSnap)
  payload.config.ts
```

Os textos são editados no painel `/admin`, não no código.

## Marketing e mensuração

**Landing pages** (`/lp/...`), uma por dor e oferta:

- `/lp/automacao-propostas-documentos`: serviços B2B
- `/lp/automacao-atendimento-clinicas`: clínicas
- `/lp/portal-pedidos-distribuidoras`: distribuidoras
- `/lp/desenvolvimento-sistemas-ribeirao-preto`: busca local

Para criar uma LP, use *Campanhas → Landing pages* no painel: preencha os textos, a mensagem do WhatsApp e o tipo de projeto, pré-visualize e publique. A página, a imagem OG, o JSON-LD e a entrada no sitemap são gerados automaticamente. Desmarque "Aparecer no Google" para páginas que não devem ser indexadas.

**Eventos de conversão:** o envio do formulário dispara `form_submit`, o clique em WhatsApp dispara `whatsapp_click` e o clique em um botão que leva ao formulário dispara `cta_click`. Todos enviam ao `dataLayer` os mesmos parâmetros:

```js
{
  event: 'whatsapp_click',
  cta_location: 'hero' | 'header' | 'final' | 'sticky' | 'floating' | 'menu' | 'footer' | 'contact',
  service: 'geral' | 'sistema' | 'automacao' | 'lp-clinicas' | ...,
  page_path: '/lp/...',
  utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid, gbraid, wbraid, fbclid,
  landing_page
}
```

Os parâmetros de campanha são capturados no primeiro acesso da sessão e seguem com o evento mesmo depois de o visitante navegar para outras páginas.

**No GTM:** crie acionadores de evento personalizado para `form_submit` e `whatsapp_click` e ligue a eles as tags de GA4 (`generate_lead`), conversão do Google Ads e Meta Pixel (`Contact` ou `Lead`).

**Vercel Web Analytics:** conta visitas e páginas vistas sem cookies. Ative em *Vercel → projeto → Analytics*; os dados aparecem após o próximo deploy.

**Consentimento (LGPD):** o Google Consent Mode v2 começa com tudo negado. O banner de cookies atualiza o consentimento e grava a escolha em `localStorage`.

**SEO:** metadata e canonical por página, JSON-LD (`ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`), sitemap, robots e imagens OG na identidade da marca.

## Antes de publicar

- Definir o número oficial de WhatsApp, o domínio e o ID do GTM.
- Configurar as tags e conversões no GTM e testar com o Tag Assistant.
- Não publicar cases, números ou depoimentos sem comprovação e autorização.
