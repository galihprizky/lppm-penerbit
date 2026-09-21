import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  JenisBukuEnum,
  StatusCoverEnum,
  StatusNaskahEnum,
  TargetPembacaEnum,
  WarnaIsiEnum,
} from './create-naskah.dto';

export class UpdateNaskahDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  pengusul_id?: number;

  @IsString()
  @IsOptional()
  judul_naskah?: string;

  @IsString()
  @IsOptional()
  sinopsis?: string;

  @IsEnum(JenisBukuEnum)
  @IsOptional()
  jenis_buku?: JenisBukuEnum;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(TargetPembacaEnum, { each: true })
  @IsOptional()
  target_pembaca?: TargetPembacaEnum[];

  @IsString()
  @IsOptional()
  nama_semua_penulis?: string;

  @IsEnum(WarnaIsiEnum)
  @IsOptional()
  warna_isi_buku?: WarnaIsiEnum;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  pake_editor_pribadi?: boolean;

  @IsEnum(StatusCoverEnum)
  @IsOptional()
  status_cover?: StatusCoverEnum;

  @IsEnum(StatusNaskahEnum)
  @IsOptional()
  status_saat_ini?: StatusNaskahEnum;
}
