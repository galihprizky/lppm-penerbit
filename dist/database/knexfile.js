"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'DB_LPPM_PRESS',
    },
};
exports.default = config;
//# sourceMappingURL=knexfile.js.map