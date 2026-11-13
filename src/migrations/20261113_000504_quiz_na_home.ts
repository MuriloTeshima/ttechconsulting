import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "quizzes" ADD COLUMN "_order" varchar;
  ALTER TABLE "quizzes" ADD COLUMN "show_on_home" boolean DEFAULT false;
  ALTER TABLE "_quizzes_v" ADD COLUMN "version__order" varchar;
  ALTER TABLE "_quizzes_v" ADD COLUMN "version_show_on_home" boolean DEFAULT false;
  CREATE INDEX "quizzes__order_idx" ON "quizzes" USING btree ("_order");
  CREATE INDEX "_quizzes_v_version_version__order_idx" ON "_quizzes_v" USING btree ("version__order");`)

  // Quizzes that already exist keep appearing on the home page, in creation order
  // (fractional-indexing keys a0, a1, ... as Payload's orderable uses).
  await db.execute(sql`
  UPDATE "quizzes" q SET "show_on_home" = true, "_order" = 'a' || o.pos
    FROM (SELECT "id", (row_number() OVER (ORDER BY "created_at") - 1)::text AS pos FROM "quizzes") o
    WHERE q."id" = o."id";
  UPDATE "_quizzes_v" v SET "version_show_on_home" = true, "version__order" = q."_order"
    FROM "quizzes" q
    WHERE v."parent_id" = q."id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "quizzes__order_idx";
  DROP INDEX "_quizzes_v_version_version__order_idx";
  ALTER TABLE "quizzes" DROP COLUMN "_order";
  ALTER TABLE "quizzes" DROP COLUMN "show_on_home";
  ALTER TABLE "_quizzes_v" DROP COLUMN "version__order";
  ALTER TABLE "_quizzes_v" DROP COLUMN "version_show_on_home";`)
}
