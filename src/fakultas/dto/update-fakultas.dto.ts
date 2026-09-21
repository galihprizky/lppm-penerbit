import { IsOptional, IsString } from 'class-validator';

export class UpdateFakultasDto {
  @IsString()
  @IsOptional()
  kode_fakultas?: string;

  @IsString()
  @IsOptional()
  nama_fakultas?: string;
}
