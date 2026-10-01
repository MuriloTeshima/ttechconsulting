import * as migration_20261001_171814_initial from './20261001_171814_initial';
import * as migration_20261001_174316_blob_storage_fields from './20261001_174316_blob_storage_fields';

export const migrations = [
  {
    up: migration_20261001_171814_initial.up,
    down: migration_20261001_171814_initial.down,
    name: '20261001_171814_initial',
  },
  {
    up: migration_20261001_174316_blob_storage_fields.up,
    down: migration_20261001_174316_blob_storage_fields.down,
    name: '20261001_174316_blob_storage_fields'
  },
];
