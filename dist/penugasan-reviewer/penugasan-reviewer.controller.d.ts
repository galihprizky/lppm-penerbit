import { PenugasanReviewerService } from './penugasan-reviewer.service';
import { CreatePenugasanReviewerDto } from './dto/create-penugasan-reviewer.dto';
import { UpdatePenugasanReviewerDto } from './dto/update-penugasan-reviewer.dto';
type ApiResponse<T> = {
    statusCode: number;
    message: string;
    data: T;
};
export declare class PenugasanReviewerController {
    private readonly penugasanReviewerService;
    constructor(penugasanReviewerService: PenugasanReviewerService);
    private buildResponse;
    create(createDto: CreatePenugasanReviewerDto): Promise<ApiResponse<any>>;
    findByNaskahId(naskahId: number): Promise<ApiResponse<any[]>>;
    update(id: number, updateDto: UpdatePenugasanReviewerDto): Promise<ApiResponse<any>>;
}
export {};
