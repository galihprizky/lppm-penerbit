import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { KnexService } from '../database/knex.service';
import { CreateFakultasDto } from './dto/create-fakultas.dto';
import { UpdateFakultasDto } from './dto/update-fakultas.dto';

@Injectable()
export class FakultasService {
  constructor(private readonly knexService: KnexService) {}

  async create(createFakultasDto: CreateFakultasDto) {
    const { kode_fakultas } = createFakultasDto;

    const exists = await this.knexService.connection('fakultas')
      .where({ kode_fakultas })
      .whereNull('deleted_at')
      .first();

    if (exists) {
      throw new ConflictException('kode fakultas sudah terdaftar');
    }

    const [created] = await this.knexService.connection('fakultas')
      .insert({
        ...createFakultasDto,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('*');

    return created;
  }

  async findAll() {
    return this.knexService.connection('fakultas')
      .whereNull('deleted_at')
      .select('*')
      .orderBy('created_at', 'desc');
  }

  async findOne(id: number) {
    const fakultas = await this.knexService.connection('fakultas')
      .where({ id })
      .whereNull('deleted_at')
      .first();

    if (!fakultas) {
      throw new NotFoundException('fakultas tidak ditemukan');
    }

    return fakultas;
  }

  async update(id: number, updateFakultasDto: UpdateFakultasDto) {
    const fakultas = await this.knexService.connection('fakultas')
      .where({ id })
      .whereNull('deleted_at')
      .first();

    if (!fakultas) {
      throw new NotFoundException('fakultas tidak ditemukan');
    }

    if (
      updateFakultasDto.kode_fakultas &&
      updateFakultasDto.kode_fakultas !== fakultas.kode_fakultas
    ) {
      const kodeExists = await this.knexService.connection('fakultas')
        .where({ kode_fakultas: updateFakultasDto.kode_fakultas })
        .whereNull('deleted_at')
        .whereNot({ id })
        .first();

      if (kodeExists) {
        throw new ConflictException('kode fakultas sudah terdaftar');
      }
    }

    const [updated] = await this.knexService.connection('fakultas')
      .where({ id })
      .update({
        ...updateFakultasDto,
        updated_at: new Date(),
      })
      .returning('*');

    return updated;
  }

  async remove(id: number) {
    const fakultas = await this.knexService.connection('fakultas')
      .where({ id })
      .whereNull('deleted_at')
      .first();

    if (!fakultas) {
      throw new NotFoundException('fakultas tidak ditemukan');
    }

    await this.knexService.connection('fakultas')
      .where({ id })
      .update({
        deleted_at: new Date(),
        updated_at: new Date(),
      });

    return { message: 'fakultas berhasil dihapus' };
  }
}
