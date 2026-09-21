import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  nama_role?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  deskripsi?: string;
}
