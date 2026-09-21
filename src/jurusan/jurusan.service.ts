import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { KnexService } from '../database/knex.service';
import { CreateJurusanDto } from './dto/create-jurusan.dto';
import { UpdateJurusanDto } from './dto/update-jurusan.dto';

@Injectable()
export class JurusanService {
  constructor(private readonly knexService: KnexService) {}

  private async ensureFakultasExists(fakultasId: number) {
    const fakultas = await this.knexService.connection('fakultas')
      .where({ id: fakultasId })
      .whereNull('deleted_at')
      .first();

    if (!fakultas) {
      throw new NotFoundException('fakultas tidak ditemukan');
    }
  }

  async create(createJurusanDto: CreateJurusanDto) {
    const { fakultas_id, kode_jurusan } = createJurusanDto;

    await this.ensureFakultasExists(fakultas_id);

    const exists = await this.knexService.connection('jurusan')
      .where({ kode_jurusan })
      .whereNull('deleted_at')
      .first();

    if (exists) {
      throw new ConflictException('kode jurusan sudah terdaftar');
    }

    const [created] = await this.knexService.connection('jurusan')
      .insert({
        ...createJurusanDto,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('*');

    return created;
  }

  async findAll() {
    return this.knexService.connection('jurusan as j')
      .leftJoin('fakultas as f', 'f.id', 'j.fakultas_id')
      .whereNull('j.deleted_at')
      .whereNull('f.deleted_at')
      .select(
        'j.id',
        'j.fakultas_id',
        'f.kode_fakultas',
        'f.nama_fakultas',
        'j.kode_jurusan',
        'j.nama_jurusan',
        'j.created_at',
        'j.updated_at',
      )
      .orderBy('j.created_at', 'desc');
  }

  async findOne(id: number) {
    const jurusan = await this.knexService.connection('jurusan as j')
      .leftJoin('fakultas as f', 'f.id', 'j.fakultas_id')
      .where({ 'j.id': id })
      .whereNull('j.deleted_at')
      .whereNull('f.deleted_at')
      .select(
        'j.id',
        'j.fakultas_id',
        'f.kode_fakultas',
        'f.nama_fakultas',
        'j.kode_jurusan',
        'j.nama_jurusan',
        'j.created_at',
        'j.updated_at',
      )
      .first();

    if (!jurusan) {
      throw new NotFoundException('jurusan tidak ditemukan');
    }

    return jurusan;
  }

  async findByFakultasId(fakultasId: number) {
    await this.ensureFakultasExists(fakultasId);

    return this.knexService.connection('jurusan as j')
      .leftJoin('fakultas as f', 'f.id', 'j.fakultas_id')
      .where({ 'j.fakultas_id': fakultasId })
      .whereNull('j.deleted_at')
      .whereNull('f.deleted_at')
      .select(
        'j.id',
        'j.fakultas_id',
        'f.kode_fakultas',
        'f.nama_fakultas',
        'j.kode_jurusan',
        'j.nama_jurusan',
        'j.created_at',
        'j.updated_at',
      )
      .orderBy('j.created_at', 'desc');
  }

  async update(id: number, updateJurusanDto: UpdateJurusanDto) {
    const jurusan = await this.knexService.connection('jurusan')
      .where({ id })
      .whereNull('deleted_at')
      .first();

    if (!jurusan) {
      throw new NotFoundException('jurusan tidak ditemukan');
    }

    if (updateJurusanDto.fakultas_id) {
      await this.ensureFakultasExists(updateJurusanDto.fakultas_id);
    }

    if (
      updateJurusanDto.kode_jurusan &&
      updateJurusanDto.kode_jurusan !== jurusan.kode_jurusan
    ) {
      const kodeExists = await this.knexService.connection('jurusan')
        .where({ kode_jurusan: updateJurusanDto.kode_jurusan })
        .whereNull('deleted_at')
        .whereNot({ id })
        .first();

      if (kodeExists) {
        throw new ConflictException('kode jurusan sudah terdaftar');
      }
    }

    const [updated] = await this.knexService.connection('jurusan')
      .where({ id })
      .update({
        ...updateJurusanDto,
        updated_at: new Date(),
      })
      .returning('*');

    return updated;
  }

  async remove(id: number) {
    const jurusan = await this.knexService.connection('jurusan')
      .where({ id })
      .whereNull('deleted_at')
      .first();

    if (!jurusan) {
      throw new NotFoundException('jurusan tidak ditemukan');
    }

    await this.knexService.connection('jurusan')
      .where({ id })
      .update({
        deleted_at: new Date(),
        updated_at: new Date(),
      });

    return { message: 'jurusan berhasil dihapus' };
  }
}
