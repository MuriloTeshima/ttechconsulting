import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" ADD COLUMN "quiz_id" integer;
  ALTER TABLE "projects" ADD COLUMN "problem" varchar;
  ALTER TABLE "projects" ADD COLUMN "solution" varchar;
  ALTER TABLE "projects" ADD COLUMN "image_id" integer;
  ALTER TABLE "projects" ADD COLUMN "demo_url" varchar;
  ALTER TABLE "projects" ADD COLUMN "is_demo" boolean DEFAULT true;
  ALTER TABLE "services" ADD CONSTRAINT "services_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services_quiz_idx" ON "services" USING btree ("quiz_id");
  CREATE INDEX "projects_image_idx" ON "projects" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" DROP CONSTRAINT "services_quiz_id_quizzes_id_fk";
  
  ALTER TABLE "projects" DROP CONSTRAINT "projects_image_id_media_id_fk";
  
  DROP INDEX "services_quiz_idx";
  DROP INDEX "projects_image_idx";
  ALTER TABLE "services" DROP COLUMN "quiz_id";
  ALTER TABLE "projects" DROP COLUMN "problem";
  ALTER TABLE "projects" DROP COLUMN "solution";
  ALTER TABLE "projects" DROP COLUMN "image_id";
  ALTER TABLE "projects" DROP COLUMN "demo_url";
  ALTER TABLE "projects" DROP COLUMN "is_demo";`)
}
