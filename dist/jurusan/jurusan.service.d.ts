import { KnexService } from '../database/knex.service';
import { CreateJurusanDto } from './dto/create-jurusan.dto';
import { UpdateJurusanDto } from './dto/update-jurusan.dto';
export declare class JurusanService {
    private readonly knexService;
    constructor(knexService: KnexService);
    private ensureFakultasExists;
    create(createJurusanDto: CreateJurusanDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    findByFakultasId(fakultasId: number): Promise<any[]>;
    update(id: number, updateJurusanDto: UpdateJurusanDto): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
