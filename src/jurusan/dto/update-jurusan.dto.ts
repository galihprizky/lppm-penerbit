import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateJurusanDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  fakultas_id?: number;

  @IsString()
  @IsOptional()
  kode_jurusan?: string;

  @IsString()
  @IsOptional()
  nama_jurusan?: string;
}
