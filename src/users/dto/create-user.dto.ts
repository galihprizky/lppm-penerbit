import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
  IsInt,
  IsArray,
  ArrayUnique,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  nip?: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  nama!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsOptional()
  no_hp?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  jurusan_id?: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @Transform(({ value }) => (Array.isArray(value) ? value.map(Number) : value))
  @IsArray()
  @IsInt({ each: true })
  @ArrayUnique()
  @IsOptional()
  role_ids?: number[];
}