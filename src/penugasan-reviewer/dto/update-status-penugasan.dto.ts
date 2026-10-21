import { Type } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';
import { StatusPenugasanEnum } from './create-penugasan-reviewer.dto';

export class UpdateStatusPenugasanDto {
  @Type(() => Number)
  @IsInt()
  reviewer_id!: number;

  @IsEnum(StatusPenugasanEnum)
  status_penugasan!: StatusPenugasanEnum;
}
