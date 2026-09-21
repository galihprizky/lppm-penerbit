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
import { FakultasService } from './fakultas.service';
import { CreateFakultasDto } from './dto/create-fakultas.dto';
import { UpdateFakultasDto } from './dto/update-fakultas.dto';

type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

@Controller('fakultas')
export class FakultasController {
  constructor(private readonly fakultasService: FakultasService) {}

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
  async create(@Body() createFakultasDto: CreateFakultasDto): Promise<ApiResponse<any>> {
    const data = await this.fakultasService.create(createFakultasDto);
    return this.buildResponse(HttpStatus.CREATED, 'Fakultas berhasil dibuat', data);
  }

  @Get()
  async findAll(): Promise<ApiResponse<any[]>> {
    const data = await this.fakultasService.findAll();
    const message = data.length > 0 ? 'Data fakultas berhasil diambil' : 'Data fakultas masih kosong';
    return this.buildResponse(HttpStatus.OK, message, data);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<any>> {
    const data = await this.fakultasService.findOne(id);
    return this.buildResponse(HttpStatus.OK, 'Detail fakultas berhasil diambil', data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFakultasDto: UpdateFakultasDto,
  ): Promise<ApiResponse<any>> {
    const data = await this.fakultasService.update(id, updateFakultasDto);
    return this.buildResponse(HttpStatus.OK, 'Fakultas berhasil diperbarui', data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<{ message: string }>> {
    const data = await this.fakultasService.remove(id);
    return this.buildResponse(HttpStatus.OK, 'Fakultas berhasil dihapus', data);
  }
}
