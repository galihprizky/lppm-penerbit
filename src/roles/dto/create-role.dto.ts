import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nama_role!: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  deskripsi?: string;
}
