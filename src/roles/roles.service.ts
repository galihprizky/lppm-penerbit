import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { KnexService } from '../database/knex.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly knexService: KnexService) {}

  async create(createRoleDto: CreateRoleDto) {
    const existingRole = await this.knexService.connection('roles')
      .where({ nama_role: createRoleDto.nama_role })
      .first();

    if (existingRole) {
      throw new ConflictException('nama role sudah terdaftar');
    }

    const [role] = await this.knexService.connection('roles')
      .insert({
        nama_role: createRoleDto.nama_role,
        deskripsi: createRoleDto.deskripsi ?? null,
      })
      .returning('*');

    return role;
  }

  async findAll() {
    return this.knexService.connection('roles').select('*').orderBy('id');
  }

  async findOne(id: number) {
    const role = await this.knexService.connection('roles').where({ id }).first();
    if (!role) {
      throw new NotFoundException('role tidak ditemukan');
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.findOne(id);

    if (updateRoleDto.nama_role) {
      const existingRole = await this.knexService.connection('roles')
        .where({ nama_role: updateRoleDto.nama_role })
        .whereNot({ id })
        .first();

      if (existingRole) {
        throw new ConflictException('nama role sudah terdaftar');
      }
    }

    const [role] = await this.knexService.connection('roles')
      .where({ id })
      .update(updateRoleDto)
      .returning('*');

    return role;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.knexService.connection('roles').where({ id }).del();
    return { message: 'role berhasil dihapus' };
  }
}
