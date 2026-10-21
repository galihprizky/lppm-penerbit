import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRevisiNaskahDto {
  @Type(() => Number)
  @IsInt()
  uploaded_by!: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  catatan_perubahan?: string;
}
