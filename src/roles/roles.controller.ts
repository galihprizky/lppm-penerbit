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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  private buildResponse<T>(statusCode: number, message: string, data: T): ApiResponse<T> {
    return { statusCode, message, data };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRoleDto: CreateRoleDto): Promise<ApiResponse<any>> {
    const data = await this.rolesService.create(createRoleDto);
    return this.buildResponse(HttpStatus.CREATED, 'Role berhasil dibuat', data);
  }

  @Get()
  async findAll(): Promise<ApiResponse<any[]>> {
    const data = await this.rolesService.findAll();
    const message = data.length > 0 ? 'Data role berhasil diambil' : 'Data role masih kosong';
    return this.buildResponse(HttpStatus.OK, message, data);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<any>> {
    const data = await this.rolesService.findOne(id);
    return this.buildResponse(HttpStatus.OK, 'Detail role berhasil diambil', data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<ApiResponse<any>> {
    const data = await this.rolesService.update(id, updateRoleDto);
    return this.buildResponse(HttpStatus.OK, 'Role berhasil diperbarui', data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<{ message: string }>> {
    const data = await this.rolesService.remove(id);
    return this.buildResponse(HttpStatus.OK, 'Role berhasil dihapus', data);
  }
}
