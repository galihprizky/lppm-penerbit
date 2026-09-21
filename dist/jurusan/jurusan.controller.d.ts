import { JurusanService } from './jurusan.service';
import { CreateJurusanDto } from './dto/create-jurusan.dto';
import { UpdateJurusanDto } from './dto/update-jurusan.dto';
type ApiResponse<T> = {
    statusCode: number;
    message: string;
    data: T;
};
export declare class JurusanController {
    private readonly jurusanService;
    constructor(jurusanService: JurusanService);
    private normalizeValue;
    private buildResponse;
    create(createJurusanDto: CreateJurusanDto): Promise<ApiResponse<any>>;
    findAll(): Promise<ApiResponse<any[]>>;
    findByFakultasId(fakultasId: number): Promise<ApiResponse<any[]>>;
    findOne(id: number): Promise<ApiResponse<any>>;
    update(id: number, updateJurusanDto: UpdateJurusanDto): Promise<ApiResponse<any>>;
    remove(id: number): Promise<ApiResponse<{
        message: string;
    }>>;
}
export {};
