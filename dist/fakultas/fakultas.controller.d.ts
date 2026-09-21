import { FakultasService } from './fakultas.service';
import { CreateFakultasDto } from './dto/create-fakultas.dto';
import { UpdateFakultasDto } from './dto/update-fakultas.dto';
type ApiResponse<T> = {
    statusCode: number;
    message: string;
    data: T;
};
export declare class FakultasController {
    private readonly fakultasService;
    constructor(fakultasService: FakultasService);
    private normalizeValue;
    private buildResponse;
    create(createFakultasDto: CreateFakultasDto): Promise<ApiResponse<any>>;
    findAll(): Promise<ApiResponse<any[]>>;
    findOne(id: number): Promise<ApiResponse<any>>;
    update(id: number, updateFakultasDto: UpdateFakultasDto): Promise<ApiResponse<any>>;
    remove(id: number): Promise<ApiResponse<{
        message: string;
    }>>;
}
export {};
