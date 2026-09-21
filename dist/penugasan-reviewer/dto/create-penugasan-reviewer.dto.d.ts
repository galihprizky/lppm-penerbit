export declare enum StatusPenugasanEnum {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    COMPLETED = "COMPLETED",
    DECLINED = "DECLINED"
}
export declare class CreatePenugasanReviewerDto {
    naskah_id: number;
    reviewer_id: number;
    ditunjuk_oleh: number;
    deadline_review: string;
    status_penugasan?: StatusPenugasanEnum;
}
