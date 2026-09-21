import { OnModuleDestroy } from '@nestjs/common';
import { Knex } from 'knex';
export declare class KnexService implements OnModuleDestroy {
    private readonly knex;
    constructor();
    get connection(): Knex;
    onModuleDestroy(): Promise<void>;
}
