import { KnexService } from '../database/knex.service';
import { CreateNaskahDto } from './dto/create-naskah.dto';
import { UpdateNaskahDto } from './dto/update-naskah.dto';
import type { NaskahUploadedFiles } from './multer-naskah.config';
export declare class NaskahService {
    private readonly knexService;
    constructor(knexService: KnexService);
    private ensurePengusulExists;
    create(createNaskahDto: CreateNaskahDto, files: NaskahUploadedFiles): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    findByPengusulId(pengusulId: number): Promise<any[]>;
    update(id: number, updateNaskahDto: UpdateNaskahDto): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
