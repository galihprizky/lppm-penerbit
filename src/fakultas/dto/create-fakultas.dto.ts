import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFakultasDto {
  @IsString()
  @IsNotEmpty()
  kode_fakultas!: string;

  @IsString()
  @IsNotEmpty()
  nama_fakultas!: string;
}
