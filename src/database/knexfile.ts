import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'q1w2e3r4t5',
    database: 'DB_LPPM_PRESS',
  },
};

export default config;