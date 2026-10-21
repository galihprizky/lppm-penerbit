import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PenugasanReviewerService } from './penugasan-reviewer.service';
import { CreatePenugasanReviewerDto } from './dto/create-penugasan-reviewer.dto';
import { UpdateStatusPenugasanDto } from './dto/update-status-penugasan.dto';
import { UpdatePenugasanReviewerDto } from './dto/update-penugasan-reviewer.dto';

type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

@Controller('penugasan-reviewer')
export class PenugasanReviewerController {
  constructor(private readonly penugasanReviewerService: PenugasanReviewerService) {}

  private buildResponse<T>(statusCode: number, message: string, data: T): ApiResponse<T> {
    return { statusCode, message, data };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreatePenugasanReviewerDto): Promise<ApiResponse<any>> {
    const data = await this.penugasanReviewerService.create(createDto);
    return this.buildResponse(HttpStatus.CREATED, 'Penugasan reviewer berhasil dibuat', data);
  }

  @Get('naskah/:naskahId')
  async findByNaskahId(
    @Param('naskahId', ParseIntPipe) naskahId: number,
  ): Promise<ApiResponse<any[]>> {
    const data = await this.penugasanReviewerService.findByNaskahId(naskahId);
    const message = data.length > 0
      ? 'Data penugasan reviewer berhasil diambil'
      : 'Belum ada penugasan reviewer untuk naskah ini';
    return this.buildResponse(HttpStatus.OK, message, data);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusPenugasanDto,
  ): Promise<ApiResponse<any>> {
    const data = await this.penugasanReviewerService.updateStatusByReviewer(id, dto);
    return this.buildResponse(HttpStatus.OK, 'Status penugasan berhasil diperbarui', data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdatePenugasanReviewerDto,
  ): Promise<ApiResponse<any>> {
    const data = await this.penugasanReviewerService.update(id, updateDto);
    return this.buildResponse(HttpStatus.OK, 'Penugasan reviewer berhasil diperbarui', data);
  }
}
