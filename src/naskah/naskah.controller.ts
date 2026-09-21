import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { NaskahService } from './naskah.service';
import { CreateNaskahDto } from './dto/create-naskah.dto';
import { UpdateNaskahDto } from './dto/update-naskah.dto';
import {
  naskahFileFields,
  naskahMulterOptions,
} from './multer-naskah.config';
import type { NaskahUploadedFiles } from './multer-naskah.config';

type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

@Controller('naskah')
export class NaskahController {
  constructor(private readonly naskahService: NaskahService) {}

  private normalizeValue<T>(value: T): T {
    if (value === null) {
      return 'Belum diisi' as T;
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.normalizeValue(item)) as T;
    }

    if (typeof value === 'object' && value !== null) {
      const entries = Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        this.normalizeValue(item),
      ]);
      return Object.fromEntries(entries) as T;
    }

    return value;
  }

  private buildResponse<T>(statusCode: number, message: string, data: T): ApiResponse<T> {
    return {
      statusCode,
      message,
      data: this.normalizeValue(data),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileFieldsInterceptor(naskahFileFields, naskahMulterOptions))
  async create(
    @Body() createNaskahDto: CreateNaskahDto,
    @UploadedFiles() files: NaskahUploadedFiles,
  ): Promise<ApiResponse<any>> {
    const data = await this.naskahService.create(createNaskahDto, files);
    return this.buildResponse(HttpStatus.CREATED, 'Naskah berhasil dibuat', data);
  }

  @Get()
  async findAll(): Promise<ApiResponse<any[]>> {
    const data = await this.naskahService.findAll();
    const message = data.length > 0 ? 'Data naskah berhasil diambil' : 'Data naskah masih kosong';
    return this.buildResponse(HttpStatus.OK, message, data);
  }

  @Get('pengusul/:pengusulId')
  async findByPengusulId(
    @Param('pengusulId', ParseIntPipe) pengusulId: number,
  ): Promise<ApiResponse<any[]>> {
    const data = await this.naskahService.findByPengusulId(pengusulId);
    const message = data.length > 0 ? 'Data naskah berdasarkan pengusul berhasil diambil' : 'Tidak ada naskah untuk pengusul ini';
    return this.buildResponse(HttpStatus.OK, message, data);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<any>> {
    const data = await this.naskahService.findOne(id);
    return this.buildResponse(HttpStatus.OK, 'Detail naskah berhasil diambil', data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNaskahDto: UpdateNaskahDto,
  ): Promise<ApiResponse<any>> {
    const data = await this.naskahService.update(id, updateNaskahDto);
    return this.buildResponse(HttpStatus.OK, 'Naskah berhasil diperbarui', data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<{ message: string }>> {
    const data = await this.naskahService.remove(id);
    return this.buildResponse(HttpStatus.OK, 'Naskah berhasil dihapus', data);
  }
}
