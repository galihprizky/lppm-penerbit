import { MahasiswaService } from './mahasiswa.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
export declare class MahasiswaController {
    private readonly mahasiswaService;
    constructor(mahasiswaService: MahasiswaService);
    create(createMahasiswaDto: CreateMahasiswaDto): Promise<any>;
    findAll(page?: string, limit?: string, column?: string, search?: string): Promise<{
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
