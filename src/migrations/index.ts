import * as migration_20261001_171814_initial from './20261001_171814_initial';
import * as migration_20261001_174316_blob_storage_fields from './20261001_174316_blob_storage_fields';
import * as migration_20261005_174954_quizzes from './20261005_174954_quizzes';

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
    name: '20261005_174954_quizzes'
  },
];
