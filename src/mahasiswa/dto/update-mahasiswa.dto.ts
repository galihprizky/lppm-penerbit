import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { Jurusan } from './create-mahasiswa.dto';

export class UpdateMahasiswaDto {
  @IsString()
  @IsOptional()
  nim?: string;

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