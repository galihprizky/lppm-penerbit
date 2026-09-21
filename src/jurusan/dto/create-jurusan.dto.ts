import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateJurusanDto {
  @Type(() => Number)
  @IsInt()
  fakultas_id!: number;

  @IsString()
  @IsNotEmpty()
  kode_jurusan!: string;

  @IsString()
  @IsNotEmpty()
  nama_jurusan!: string;
}
