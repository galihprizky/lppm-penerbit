import { Transform, Type } from 'class-transformer';
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

  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map((item) => String(item).trim());
    if (typeof value !== 'string' || value.trim() === '') return undefined;
    const trimmed = value.trim();
    if (trimmed.startsWith('[')) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return value;
      }
    }
    return trimmed.split(',').map((item) => item.trim()).filter(Boolean);
  })
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

  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
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
