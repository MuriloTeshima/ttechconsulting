import { postgresAdapter } from '@payloadcms/db-postgres';
import { resendAdapter } from '@payloadcms/email-resend';
import { importExportPlugin } from '@payloadcms/plugin-import-export';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { pt } from '@payloadcms/translations/languages/pt';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { Audiences } from './collections/Audiences';
import { Categories } from './collections/Categories';
import { ClientLogos } from './collections/ClientLogos';
import { ContactLeads } from './collections/ContactLeads';
import { LandingPages } from './collections/LandingPages';
import { Media } from './collections/Media';
import { Posts } from './collections/Posts';
import { Projects } from './collections/Projects';
import { QuizResponses } from './collections/QuizResponses';
import { Quizzes } from './collections/Quizzes';
import { Services } from './collections/Services';
import { Users } from './collections/Users';
import { HomeFaq } from './globals/HomeFaq';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · TTech CMS' },
  },
  collections: [
    Services,
    Audiences,
    Projects,
    ClientLogos,
    LandingPages,
    Quizzes,
    QuizResponses,
    ContactLeads,
    Posts,
    Categories,
    Media,
    Users,
  ],
  globals: [HomeFaq],
  editor: lexicalEditor(),
  // The panel only uses the REST API; GraphQL would be exposed for nothing.
  graphQL: { disable: true },
  // Panel emails (password reset). Without the key, Payload only writes them to the console.
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: process.env.EMAIL_FROM || 'nao-responda@ttechcs.com.br',
        defaultFromName: 'TTech Consulting',
      })
    : undefined,
  secret: process.env.PAYLOAD_SECRET || '',
  i18n: { supportedLanguages: { pt }, fallbackLanguage: 'pt' },
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Typed Drizzle schema for custom queries (payload.db.drizzle).
    generateSchemaOutputFile: path.resolve(dirname, 'payload-generated-schema.ts'),
  }),
  sharp,
  plugins: [
    // CSV export of the leads, downloaded on the spot (no file saved on the server).
    importExportPlugin({
      collections: (['quiz-responses', 'contact-leads'] as const).map((slug) => ({
        slug,
        import: false,
        export: { format: 'csv' as const, disableSave: true, disableJobsQueue: true },
      })),
    }),
    // In production images go to Vercel Blob; locally they stay in /media.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Creates the plugin's fields even when it's off, so the database schema is the same in every environment.
      alwaysInsertFields: true,
      // Public images served straight from the Blob network, without going through the site's server.
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
});
