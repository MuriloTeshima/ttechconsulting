# TTech Consulting website

Company and campaign website for TTech Consulting, a software consultancy in Brazil. Visitors convert through the contact form, with WhatsApp as a direct alternative. The site content and the admin panel labels are in Brazilian Portuguese because that's the audience. Code, comments and this README are in English.

## Stack

- Next.js 16 (App Router, static pages revalidated on demand) + React 19 + React Compiler
- Payload CMS 3 (admin panel at `/admin`) on Postgres, with Drizzle ORM
- TypeScript (strict)
- Tailwind CSS v4 + brand CSS in `src/app/(frontend)/globals.css`
- Yarn 4 (`nodeLinker: node-modules`)
- `next/font` (Space Grotesk and Inter), `next/image`, Open Graph images generated with `next/og`

## Running locally

Requirements: Node 20+, Yarn 4 (through Corepack) and Docker.

```bash
yarn install
cp .env.example .env          # fill in PAYLOAD_SECRET and PREVIEW_SECRET (openssl rand -hex 32)
docker compose up -d          # local Postgres on port 5434
yarn seed                     # initial content: services, landing pages, quizzes, blog posts, projects, audiences, logos and FAQ
yarn dev                      # site at http://localhost:3000 and admin at http://localhost:3000/admin
```

The first time you open `/admin`, Payload asks you to create the admin user. In development the tables are created and updated automatically from the collections, and uploaded images go to the `media/` folder.

## Commands

```bash
yarn dev                 # development
yarn build && yarn start # local production build (needs Postgres running)
yarn lint
yarn typecheck
yarn seed                # initial CMS content (idempotent)
yarn generate:types      # collection types in src/payload-types.ts
yarn generate:db-schema  # typed Drizzle schema in src/payload-generated-schema.ts
yarn generate:importmap  # admin components (after adding custom components)
yarn migrate:create name # new migration after changing collections
yarn migrate             # applies pending migrations
yarn ci                  # migrate + build (build command on Vercel)
```

## CMS (Payload)

Site content is edited in the `/admin` panel. Panel labels are in Portuguese; the English meaning is in parentheses below.

| Group | Collections | Notes |
| --- | --- | --- |
| Site | Services, Audiences, Projects, Client logos, FAQ (home) | Drag-and-drop order in the panel is the order on the site |
| Campanhas (campaigns) | Landing pages | Draft, preview and publish; `/lp/<slug>` |
| Blog | Posts, Categories | Rich text editor, draft, preview and SEO per post; `/blog/<slug>` |
| Mídia (media) | Files | Alt text is required |

- **Reading:** `src/lib/cms.ts` uses Payload's Local API and converts documents to the types in `src/lib/content-types.ts`, which the components use.
- **Custom queries:** use `(await getCms()).db.drizzle` with the typed schema from `src/payload-generated-schema.ts`.
- **Site updates:** collection hooks (`src/collections/shared/revalidate.ts`) revalidate pages on save, publish or delete, so new content shows up without a deploy.
- **Preview:** the panel's preview button opens `/next/preview`, which requires `PREVIEW_SECRET` and a logged-in user.
- **Migrations:** after changing a collection, run `yarn migrate:create <name>` and commit the file in `src/migrations/`. Vercel applies pending migrations during the build.

### Quizzes (assessments)

Interactive assessments live at `/diagnostico/<slug>` and are created and edited under *Captação → Quizzes* (lead capture):

- **Questions** are blocks: single choice, multiple choice, 1 to 5 scale, number (scored by ranges) and free text. Each question key has to be unique within the quiz.
- **Scoring and recommendations:** each option (or number range) adds points and can point to solutions through its *Recomenda* field (keys from the *Soluções* tab, comma separated). The scale adds `(answer − 1) × weight`.
- **Results:** the visitor gets the profile with the highest *minimum score* their total reaches.
- **Contact before the result:** name, email and WhatsApp are always asked; company and role are optional.
- Scoring runs only on the server (`src/lib/quiz-scoring.ts`); the browser only receives questions and options.
- Draft and preview work like landing pages. In preview the result is shown, but nothing is saved or sent.
- A landing page can invite visitors to its niche's quiz through the *Quiz do nicho* field.

Responses go to *Captação → Respostas de quiz* (quiz responses), with status, notes, readable answers, profile, score, page and UTMs. They can be exported to CSV with the *Exportar* button. Each response also triggers the same email notification as the contact form.

Events sent to `dataLayer`/GA4: `quiz_start`, `quiz_step` (with `step` and `question_key`) and `quiz_complete` (with `profile`).

### Vercel setup

1. **Database:** *Storage → Create → Neon (Postgres)*, connected to the project. Vercel creates `DATABASE_URL`.
2. **Images:** *Storage → Create → Blob*, connected to the project. Vercel creates `BLOB_READ_WRITE_TOKEN`.
3. **Variables:** add `PAYLOAD_SECRET` and `PREVIEW_SECRET` (new values, different from the local ones).
4. **Build:** under *Settings → Build and Deployment*, set the *Build Command* to `yarn ci`.
5. After the first deploy, run the seed against the production database (once) and create the user at `https://ttechcs.com.br/admin`.

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Use |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production domain. Used for canonical URLs, sitemap, Open Graph and JSON-LD. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Business number (55 + area code + number). Without it, links open WhatsApp with no recipient. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID (`G-...`). Loads GA4 with Consent Mode and sends conversion events straight to it. |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container. Without it, no tags and no cookie banner are loaded. |
| `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY` | Server-side sending of the contact form. Without them, sending is simulated in dev and fails in production. |
| `CONTACT_TO` | Who receives contact messages. Default: the email in `src/config/site.ts`. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile on the contact form and quizzes. Without them, verification is off. |
| `RESEND_API_KEY`, `EMAIL_FROM` | Admin panel emails (password reset) through Resend. Without the key, the email only shows in the console. |

