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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private replaceNulls<T>(payload: T): T {
    if (payload === null) {
      return 'Belum diisi' as T;
    }

    if (Array.isArray(payload)) {
      return payload.map((item) => this.replaceNulls(item)) as T;
    }

    if (typeof payload === 'object' && payload !== null) {
      const entries = Object.entries(payload as Record<string, unknown>).map(([key, value]) => [
        key,
        this.replaceNulls(value),
      ]);
      return Object.fromEntries(entries) as T;
    }

    return payload;
  }

  private formatResponse<T>(statusCode: number, message: string, data: T): ApiResponse<T> {
    return {
      statusCode,
      message,
      data: this.replaceNulls(data),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<UserResponseDto>> {
    const user = await this.usersService.create(createUserDto);
    return this.formatResponse(HttpStatus.CREATED, 'User berhasil dibuat', user);
  }

  @Get()
  async findAll(): Promise<ApiResponse<UserResponseDto[]>> {
    const users = await this.usersService.findAll();
    const message = users.length > 0 ? 'Data user berhasil diambil' : 'Data user masih kosong';
    return this.formatResponse(HttpStatus.OK, message, users);
  }

  @Get('search')
  async findByEmail(@Query('email') email: string): Promise<ApiResponse<UserResponseDto>> {
    const user = await this.usersService.findByEmail(email);
    return this.formatResponse(HttpStatus.OK, 'User berhasil ditemukan', user);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<UserResponseDto>> {
    const user = await this.usersService.findById(id);
    return this.formatResponse(HttpStatus.OK, 'Detail user berhasil diambil', user);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<UserResponseDto>> {
    const user = await this.usersService.update(id, updateUserDto);
    return this.formatResponse(HttpStatus.OK, 'User berhasil diperbarui', user);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<{ message: string }>> {
    const result = await this.usersService.remove(id);
    return this.formatResponse(HttpStatus.OK, 'User berhasil dihapus', result);
  }
}