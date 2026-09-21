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
} from '@nestjs/common';
import { JurusanService } from './jurusan.service';
import { CreateJurusanDto } from './dto/create-jurusan.dto';
import { UpdateJurusanDto } from './dto/update-jurusan.dto';

type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

@Controller('jurusan')
export class JurusanController {
  constructor(private readonly jurusanService: JurusanService) {}

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
  async create(@Body() createJurusanDto: CreateJurusanDto): Promise<ApiResponse<any>> {
    const data = await this.jurusanService.create(createJurusanDto);
    return this.buildResponse(HttpStatus.CREATED, 'Jurusan berhasil dibuat', data);
  }

  @Get()
  async findAll(): Promise<ApiResponse<any[]>> {
    const data = await this.jurusanService.findAll();
    const message = data.length > 0 ? 'Data jurusan berhasil diambil' : 'Data jurusan masih kosong';
    return this.buildResponse(HttpStatus.OK, message, data);
  }

  @Get('fakultas/:fakultasId')
  async findByFakultasId(
    @Param('fakultasId', ParseIntPipe) fakultasId: number,
  ): Promise<ApiResponse<any[]>> {
    const data = await this.jurusanService.findByFakultasId(fakultasId);
    const message = data.length > 0 ? 'Data jurusan berdasarkan fakultas berhasil diambil' : 'Tidak ada jurusan untuk fakultas ini';
    return this.buildResponse(HttpStatus.OK, message, data);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<any>> {
    const data = await this.jurusanService.findOne(id);
    return this.buildResponse(HttpStatus.OK, 'Detail jurusan berhasil diambil', data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJurusanDto: UpdateJurusanDto,
  ): Promise<ApiResponse<any>> {
    const data = await this.jurusanService.update(id, updateJurusanDto);
    return this.buildResponse(HttpStatus.OK, 'Jurusan berhasil diperbarui', data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<{ message: string }>> {
    const data = await this.jurusanService.remove(id);
    return this.buildResponse(HttpStatus.OK, 'Jurusan berhasil dihapus', data);
  }
}
