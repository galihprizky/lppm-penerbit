import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { StatusPenugasanEnum } from './create-penugasan-reviewer.dto';

export class UpdatePenugasanReviewerDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  naskah_id?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  reviewer_id?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  ditunjuk_oleh?: number;

  @IsDateString()
  @IsOptional()
  deadline_review?: string;

  @IsEnum(StatusPenugasanEnum)
  @IsOptional()
  status_penugasan?: StatusPenugasanEnum;
}
