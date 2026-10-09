import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contact_leads_status" AS ENUM('novo', 'em-contato', 'qualificado', 'descartado');
  CREATE TYPE "public"."enum_contact_leads_project_type" AS ENUM('sistema', 'automacao', 'mvp', 'site', 'evolucao', 'outro');
  CREATE TABLE "contact_leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_contact_leads_status" DEFAULT 'novo' NOT NULL,
  	"notes" varchar,
  	"email_sent" boolean DEFAULT false,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"company" varchar,
  	"project_type" "enum_contact_leads_project_type" NOT NULL,
  	"message" varchar NOT NULL,
  	"page_path" varchar,
  	"attribution" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_leads_id" integer;
  CREATE INDEX "contact_leads_updated_at_idx" ON "contact_leads" USING btree ("updated_at");
  CREATE INDEX "contact_leads_created_at_idx" ON "contact_leads" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_leads_fk" FOREIGN KEY ("contact_leads_id") REFERENCES "public"."contact_leads"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_contact_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_leads_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_leads" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "contact_leads" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contact_leads_fk";
  
  DROP INDEX "payload_locked_documents_rels_contact_leads_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "contact_leads_id";
  DROP TYPE "public"."enum_contact_leads_status";
  DROP TYPE "public"."enum_contact_leads_project_type";`)
}
