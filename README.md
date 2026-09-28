# TTech Consulting — site

Site institucional e de campanhas da TTech Consulting. A conversão acontece pelo formulário de contato, com o WhatsApp como alternativa direta.

## Stack

- Next.js 16 (App Router, todas as páginas geradas estaticamente) + React 19 + React Compiler
- TypeScript (strict)
- Tailwind CSS v4 + CSS da marca em `src/app/globals.css`
- Yarn 4 (`nodeLinker: node-modules`)
- `next/font` (Space Grotesk e Inter), `next/image`, imagens Open Graph geradas com `next/og`

## Comandos

```bash
yarn install
yarn dev        # http://localhost:3000
yarn build && yarn start
yarn lint
yarn typecheck
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local`.

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Domínio de produção. Usado em canonical, sitemap, Open Graph e JSON-LD. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número comercial (55 + DDD + número). Sem ele, os links abrem o WhatsApp sem destinatário. |
| `NEXT_PUBLIC_GTM_ID` | Container do Google Tag Manager. Sem ele, nenhuma tag nem banner de cookies é carregado. |

| `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY` | Envio do formulário de contato pelo servidor. Sem elas, o envio é simulado no modo dev e falha em produção. |
| `CONTACT_TO` | Destinatário dos contatos. Padrão: e-mail em `src/config/site.ts`. |

## Formulário de contato

Fica no fim da home, na página `/contato` e nas landing pages (antes do CTA final).

Os botões de chamada (header, hero, CTA final, rodapé, landing pages) usam `FormLink`: na página que tem o formulário, rolam até ele; nas demais, abrem `/contato?tipo=<tipo>#formulario` com o tipo de projeto pré-selecionado. O WhatsApp continua no atalho ao lado do formulário e no botão flutuante (`WhatsAppLink`).

- Envio por Server Action (`src/app/actions/contact.ts`), com validação em `src/lib/contact-schema.ts`.
- O e-mail sai pela API REST do EmailJS chamada do servidor (`src/lib/emailjs.ts`), com a chave privada; nada de chave no navegador.
- Anti-spam: campo invisível, tempo mínimo de preenchimento (3 s) e limite de 5 envios válidos a cada 10 minutos por IP.
- Evento `form_submit` no `dataLayer`, com os mesmos parâmetros de atribuição do `whatsapp_click`.

**Configuração no EmailJS:**

1. Em *Email Services*, conecte o Gmail (ou outro provedor).
2. Em *Account > Security*, ative *Allow EmailJS API for non-browser applications*.
3. Em *Email Templates*, crie um template com:
   - **To Email:** `{{to_email}}`
   - **Reply To:** `{{email}}`
   - **Subject:** `Novo contato: {{project_type}} — {{name}}`
   - **Conteúdo:** use as variáveis `{{name}}`, `{{email}}`, `{{phone}}`, `{{whatsapp_link}}`, `{{company}}`, `{{project_type}}`, `{{message}}`, `{{page}}` e `{{attribution}}`.

## Estrutura

```
src/
  app/
    (site)/                 páginas institucionais (header, footer e botão flutuante)
      [servico]/            páginas de solução geradas a partir de content/services.ts
    (campanhas)/lp/[campanha]/  landing pages de tráfego pago (sem navegação)
    sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
  components/               Logo, ContactLink, layout/, sections/, analytics/
  config/site.ts            dados da empresa e navegação
  content/                  textos: serviços, projetos, FAQ e landing pages
  lib/                      whatsapp, analytics, atribuição (UTM), consentimento, SEO, OG
```

Os textos ficam em `src/content/`. Para mudar uma copy, edite o conteúdo, não o componente.

## Marketing e mensuração

**Landing pages** (`/lp/...`), uma por dor e oferta:

- `/lp/automacao-propostas-documentos`: serviços B2B
- `/lp/automacao-atendimento-clinicas`: clínicas
- `/lp/portal-pedidos-distribuidoras`: distribuidoras
- `/lp/desenvolvimento-sistemas-ribeirao-preto`: busca local

Para criar uma LP, adicione um item em `src/content/landing-pages.ts` e a mensagem correspondente em `src/lib/whatsapp.ts`. A página, a imagem OG, o JSON-LD e a entrada no sitemap são gerados automaticamente. Use `index: false` para páginas que não devem aparecer no Google.

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

**Consentimento (LGPD):** o Google Consent Mode v2 começa com tudo negado. O banner de cookies atualiza o consentimento e grava a escolha em `localStorage`.

**SEO:** metadata e canonical por página, JSON-LD (`ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`), sitemap, robots e imagens OG na identidade da marca.

## Antes de publicar

- Definir o número oficial de WhatsApp, o domínio e o ID do GTM.
- Configurar as tags e conversões no GTM e testar com o Tag Assistant.
- Não publicar cases, números ou depoimentos sem comprovação e autorização.
