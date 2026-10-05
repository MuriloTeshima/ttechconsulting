import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_quizzes_project_type" AS ENUM('sistema', 'automacao', 'mvp', 'site', 'evolucao', 'outro');
  CREATE TYPE "public"."enum_quizzes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__quizzes_v_version_project_type" AS ENUM('sistema', 'automacao', 'mvp', 'site', 'evolucao', 'outro');
  CREATE TYPE "public"."enum__quizzes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_quiz_responses_status" AS ENUM('novo', 'em-contato', 'qualificado', 'descartado');
  CREATE TYPE "public"."enum_exports_format" AS ENUM('csv', 'json');
  CREATE TYPE "public"."enum_exports_sort_order" AS ENUM('asc', 'desc');
  CREATE TYPE "public"."enum_exports_drafts" AS ENUM('yes', 'no');
  CREATE TYPE "public"."enum_imports_import_mode" AS ENUM('create', 'update', 'upsert');
  CREATE TYPE "public"."enum_imports_status" AS ENUM('pending', 'completed', 'partial', 'failed');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'createCollectionExport', 'createCollectionImport');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'createCollectionExport', 'createCollectionImport');
  CREATE TABLE "quizzes_blocks_single_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"points" numeric DEFAULT 0,
  	"recommends" varchar
  );
  
  CREATE TABLE "quizzes_blocks_single" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"question" varchar,
  	"help" varchar,
  	"required" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "quizzes_blocks_multiple_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"points" numeric DEFAULT 0,
  	"recommends" varchar
  );
  
  CREATE TABLE "quizzes_blocks_multiple" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"question" varchar,
  	"help" varchar,
  	"required" boolean DEFAULT true,
  	"max_selections" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "quizzes_blocks_scale" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"question" varchar,
  	"help" varchar,
  	"required" boolean DEFAULT true,
  	"min_label" varchar,
  	"max_label" varchar,
  	"weight" numeric DEFAULT 1,
  	"block_name" varchar
  );
  
  CREATE TABLE "quizzes_blocks_number_ranges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"min" numeric,
  	"max" numeric,
  	"points" numeric DEFAULT 0,
  	"recommends" varchar
  );
  
  CREATE TABLE "quizzes_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"question" varchar,
  	"help" varchar,
  	"required" boolean DEFAULT true,
  	"unit" varchar,
  	"placeholder" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "quizzes_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"question" varchar,
  	"help" varchar,
  	"required" boolean DEFAULT true,
  	"placeholder" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "quizzes_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "quizzes_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"min_score" numeric DEFAULT 0,
  	"summary" varchar
  );
  
  CREATE TABLE "quizzes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"segment" varchar,
  	"project_type" "enum_quizzes_project_type" DEFAULT 'sistema',
  	"index" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"description" varchar,
  	"start_label" varchar DEFAULT 'Começar diagnóstico',
  	"estimated_time" varchar DEFAULT 'Leva cerca de 2 minutos',
  	"whatsapp_message" varchar,
  	"lead_title" varchar DEFAULT 'Seu diagnóstico está pronto.',
  	"lead_description" varchar DEFAULT 'Informe seus dados para ver o resultado e as recomendações.',
  	"ask_company" boolean DEFAULT true,
  	"ask_role" boolean DEFAULT true,
  	"submit_label" varchar DEFAULT 'Ver meu resultado',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_quizzes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_quizzes_v_blocks_single_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"points" numeric DEFAULT 0,
  	"recommends" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_quizzes_v_blocks_single" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"question" varchar,
  	"help" varchar,
  	"required" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_quizzes_v_blocks_multiple_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"points" numeric DEFAULT 0,
  	"recommends" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_quizzes_v_blocks_multiple" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"question" varchar,
  	"help" varchar,
  	"required" boolean DEFAULT true,
  	"max_selections" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_quizzes_v_blocks_scale" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"question" varchar,
  	"help" varchar,
  	"required" boolean DEFAULT true,
  	"min_label" varchar,
  	"max_label" varchar,
  	"weight" numeric DEFAULT 1,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_quizzes_v_blocks_number_ranges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"min" numeric,
  	"max" numeric,
  	"points" numeric DEFAULT 0,
  	"recommends" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_quizzes_v_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"question" varchar,
  	"help" varchar,
  	"required" boolean DEFAULT true,
  	"unit" varchar,
  	"placeholder" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_quizzes_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"question" varchar,
  	"help" varchar,
  	"required" boolean DEFAULT true,
  	"placeholder" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_quizzes_v_version_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_quizzes_v_version_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"min_score" numeric DEFAULT 0,
  	"summary" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_quizzes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_segment" varchar,
  	"version_project_type" "enum__quizzes_v_version_project_type" DEFAULT 'sistema',
  	"version_index" boolean DEFAULT true,
  	"version_eyebrow" varchar,
  	"version_headline" varchar,
  	"version_description" varchar,
  	"version_start_label" varchar DEFAULT 'Começar diagnóstico',
  	"version_estimated_time" varchar DEFAULT 'Leva cerca de 2 minutos',
  	"version_whatsapp_message" varchar,
  	"version_lead_title" varchar DEFAULT 'Seu diagnóstico está pronto.',
  	"version_lead_description" varchar DEFAULT 'Informe seus dados para ver o resultado e as recomendações.',
  	"version_ask_company" boolean DEFAULT true,
  	"version_ask_role" boolean DEFAULT true,
  	"version_submit_label" varchar DEFAULT 'Ver meu resultado',
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__quizzes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "quiz_responses_answers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "quiz_responses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_quiz_responses_status" DEFAULT 'novo' NOT NULL,
  	"notes" varchar,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"company" varchar,
  	"role" varchar,
  	"quiz_title" varchar NOT NULL,
  	"profile" varchar NOT NULL,
  	"score" numeric NOT NULL,
  	"quiz_id" integer,
  	"recommendations" varchar,
  	"page_path" varchar,
  	"attribution" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "exports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"format" "enum_exports_format" DEFAULT 'csv' NOT NULL,
  	"limit" numeric,
  	"page" numeric DEFAULT 1,
  	"sort" varchar,
  	"sort_order" "enum_exports_sort_order",
  	"drafts" "enum_exports_drafts" DEFAULT 'yes',
  	"collection_slug" varchar DEFAULT 'quiz-responses' NOT NULL,
  	"where" jsonb DEFAULT '{}'::jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "exports_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "imports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"collection_slug" varchar NOT NULL,
  	"import_mode" "enum_imports_import_mode",
  	"match_field" varchar DEFAULT 'id',
  	"status" "enum_imports_status" DEFAULT 'pending',
  	"summary_imported" numeric,
  	"summary_updated" numeric,
  	"summary_total" numeric,
  	"summary_issues" numeric,
  	"summary_issue_details" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "landing_pages" ADD COLUMN "quiz_id" integer;
  ALTER TABLE "_landing_pages_v" ADD COLUMN "version_quiz_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "quizzes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "quiz_responses_id" integer;
  ALTER TABLE "quizzes_blocks_single_options" ADD CONSTRAINT "quizzes_blocks_single_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quizzes_blocks_single"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quizzes_blocks_single" ADD CONSTRAINT "quizzes_blocks_single_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quizzes_blocks_multiple_options" ADD CONSTRAINT "quizzes_blocks_multiple_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quizzes_blocks_multiple"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quizzes_blocks_multiple" ADD CONSTRAINT "quizzes_blocks_multiple_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quizzes_blocks_scale" ADD CONSTRAINT "quizzes_blocks_scale_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quizzes_blocks_number_ranges" ADD CONSTRAINT "quizzes_blocks_number_ranges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quizzes_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quizzes_blocks_number" ADD CONSTRAINT "quizzes_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quizzes_blocks_text" ADD CONSTRAINT "quizzes_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quizzes_solutions" ADD CONSTRAINT "quizzes_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quizzes_results" ADD CONSTRAINT "quizzes_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_quizzes_v_blocks_single_options" ADD CONSTRAINT "_quizzes_v_blocks_single_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_quizzes_v_blocks_single"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_quizzes_v_blocks_single" ADD CONSTRAINT "_quizzes_v_blocks_single_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_quizzes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_quizzes_v_blocks_multiple_options" ADD CONSTRAINT "_quizzes_v_blocks_multiple_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_quizzes_v_blocks_multiple"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_quizzes_v_blocks_multiple" ADD CONSTRAINT "_quizzes_v_blocks_multiple_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_quizzes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_quizzes_v_blocks_scale" ADD CONSTRAINT "_quizzes_v_blocks_scale_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_quizzes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_quizzes_v_blocks_number_ranges" ADD CONSTRAINT "_quizzes_v_blocks_number_ranges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_quizzes_v_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_quizzes_v_blocks_number" ADD CONSTRAINT "_quizzes_v_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_quizzes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_quizzes_v_blocks_text" ADD CONSTRAINT "_quizzes_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_quizzes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_quizzes_v_version_solutions" ADD CONSTRAINT "_quizzes_v_version_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_quizzes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_quizzes_v_version_results" ADD CONSTRAINT "_quizzes_v_version_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_quizzes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_quizzes_v" ADD CONSTRAINT "_quizzes_v_parent_id_quizzes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."quizzes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "quiz_responses_answers" ADD CONSTRAINT "quiz_responses_answers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quiz_responses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quiz_responses" ADD CONSTRAINT "quiz_responses_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "exports_texts" ADD CONSTRAINT "exports_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."exports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "quizzes_blocks_single_options_order_idx" ON "quizzes_blocks_single_options" USING btree ("_order");
  CREATE INDEX "quizzes_blocks_single_options_parent_id_idx" ON "quizzes_blocks_single_options" USING btree ("_parent_id");
  CREATE INDEX "quizzes_blocks_single_order_idx" ON "quizzes_blocks_single" USING btree ("_order");
  CREATE INDEX "quizzes_blocks_single_parent_id_idx" ON "quizzes_blocks_single" USING btree ("_parent_id");
  CREATE INDEX "quizzes_blocks_single_path_idx" ON "quizzes_blocks_single" USING btree ("_path");
  CREATE INDEX "quizzes_blocks_multiple_options_order_idx" ON "quizzes_blocks_multiple_options" USING btree ("_order");
  CREATE INDEX "quizzes_blocks_multiple_options_parent_id_idx" ON "quizzes_blocks_multiple_options" USING btree ("_parent_id");
  CREATE INDEX "quizzes_blocks_multiple_order_idx" ON "quizzes_blocks_multiple" USING btree ("_order");
  CREATE INDEX "quizzes_blocks_multiple_parent_id_idx" ON "quizzes_blocks_multiple" USING btree ("_parent_id");
  CREATE INDEX "quizzes_blocks_multiple_path_idx" ON "quizzes_blocks_multiple" USING btree ("_path");
  CREATE INDEX "quizzes_blocks_scale_order_idx" ON "quizzes_blocks_scale" USING btree ("_order");
  CREATE INDEX "quizzes_blocks_scale_parent_id_idx" ON "quizzes_blocks_scale" USING btree ("_parent_id");
  CREATE INDEX "quizzes_blocks_scale_path_idx" ON "quizzes_blocks_scale" USING btree ("_path");
  CREATE INDEX "quizzes_blocks_number_ranges_order_idx" ON "quizzes_blocks_number_ranges" USING btree ("_order");
  CREATE INDEX "quizzes_blocks_number_ranges_parent_id_idx" ON "quizzes_blocks_number_ranges" USING btree ("_parent_id");
  CREATE INDEX "quizzes_blocks_number_order_idx" ON "quizzes_blocks_number" USING btree ("_order");
  CREATE INDEX "quizzes_blocks_number_parent_id_idx" ON "quizzes_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "quizzes_blocks_number_path_idx" ON "quizzes_blocks_number" USING btree ("_path");
  CREATE INDEX "quizzes_blocks_text_order_idx" ON "quizzes_blocks_text" USING btree ("_order");
  CREATE INDEX "quizzes_blocks_text_parent_id_idx" ON "quizzes_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "quizzes_blocks_text_path_idx" ON "quizzes_blocks_text" USING btree ("_path");
  CREATE INDEX "quizzes_solutions_order_idx" ON "quizzes_solutions" USING btree ("_order");
  CREATE INDEX "quizzes_solutions_parent_id_idx" ON "quizzes_solutions" USING btree ("_parent_id");
  CREATE INDEX "quizzes_results_order_idx" ON "quizzes_results" USING btree ("_order");
  CREATE INDEX "quizzes_results_parent_id_idx" ON "quizzes_results" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "quizzes_slug_idx" ON "quizzes" USING btree ("slug");
  CREATE INDEX "quizzes_updated_at_idx" ON "quizzes" USING btree ("updated_at");
  CREATE INDEX "quizzes_created_at_idx" ON "quizzes" USING btree ("created_at");
  CREATE INDEX "quizzes__status_idx" ON "quizzes" USING btree ("_status");
  CREATE INDEX "_quizzes_v_blocks_single_options_order_idx" ON "_quizzes_v_blocks_single_options" USING btree ("_order");
  CREATE INDEX "_quizzes_v_blocks_single_options_parent_id_idx" ON "_quizzes_v_blocks_single_options" USING btree ("_parent_id");
  CREATE INDEX "_quizzes_v_blocks_single_order_idx" ON "_quizzes_v_blocks_single" USING btree ("_order");
  CREATE INDEX "_quizzes_v_blocks_single_parent_id_idx" ON "_quizzes_v_blocks_single" USING btree ("_parent_id");
  CREATE INDEX "_quizzes_v_blocks_single_path_idx" ON "_quizzes_v_blocks_single" USING btree ("_path");
  CREATE INDEX "_quizzes_v_blocks_multiple_options_order_idx" ON "_quizzes_v_blocks_multiple_options" USING btree ("_order");
  CREATE INDEX "_quizzes_v_blocks_multiple_options_parent_id_idx" ON "_quizzes_v_blocks_multiple_options" USING btree ("_parent_id");
  CREATE INDEX "_quizzes_v_blocks_multiple_order_idx" ON "_quizzes_v_blocks_multiple" USING btree ("_order");
  CREATE INDEX "_quizzes_v_blocks_multiple_parent_id_idx" ON "_quizzes_v_blocks_multiple" USING btree ("_parent_id");
  CREATE INDEX "_quizzes_v_blocks_multiple_path_idx" ON "_quizzes_v_blocks_multiple" USING btree ("_path");
  CREATE INDEX "_quizzes_v_blocks_scale_order_idx" ON "_quizzes_v_blocks_scale" USING btree ("_order");
  CREATE INDEX "_quizzes_v_blocks_scale_parent_id_idx" ON "_quizzes_v_blocks_scale" USING btree ("_parent_id");
  CREATE INDEX "_quizzes_v_blocks_scale_path_idx" ON "_quizzes_v_blocks_scale" USING btree ("_path");
  CREATE INDEX "_quizzes_v_blocks_number_ranges_order_idx" ON "_quizzes_v_blocks_number_ranges" USING btree ("_order");
  CREATE INDEX "_quizzes_v_blocks_number_ranges_parent_id_idx" ON "_quizzes_v_blocks_number_ranges" USING btree ("_parent_id");
  CREATE INDEX "_quizzes_v_blocks_number_order_idx" ON "_quizzes_v_blocks_number" USING btree ("_order");
  CREATE INDEX "_quizzes_v_blocks_number_parent_id_idx" ON "_quizzes_v_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "_quizzes_v_blocks_number_path_idx" ON "_quizzes_v_blocks_number" USING btree ("_path");
  CREATE INDEX "_quizzes_v_blocks_text_order_idx" ON "_quizzes_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_quizzes_v_blocks_text_parent_id_idx" ON "_quizzes_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_quizzes_v_blocks_text_path_idx" ON "_quizzes_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_quizzes_v_version_solutions_order_idx" ON "_quizzes_v_version_solutions" USING btree ("_order");
  CREATE INDEX "_quizzes_v_version_solutions_parent_id_idx" ON "_quizzes_v_version_solutions" USING btree ("_parent_id");
  CREATE INDEX "_quizzes_v_version_results_order_idx" ON "_quizzes_v_version_results" USING btree ("_order");
  CREATE INDEX "_quizzes_v_version_results_parent_id_idx" ON "_quizzes_v_version_results" USING btree ("_parent_id");
  CREATE INDEX "_quizzes_v_parent_idx" ON "_quizzes_v" USING btree ("parent_id");
  CREATE INDEX "_quizzes_v_version_version_slug_idx" ON "_quizzes_v" USING btree ("version_slug");
  CREATE INDEX "_quizzes_v_version_version_updated_at_idx" ON "_quizzes_v" USING btree ("version_updated_at");
  CREATE INDEX "_quizzes_v_version_version_created_at_idx" ON "_quizzes_v" USING btree ("version_created_at");
  CREATE INDEX "_quizzes_v_version_version__status_idx" ON "_quizzes_v" USING btree ("version__status");
  CREATE INDEX "_quizzes_v_created_at_idx" ON "_quizzes_v" USING btree ("created_at");
  CREATE INDEX "_quizzes_v_updated_at_idx" ON "_quizzes_v" USING btree ("updated_at");
  CREATE INDEX "_quizzes_v_latest_idx" ON "_quizzes_v" USING btree ("latest");
  CREATE INDEX "quiz_responses_answers_order_idx" ON "quiz_responses_answers" USING btree ("_order");
  CREATE INDEX "quiz_responses_answers_parent_id_idx" ON "quiz_responses_answers" USING btree ("_parent_id");
  CREATE INDEX "quiz_responses_quiz_idx" ON "quiz_responses" USING btree ("quiz_id");
  CREATE INDEX "quiz_responses_updated_at_idx" ON "quiz_responses" USING btree ("updated_at");
  CREATE INDEX "quiz_responses_created_at_idx" ON "quiz_responses" USING btree ("created_at");
  CREATE INDEX "exports_updated_at_idx" ON "exports" USING btree ("updated_at");
  CREATE INDEX "exports_created_at_idx" ON "exports" USING btree ("created_at");
  CREATE UNIQUE INDEX "exports_filename_idx" ON "exports" USING btree ("filename");
  CREATE INDEX "exports_texts_order_parent" ON "exports_texts" USING btree ("order","parent_id");
  CREATE INDEX "imports_updated_at_idx" ON "imports" USING btree ("updated_at");
  CREATE INDEX "imports_created_at_idx" ON "imports" USING btree ("created_at");
  CREATE UNIQUE INDEX "imports_filename_idx" ON "imports" USING btree ("filename");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  ALTER TABLE "landing_pages" ADD CONSTRAINT "landing_pages_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_landing_pages_v" ADD CONSTRAINT "_landing_pages_v_version_quiz_id_quizzes_id_fk" FOREIGN KEY ("version_quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quizzes_fk" FOREIGN KEY ("quizzes_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quiz_responses_fk" FOREIGN KEY ("quiz_responses_id") REFERENCES "public"."quiz_responses"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "landing_pages_quiz_idx" ON "landing_pages" USING btree ("quiz_id");
  CREATE INDEX "_landing_pages_v_version_version_quiz_idx" ON "_landing_pages_v" USING btree ("version_quiz_id");
  CREATE INDEX "payload_locked_documents_rels_quizzes_id_idx" ON "payload_locked_documents_rels" USING btree ("quizzes_id");
  CREATE INDEX "payload_locked_documents_rels_quiz_responses_id_idx" ON "payload_locked_documents_rels" USING btree ("quiz_responses_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "quizzes_blocks_single_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quizzes_blocks_single" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quizzes_blocks_multiple_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quizzes_blocks_multiple" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quizzes_blocks_scale" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quizzes_blocks_number_ranges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quizzes_blocks_number" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quizzes_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quizzes_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quizzes_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quizzes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_quizzes_v_blocks_single_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_quizzes_v_blocks_single" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_quizzes_v_blocks_multiple_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_quizzes_v_blocks_multiple" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_quizzes_v_blocks_scale" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_quizzes_v_blocks_number_ranges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_quizzes_v_blocks_number" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_quizzes_v_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_quizzes_v_version_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_quizzes_v_version_results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_quizzes_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quiz_responses_answers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "quiz_responses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "exports" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "exports_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "imports" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs_log" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "quizzes_blocks_single_options" CASCADE;
  DROP TABLE "quizzes_blocks_single" CASCADE;
  DROP TABLE "quizzes_blocks_multiple_options" CASCADE;
  DROP TABLE "quizzes_blocks_multiple" CASCADE;
  DROP TABLE "quizzes_blocks_scale" CASCADE;
  DROP TABLE "quizzes_blocks_number_ranges" CASCADE;
  DROP TABLE "quizzes_blocks_number" CASCADE;
  DROP TABLE "quizzes_blocks_text" CASCADE;
  DROP TABLE "quizzes_solutions" CASCADE;
  DROP TABLE "quizzes_results" CASCADE;
  DROP TABLE "quizzes" CASCADE;
  DROP TABLE "_quizzes_v_blocks_single_options" CASCADE;
  DROP TABLE "_quizzes_v_blocks_single" CASCADE;
  DROP TABLE "_quizzes_v_blocks_multiple_options" CASCADE;
  DROP TABLE "_quizzes_v_blocks_multiple" CASCADE;
  DROP TABLE "_quizzes_v_blocks_scale" CASCADE;
  DROP TABLE "_quizzes_v_blocks_number_ranges" CASCADE;
  DROP TABLE "_quizzes_v_blocks_number" CASCADE;
  DROP TABLE "_quizzes_v_blocks_text" CASCADE;
  DROP TABLE "_quizzes_v_version_solutions" CASCADE;
  DROP TABLE "_quizzes_v_version_results" CASCADE;
  DROP TABLE "_quizzes_v" CASCADE;
  DROP TABLE "quiz_responses_answers" CASCADE;
  DROP TABLE "quiz_responses" CASCADE;
  DROP TABLE "exports" CASCADE;
  DROP TABLE "exports_texts" CASCADE;
  DROP TABLE "imports" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  ALTER TABLE "landing_pages" DROP CONSTRAINT "landing_pages_quiz_id_quizzes_id_fk";
  
  ALTER TABLE "_landing_pages_v" DROP CONSTRAINT "_landing_pages_v_version_quiz_id_quizzes_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_quizzes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_quiz_responses_fk";
  
  DROP INDEX "landing_pages_quiz_idx";
  DROP INDEX "_landing_pages_v_version_version_quiz_idx";
  DROP INDEX "payload_locked_documents_rels_quizzes_id_idx";
  DROP INDEX "payload_locked_documents_rels_quiz_responses_id_idx";
  ALTER TABLE "landing_pages" DROP COLUMN "quiz_id";
  ALTER TABLE "_landing_pages_v" DROP COLUMN "version_quiz_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "quizzes_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "quiz_responses_id";
  DROP TYPE "public"."enum_quizzes_project_type";
  DROP TYPE "public"."enum_quizzes_status";
  DROP TYPE "public"."enum__quizzes_v_version_project_type";
  DROP TYPE "public"."enum__quizzes_v_version_status";
  DROP TYPE "public"."enum_quiz_responses_status";
  DROP TYPE "public"."enum_exports_format";
  DROP TYPE "public"."enum_exports_sort_order";
  DROP TYPE "public"."enum_exports_drafts";
  DROP TYPE "public"."enum_imports_import_mode";
  DROP TYPE "public"."enum_imports_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`)
}
