import { KnexService } from '../database/knex.service';
import { CreateFakultasDto } from './dto/create-fakultas.dto';
import { UpdateFakultasDto } from './dto/update-fakultas.dto';
export declare class FakultasService {
    private readonly knexService;
    constructor(knexService: KnexService);
    create(createFakultasDto: CreateFakultasDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateFakultasDto: UpdateFakultasDto): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
