import { KnexService } from '../database/knex.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
export declare class MahasiswaService {
    private readonly knexService;
    constructor(knexService: KnexService);
    create(createMahasiswaDto: CreateMahasiswaDto): Promise<any>;
    findAll(query: {
        page?: number;
        limit?: number;
        column?: string;
        search?: string;
    }): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            total_pages: number;
        };
    }>;
    findOne(id: number): Promise<any>;
    update(id: number, updateMahasiswaDto: UpdateMahasiswaDto): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
