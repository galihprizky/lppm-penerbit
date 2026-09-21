import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { KnexService } from '../database/knex.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  JurusanResponseDto,
  RoleResponseDto,
  UserResponseDto,
} from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly knexService: KnexService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { nip, email, nama, password, no_hp, jurusan_id, is_active, role_ids } = createUserDto;

    const existingEmail = await this.knexService.connection('users')
      .where({ email })
      .whereNull('deleted_at')
      .first();

    if (existingEmail) {
      throw new ConflictException('email already exists');
    }

    if (nip) {
      const existingNip = await this.knexService.connection('users')
        .where({ nip })
        .whereNull('deleted_at')
        .first();

      if (existingNip) {
        throw new ConflictException('nip already exists');
      }
    }

    const normalizedRoleIds = await this.validateRoleIds(role_ids);
    const hashedPassword = await bcrypt.hash(password as string, 10);

    return this.knexService.connection.transaction(async (trx) => {
      const [user] = await trx('users')
        .insert({
          nip: nip ?? null,
          email,
          nama,
          password: hashedPassword,
          no_hp: no_hp ?? null,
          jurusan_id: jurusan_id ?? null,
          is_active: is_active ?? true,
        })
        .returning('*');

      await this.replaceRoles(trx, user.id, normalizedRoleIds);
      return this.mapToResponseDto(user, await this.getRoles(trx, user.id));
    });
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.knexService.connection('users')
      .whereNull('deleted_at')
      .select('id', 'nip', 'email', 'nama', 'no_hp', 'jurusan_id', 'is_active', 'created_at', 'updated_at');

    return Promise.all(
      users.map(async (u) =>
        this.mapToResponseDto(
          u,
          await this.getRoles(this.knexService.connection, u.id),
          await this.getJurusan(u.jurusan_id),
        ),
      ),
    );
  }

  async findById(id: number): Promise<UserResponseDto> {
    const user = await this.knexService.connection('users')
      .where({ id })
      .whereNull('deleted_at')
      .first();

    if (!user) {
      throw new NotFoundException('user tidak ditemukan');
    }

    return this.mapToResponseDto(
      user,
      await this.getRoles(this.knexService.connection, user.id),
      await this.getJurusan(user.jurusan_id),
    );
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.knexService.connection('users')
      .where({ email })
      .whereNull('deleted_at')
      .first();

    if (!user) {
      throw new NotFoundException('user tidak ditemukan');
    }

    return this.mapToResponseDto(
      user,
      await this.getRoles(this.knexService.connection, user.id),
      await this.getJurusan(user.jurusan_id),
    );
  }

  async findByEmailWithPassword(email: string) {
    return this.knexService.connection('users')
      .where({ email })
      .whereNull('deleted_at')
      .first();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.knexService.connection('users')
      .where({ id })
      .whereNull('deleted_at')
      .first();

    if (!user) {
      throw new NotFoundException('user tidak ditemukan');
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailExists = await this.knexService.connection('users')
        .where({ email: updateUserDto.email })
        .whereNull('deleted_at')
        .whereNot({ id })
        .first();

      if (emailExists) {
        throw new ConflictException('email already exists');
      }
    }

    if (updateUserDto.nip && updateUserDto.nip !== user.nip) {
      const nipExists = await this.knexService.connection('users')
        .where({ nip: updateUserDto.nip })
        .whereNull('deleted_at')
        .whereNot({ id })
        .first();

      if (nipExists) {
        throw new ConflictException('nip already exists');
      }
    }

    const { role_ids, ...userFields } = updateUserDto;
    const normalizedRoleIds = role_ids === undefined ? undefined : await this.validateRoleIds(role_ids);
    const updateData: any = { ...userFields, updated_at: new Date() };

    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.knexService.connection.transaction(async (trx) => {
      const [updated] = await trx('users').where({ id }).update(updateData).returning('*');

      if (normalizedRoleIds !== undefined) {
        await this.replaceRoles(trx, id, normalizedRoleIds);
      }

      return this.mapToResponseDto(updated, await this.getRoles(trx, id));
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.knexService.connection('users')
      .where({ id })
      .whereNull('deleted_at')
      .first();

    if (!user) {
      throw new NotFoundException('user tidak ditemukan');
    }

    await this.knexService.connection('users')
      .where({ id })
      .update({ deleted_at: new Date(), updated_at: new Date() });

    return { message: 'user berhasil dihapus' };
  }

  private mapToResponseDto(
    user: any,
    roles: RoleResponseDto[] = [],
    jurusan: JurusanResponseDto | null = null,
  ): UserResponseDto {
    return {
      id: user.id,
      nip: user.nip,
      email: user.email,
      nama: user.nama,
      no_hp: user.no_hp,
      jurusan_id: user.jurusan_id,
      is_active: user.is_active,
      created_at: user.created_at,
      updated_at: user.updated_at,
      roles,
      jurusan,
    };
  }

  private async validateRoleIds(roleIds: number[] | undefined): Promise<number[]> {
    const normalizedRoleIds = [...new Set(roleIds ?? [])];
    if (normalizedRoleIds.length === 0) {
      return normalizedRoleIds;
    }

    const roles = await this.knexService.connection('roles')
      .whereIn('id', normalizedRoleIds)
      .select('id');

    if (roles.length !== normalizedRoleIds.length) {
      throw new NotFoundException('satu atau beberapa role tidak ditemukan');
    }

    return normalizedRoleIds;
  }

  private async replaceRoles(trx: any, userId: number, roleIds: number[]) {
    await trx('user_roles').where({ user_id: userId }).del();
    if (roleIds.length > 0) {
      await trx('user_roles').insert(roleIds.map((roleId) => ({ user_id: userId, role_id: roleId })));
    }
  }

  async getRoles(query: any, userId: number): Promise<RoleResponseDto[]> {
    return query('roles')
      .join('user_roles', 'roles.id', 'user_roles.role_id')
      .where('user_roles.user_id', userId)
      .select('roles.id', 'roles.nama_role', 'roles.deskripsi')
      .orderBy('roles.id');
  }

  async findRolesByUserId(userId: number): Promise<RoleResponseDto[]> {
    return this.getRoles(this.knexService.connection, userId);
  }

  private async getJurusan(jurusanId: number | null): Promise<JurusanResponseDto | null> {
    if (jurusanId === null) {
      return null;
    }

    return (await this.knexService
      .connection('jurusan as j')
      .leftJoin('fakultas as f', 'f.id', 'j.fakultas_id')
      .where('j.id', jurusanId)
      .whereNull('j.deleted_at')
      .whereNull('f.deleted_at')
      .select(
        'j.id',
        'j.fakultas_id',
        'f.kode_fakultas',
        'f.nama_fakultas',
        'j.kode_jurusan',
        'j.nama_jurusan',
      )
      .first()) ?? null;
  }
}