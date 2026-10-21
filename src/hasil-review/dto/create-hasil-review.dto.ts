import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export enum RekomendasiEnum {
  DITERIMA = 'DITERIMA',
  REVISI_MINOR = 'REVISI_MINOR',
  REVISI_MAYOR = 'REVISI_MAYOR',
  DITOLAK = 'DITOLAK',
}

export class CreateHasilReviewDto {
  @Type(() => Number)
  @IsInt()
  penugasan_id!: number;

  @Type(() => Number)
  @IsInt()
  reviewer_id!: number;

  @IsEnum(RekomendasiEnum)
  rekomendasi!: RekomendasiEnum;

  @IsString()
  @IsNotEmpty()
  catatan_review!: string;
}
