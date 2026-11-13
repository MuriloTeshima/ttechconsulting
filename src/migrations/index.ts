import * as migration_20261001_171814_initial from './20261001_171814_initial';
import * as migration_20261001_174316_blob_storage_fields from './20261001_174316_blob_storage_fields';
import * as migration_20261005_174954_quizzes from './20261005_174954_quizzes';
import * as migration_20261009_173837_protecao_e_leads from './20261009_173837_protecao_e_leads';
import * as migration_20261112_235120_confianca_e_provas from './20261112_235120_confianca_e_provas';
import * as migration_20261113_000504_quiz_na_home from './20261113_000504_quiz_na_home';

export const migrations = [
  {
    up: migration_20261001_171814_initial.up,
    down: migration_20261001_171814_initial.down,
    name: '20261001_171814_initial',
  },
  {
    up: migration_20261001_174316_blob_storage_fields.up,
    down: migration_20261001_174316_blob_storage_fields.down,
    name: '20261001_174316_blob_storage_fields',
  },
  {
    up: migration_20261005_174954_quizzes.up,
    down: migration_20261005_174954_quizzes.down,
    name: '20261005_174954_quizzes',
  },
  {
    up: migration_20261009_173837_protecao_e_leads.up,
    down: migration_20261009_173837_protecao_e_leads.down,
    name: '20261009_173837_protecao_e_leads',
  },
  {
    up: migration_20261112_235120_confianca_e_provas.up,
    down: migration_20261112_235120_confianca_e_provas.down,
    name: '20261112_235120_confianca_e_provas',
  },
  {
    up: migration_20261113_000504_quiz_na_home.up,
    down: migration_20261113_000504_quiz_na_home.down,
    name: '20261113_000504_quiz_na_home'
  },
];
