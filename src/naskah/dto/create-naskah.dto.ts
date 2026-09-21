import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum JenisBukuEnum {
  BUKU_REFERENSI = 'Buku Referensi',
  BUKU_AJAR = 'Buku Ajar',
}

export enum TargetPembacaEnum {
  MAHASISWA = 'Mahasiswa',
  AKADEMISI = 'Akademisi',
  UMUM = 'Umum',
}

export enum WarnaIsiEnum {
  HITAM_PUTIH = 'Hitam Putih',
  HITAM_PUTIH_DAN_BERWARNA = 'Hitam Putih dan Berwarna',
  FULL_COLOR = 'Full Color',
}

export enum StatusCoverEnum {
  SUDAH = 'Sudah',
  BELUM = 'Belum',
}

export enum StatusNaskahEnum {
  SUBMITTED = 'SUBMITTED',
  PENDING_LPPM = 'PENDING_LPPM',
  UNDER_REVIEW = 'UNDER_REVIEW',
  REVISION_REQUIRED = 'REVISION_REQUIRED',
  APPROVED_FOR_EDIT = 'APPROVED_FOR_EDIT',
  IN_EDITING = 'IN_EDITING',
  READY_TO_PRINT = 'READY_TO_PRINT',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
}

export class CreateNaskahDto {
  @Type(() => Number)
  @IsInt()
  pengusul_id!: number;

  @IsString()
  @IsNotEmpty()
  judul_naskah!: string;

  @IsString()
  @IsNotEmpty()
  sinopsis!: string;

  @IsEnum(JenisBukuEnum)
  jenis_buku!: JenisBukuEnum;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(TargetPembacaEnum, { each: true })
  target_pembaca!: TargetPembacaEnum[];

  @IsString()
  @IsNotEmpty()
  nama_semua_penulis!: string;

  @IsEnum(WarnaIsiEnum)
  warna_isi_buku!: WarnaIsiEnum;

  @Type(() => Boolean)
  @IsBoolean()
  pake_editor_pribadi!: boolean;

  @IsEnum(StatusCoverEnum)
  status_cover!: StatusCoverEnum;

  @IsEnum(StatusNaskahEnum)
  @IsOptional()
  status_saat_ini?: StatusNaskahEnum;

  @IsString()
  @IsOptional()
  catatan_perubahan?: string;
}
