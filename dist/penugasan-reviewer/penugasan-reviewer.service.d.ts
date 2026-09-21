import { KnexService } from '../database/knex.service';
import { CreatePenugasanReviewerDto } from './dto/create-penugasan-reviewer.dto';
import { UpdatePenugasanReviewerDto } from './dto/update-penugasan-reviewer.dto';
export declare class PenugasanReviewerService {
    private readonly knexService;
    constructor(knexService: KnexService);
    private ensureNaskahExists;
    private ensureUserExists;
    private selectQuery;
    create(createDto: CreatePenugasanReviewerDto): Promise<any>;
    findByNaskahId(naskahId: number): Promise<any[]>;
    update(id: number, updateDto: UpdatePenugasanReviewerDto): Promise<any>;
}
