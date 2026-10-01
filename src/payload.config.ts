import { postgresAdapter } from '@payloadcms/db-postgres';
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
import { LandingPages } from './collections/LandingPages';
import { Media } from './collections/Media';
import { Posts } from './collections/Posts';
import { Projects } from './collections/Projects';
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
    Posts,
    Categories,
    Media,
    Users,
  ],
  globals: [HomeFaq],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  i18n: { supportedLanguages: { pt }, fallbackLanguage: 'pt' },
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Esquema Drizzle tipado para consultas próprias (payload.db.drizzle).
    generateSchemaOutputFile: path.resolve(dirname, 'payload-generated-schema.ts'),
  }),
  sharp,
  plugins: [
    // Em produção as imagens vão para o Vercel Blob; localmente ficam em /media.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
});
