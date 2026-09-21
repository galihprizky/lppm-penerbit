import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsOptional } from 'class-validator';

export enum StatusPenugasanEnum {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  COMPLETED = 'COMPLETED',
  DECLINED = 'DECLINED',
}

export class CreatePenugasanReviewerDto {
  @Type(() => Number)
  @IsInt()
  naskah_id!: number;

  @Type(() => Number)
  @IsInt()
  reviewer_id!: number;

  @Type(() => Number)
  @IsInt()
  ditunjuk_oleh!: number;

  @IsDateString()
  deadline_review!: string;

  @IsEnum(StatusPenugasanEnum)
  @IsOptional()
  status_penugasan?: StatusPenugasanEnum;
}
