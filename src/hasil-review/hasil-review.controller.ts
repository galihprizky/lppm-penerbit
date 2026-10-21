import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HasilReviewService } from './hasil-review.service';
import { CreateHasilReviewDto } from './dto/create-hasil-review.dto';
import { hasilReviewMulterOptions } from './multer-hasil-review.config';

type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

@Controller('hasil-review')
export class HasilReviewController {
  constructor(private readonly hasilReviewService: HasilReviewService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file_catatan_review', hasilReviewMulterOptions))
  async create(
    @Body() dto: CreateHasilReviewDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<ApiResponse<any>> {
    const data = await this.hasilReviewService.create(dto, file);
    return { statusCode: HttpStatus.CREATED, message: 'Hasil review berhasil disimpan', data };
  }

  @Get('penugasan/:penugasanId')
  async findByPenugasanId(
    @Param('penugasanId', ParseIntPipe) penugasanId: number,
  ): Promise<ApiResponse<any>> {
    const data = await this.hasilReviewService.findByPenugasanId(penugasanId);
    return { statusCode: HttpStatus.OK, message: 'Hasil review berhasil diambil', data };
  }

  @Get('naskah/:naskahId')
  async findByNaskahId(
    @Param('naskahId', ParseIntPipe) naskahId: number,
  ): Promise<ApiResponse<any[]>> {
    const data = await this.hasilReviewService.findByNaskahId(naskahId);
    const message = data.length > 0 ? 'Hasil review berhasil diambil' : 'Belum ada hasil review untuk naskah ini';
    return { statusCode: HttpStatus.OK, message, data };
  }
}
