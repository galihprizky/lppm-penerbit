import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
  IsDateString,
} from 'class-validator';

export enum Jurusan {
  INFORMATIKA = 'Informatika',
  SISTEM_INFORMASI = 'Sistem Informasi',
  TEKNIK_ELEKTRO = 'Teknik Elektro',
  MANAJEMEN = 'Manajemen',
}

export class CreateMahasiswaDto {
  @IsString()
  @IsNotEmpty()
  nim: string;

  @IsString()
  @IsOptional()
  nama?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(Jurusan)
  @IsOptional()
  jurusan?: Jurusan;

  @IsDateString()
  @IsOptional()
  tanggal_lahir?: string;
}