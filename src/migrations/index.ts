import * as migration_20261001_171814_initial from './20261001_171814_initial';

export const migrations = [
  {
    up: migration_20261001_171814_initial.up,
    down: migration_20261001_171814_initial.down,
    name: '20261001_171814_initial'
  },
];
