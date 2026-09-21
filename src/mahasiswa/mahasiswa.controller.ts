import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';

@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMahasiswaDto: CreateMahasiswaDto) {
    return this.mahasiswaService.create(createMahasiswaDto);
  }

  // GET /mahasiswa?page=1&limit=10&column=email&search=budi@gmail.com
  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('column') column?: string,
    @Query('search') search?: string,
  ) {
    return this.mahasiswaService.findAll({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
      column,
      search,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mahasiswaService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMahasiswaDto: UpdateMahasiswaDto,
  ) {
    return this.mahasiswaService.update(id, updateMahasiswaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.mahasiswaService.remove(id);
  }
}