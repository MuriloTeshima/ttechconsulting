import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_idealtrack_events_result" AS ENUM('post-criado', 'registrado', 'formato-nao-suportado');
  CREATE TABLE "idealtrack_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"result" "enum_idealtrack_events_result" NOT NULL,
  	"post_id" integer,
  	"notes" varchar,
  	"summary" varchar NOT NULL,
  	"event" varchar NOT NULL,
  	"event_id" varchar NOT NULL,
  	"project" varchar,
  	"prompt" varchar,
  	"occurred_at" timestamp(3) with time zone,
  	"payload" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "idealtrack_events_id" integer;
  ALTER TABLE "idealtrack_events" ADD CONSTRAINT "idealtrack_events_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "idealtrack_events_post_idx" ON "idealtrack_events" USING btree ("post_id");
  CREATE UNIQUE INDEX "idealtrack_events_event_id_idx" ON "idealtrack_events" USING btree ("event_id");
  CREATE INDEX "idealtrack_events_updated_at_idx" ON "idealtrack_events" USING btree ("updated_at");
  CREATE INDEX "idealtrack_events_created_at_idx" ON "idealtrack_events" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_idealtrack_events_fk" FOREIGN KEY ("idealtrack_events_id") REFERENCES "public"."idealtrack_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_idealtrack_events_id_idx" ON "payload_locked_documents_rels" USING btree ("idealtrack_events_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "idealtrack_events" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "idealtrack_events" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_idealtrack_events_fk";
  
  DROP INDEX "payload_locked_documents_rels_idealtrack_events_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "idealtrack_events_id";
  DROP TYPE "public"."enum_idealtrack_events_result";`)
}