## Contact form

It sits at the end of the home page, on `/contato` and on landing pages (before the final call to action).

Call-to-action buttons (header, hero, final CTA, footer, landing pages) use `FormLink`. On a page that has the form they scroll to it; elsewhere they open `/contato?tipo=<type>#formulario` with the project type preselected. WhatsApp stays available next to the form and in the floating button (`WhatsAppLink`).

- Submitted through a Server Action (`src/app/actions/contact.ts`), validated in `src/lib/contact-schema.ts`.
- Every submission is saved in *Captação → Contatos do site* (site contacts), with CSV export, before the email notification goes out. If the email fails, the contact is still saved with "Aviso por e-mail enviado" (email notification sent) unchecked.
- The email is sent through the EmailJS REST API from the server (`src/lib/emailjs.ts`) with the private key, so no key reaches the browser.
- Anti-spam: Cloudflare Turnstile (invisible for most visits, `src/components/contact/Turnstile.tsx` and `src/lib/turnstile.ts`), a hidden field, a minimum fill time of 3 s and a limit of 5 valid submissions per IP every 10 minutes. Quizzes use the same protections.
- A `form_submit` event goes to `dataLayer` with the same attribution parameters as `whatsapp_click`.

**EmailJS setup:**

1. Under *Email Services*, connect Gmail (or another provider).
2. Under *Account > Security*, turn on *Allow EmailJS API for non-browser applications*.
3. Under *Email Templates*, create a template with:
   - **To Email:** `{{to_email}}`
   - **Reply To:** `{{email}}`
   - **Subject:** `Novo contato: {{project_type}} — {{name}}`
   - **Content:** use the variables `{{name}}`, `{{email}}`, `{{phone}}`, `{{whatsapp_link}}`, `{{company}}`, `{{project_type}}`, `{{message}}`, `{{page}}` and `{{attribution}}`.

## Admin security

- Login is locked for 15 minutes after 5 wrong passwords in a row.
- The GraphQL API is off (the panel only uses REST).
- `/admin`, `/api` and `/next` are kept out of search engines (`robots.txt` and `X-Robots-Tag: noindex`).
- "Forgot password" sends the email through Resend, with the link built from `NEXT_PUBLIC_SITE_URL`.

## Structure

```
src/
  app/
    (frontend)/                 root layout of the site
      (site)/                   company pages, services ([servico]) and blog
      (campanhas)/lp/[campanha]/  paid-traffic landing pages (no navigation)
    (payload)/                  /admin panel and Payload API (generated files)
    next/preview, next/exit-preview  draft preview mode
    global-not-found.tsx        404 for unknown URLs (there are two root layouts)
    sitemap.ts, robots.ts, manifest.ts
  collections/, globals/        CMS content models
  components/                   layout/, sections/, contact/, blog/, analytics/
  config/site.ts                company details and navigation
  lib/cms.ts                    reads content from the CMS
  lib/                          WhatsApp, analytics, attribution (UTM), consent, SEO, OG
  migrations/                   database migrations (generated by Payload)
  seed/                         initial CMS content (images/blog: CC0 covers from StockSnap)
  payload.config.ts
```

Site copy is edited in the `/admin` panel, not in the code.

## Marketing and measurement

**Landing pages** (`/lp/...`), one per pain point and offer:

- `/lp/automacao-propostas-documentos`: B2B services
- `/lp/automacao-atendimento-clinicas`: clinics
- `/lp/portal-pedidos-distribuidoras`: distributors
- `/lp/desenvolvimento-sistemas-ribeirao-preto`: local search

To create one, use *Campanhas → Landing pages* in the panel: fill in the copy, the WhatsApp message and the project type, preview and publish. The page, its OG image, JSON-LD and sitemap entry are generated automatically. Uncheck "Aparecer no Google" (show on Google) for pages that shouldn't be indexed.

**Conversion events:** submitting the form fires `form_submit`, a WhatsApp click fires `whatsapp_click`, and a click on a button that leads to the form fires `cta_click`. All of them send the same parameters to `dataLayer`:

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

Campaign parameters are captured on the first visit of the session and stay with the event even after the visitor moves to other pages.

**In GTM:** create custom event triggers for `form_submit` and `whatsapp_click` and attach the GA4 (`generate_lead`), Google Ads conversion and Meta Pixel (`Contact` or `Lead`) tags to them.

**Vercel Web Analytics:** counts visits and page views without cookies. Turn it on under *Vercel → project → Analytics*; data shows up after the next deploy.

**Consent (LGPD):** Google Consent Mode v2 starts with everything denied. The cookie banner updates consent and stores the choice in `localStorage`.

**SEO:** per-page metadata and canonical URLs, JSON-LD (`ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`), sitemap, robots and OG images in the brand style.

## Before going live

- Set the official WhatsApp number, the domain and the GTM ID.
- Configure the tags and conversions in GTM and test them with Tag Assistant.
- Don't publish case studies, numbers or testimonials without proof and permission.
