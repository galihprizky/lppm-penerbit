import { StatusPenugasanEnum } from './create-penugasan-reviewer.dto';
export declare class UpdatePenugasanReviewerDto {
    naskah_id?: number;
    reviewer_id?: number;
    ditunjuk_oleh?: number;
    deadline_review?: string;
    status_penugasan?: StatusPenugasanEnum;
}
