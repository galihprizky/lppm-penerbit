import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { KnexService } from '../database/knex.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';

@Injectable()
export class MahasiswaService {
  constructor(private readonly knexService: KnexService) {}

  async create(createMahasiswaDto: CreateMahasiswaDto) {
    const { nim, email } = createMahasiswaDto;

    // cek nim duplikat
    const nimExists = await this.knexService.connection('data_mhs')
      .where({ nim })
      .first();

    if (nimExists) {
      throw new ConflictException('nim sudah terdaftar');
    }

    // cek email duplikat kalau diisi
    if (email) {
      const emailExists = await this.knexService.connection('data_mhs')
        .where({ email })
        .first();

      if (emailExists) {
        throw new ConflictException('email sudah terdaftar');
      }
    }

    const [mhs] = await this.knexService.connection('data_mhs')
      .insert({
        ...createMahasiswaDto,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('*');

    return mhs;
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    column?: string;
    search?: string;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;

    // kolom yang boleh disearch (whitelist biar aman)
    const allowedColumns = ['nim', 'nama', 'email', 'jurusan'];

    let dbQuery = this.knexService.connection('data_mhs');

    // dynamic where kalau ada query search
    if (query.column && query.search) {
      if (allowedColumns.includes(query.column)) {
        dbQuery = dbQuery.where(query.column, 'ilike', `%${query.search}%`);
      }
    }

    // hitung total dulu buat pagination
    const [{ count }] = await dbQuery.clone().count('id as count');
    const total = parseInt(count as string, 10);

    const data = await dbQuery
      .select('*')
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', 'desc');

    return {
      data,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const mhs = await this.knexService.connection('data_mhs')
      .where({ id })
      .first();

    if (!mhs) {
      throw new NotFoundException('mahasiswa tidak ditemukan');
    }

    return mhs;
  }

  async update(id: number, updateMahasiswaDto: UpdateMahasiswaDto) {
    const mhs = await this.knexService.connection('data_mhs')
      .where({ id })
      .first();

    if (!mhs) {
      throw new NotFoundException('mahasiswa tidak ditemukan');
    }

    // cek nim duplikat kalau diupdate
    if (updateMahasiswaDto.nim && updateMahasiswaDto.nim !== mhs.nim) {
      const nimExists = await this.knexService.connection('data_mhs')
        .where({ nim: updateMahasiswaDto.nim })
        .whereNot({ id })
        .first();

      if (nimExists) {
        throw new ConflictException('nim sudah terdaftar');
      }
    }

    // cek email duplikat kalau diupdate
    if (updateMahasiswaDto.email && updateMahasiswaDto.email !== mhs.email) {
      const emailExists = await this.knexService.connection('data_mhs')
        .where({ email: updateMahasiswaDto.email })
        .whereNot({ id })
        .first();

      if (emailExists) {
        throw new ConflictException('email sudah terdaftar');
      }
    }

    const [updated] = await this.knexService.connection('data_mhs')
      .where({ id })
      .update({
        ...updateMahasiswaDto,
        updated_at: new Date(),
      })
      .returning('*');

    return updated;
  }

  async remove(id: number) {
    const mhs = await this.knexService.connection('data_mhs')
      .where({ id })
      .first();

    if (!mhs) {
      throw new NotFoundException('mahasiswa tidak ditemukan');
    }

    await this.knexService.connection('data_mhs')
      .where({ id })
      .delete();

    return { message: 'data mahasiswa berhasil dihapus' };
  }
}