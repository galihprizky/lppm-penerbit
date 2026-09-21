import { NaskahService } from './naskah.service';
import { CreateNaskahDto } from './dto/create-naskah.dto';
import { UpdateNaskahDto } from './dto/update-naskah.dto';
import type { NaskahUploadedFiles } from './multer-naskah.config';
type ApiResponse<T> = {
    statusCode: number;
    message: string;
    data: T;
};
export declare class NaskahController {
    private readonly naskahService;
    constructor(naskahService: NaskahService);
    private normalizeValue;
    private buildResponse;
    create(createNaskahDto: CreateNaskahDto, files: NaskahUploadedFiles): Promise<ApiResponse<any>>;
    findAll(): Promise<ApiResponse<any[]>>;
    findByPengusulId(pengusulId: number): Promise<ApiResponse<any[]>>;
    findOne(id: number): Promise<ApiResponse<any>>;
    update(id: number, updateNaskahDto: UpdateNaskahDto): Promise<ApiResponse<any>>;
    remove(id: number): Promise<ApiResponse<{
        message: string;
    }>>;
}
export {};
