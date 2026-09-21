import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { KnexService } from '../database/knex.service';
import { CreateNaskahDto, StatusNaskahEnum } from './dto/create-naskah.dto';
import { UpdateNaskahDto } from './dto/update-naskah.dto';
import type { NaskahUploadedFiles } from './multer-naskah.config';

@Injectable()
export class NaskahService {
  constructor(private readonly knexService: KnexService) {}

  private async ensurePengusulExists(pengusulId: number) {
    const pengusul = await this.knexService.connection('users')
      .where({ id: pengusulId })
      .whereNull('deleted_at')
      .first();

    if (!pengusul) {
      throw new NotFoundException('pengusul tidak ditemukan');
    }
  }

  async create(createNaskahDto: CreateNaskahDto, files: NaskahUploadedFiles) {
    await this.ensurePengusulExists(createNaskahDto.pengusul_id);

    const fileDraftNaskah = files?.file_draft_naskah?.[0];
    if (!fileDraftNaskah) {
      throw new BadRequestException('file_draft_naskah wajib diunggah');
    }

    const fileProfilePenulis = files?.file_profile_penulis?.[0];
    const fileSuratKeaslian = files?.file_surat_keaslian?.[0];
    const { catatan_perubahan, ...naskahFields } = createNaskahDto;

    return this.knexService.connection.transaction(async (trx) => {
      const [created] = await trx('naskah')
        .insert({
          ...naskahFields,
          status_saat_ini: createNaskahDto.status_saat_ini ?? StatusNaskahEnum.SUBMITTED,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning('*');

      const [versi] = await trx('versi_naskah')
        .insert({
          naskah_id: created.id,
          uploaded_by: createNaskahDto.pengusul_id,
          tahap: 'DRAFT_AWAL',
          versi_ke: 1,
          file_draft_naskah: fileDraftNaskah.path,
          file_profile_penulis: fileProfilePenulis?.path ?? null,
          file_surat_keaslian: fileSuratKeaslian?.path ?? null,
          catatan_perubahan: catatan_perubahan ?? null,
          created_at: new Date(),
        })
        .returning('*');

      return { ...created, versi_naskah: versi };
    });
  }

  async findAll() {
    return this.knexService.connection('naskah as n')
      .leftJoin('users as u', 'u.id', 'n.pengusul_id')
      .whereNull('n.deleted_at')
      .whereNull('u.deleted_at')
      .select(
        'n.id',
        'n.pengusul_id',
        'u.nama as nama_pengusul',
        'u.email as email_pengusul',
        'n.judul_naskah',
        'n.sinopsis',
        'n.jenis_buku',
        'n.target_pembaca',
        'n.nama_semua_penulis',
        'n.warna_isi_buku',
        'n.pake_editor_pribadi',
        'n.status_cover',
        'n.status_saat_ini',
        'n.created_at',
        'n.updated_at',
      )
      .orderBy('n.created_at', 'desc');
  }

  async findOne(id: number) {
    const naskah = await this.knexService.connection('naskah as n')
      .leftJoin('users as u', 'u.id', 'n.pengusul_id')
      .where({ 'n.id': id })
      .whereNull('n.deleted_at')
      .whereNull('u.deleted_at')
      .select(
        'n.id',
        'n.pengusul_id',
        'u.nama as nama_pengusul',
        'u.email as email_pengusul',
        'n.judul_naskah',
        'n.sinopsis',
        'n.jenis_buku',
        'n.target_pembaca',
        'n.nama_semua_penulis',
        'n.warna_isi_buku',
        'n.pake_editor_pribadi',
        'n.status_cover',
        'n.status_saat_ini',
        'n.created_at',
        'n.updated_at',
      )
      .first();

    if (!naskah) {
      throw new NotFoundException('naskah tidak ditemukan');
    }

    return naskah;
  }

  async findByPengusulId(pengusulId: number) {
    await this.ensurePengusulExists(pengusulId);

    return this.knexService.connection('naskah as n')
      .leftJoin('users as u', 'u.id', 'n.pengusul_id')
      .where({ 'n.pengusul_id': pengusulId })
      .whereNull('n.deleted_at')
      .whereNull('u.deleted_at')
      .select(
        'n.id',
        'n.pengusul_id',
        'u.nama as nama_pengusul',
        'u.email as email_pengusul',
        'n.judul_naskah',
        'n.sinopsis',
        'n.jenis_buku',
        'n.target_pembaca',
        'n.nama_semua_penulis',
        'n.warna_isi_buku',
        'n.pake_editor_pribadi',
        'n.status_cover',
        'n.status_saat_ini',
        'n.created_at',
        'n.updated_at',
      )
      .orderBy('n.created_at', 'desc');
  }

  async update(id: number, updateNaskahDto: UpdateNaskahDto) {
    const naskah = await this.knexService.connection('naskah')
      .where({ id })
      .whereNull('deleted_at')
      .first();

    if (!naskah) {
      throw new NotFoundException('naskah tidak ditemukan');
    }

    if (updateNaskahDto.pengusul_id) {
      await this.ensurePengusulExists(updateNaskahDto.pengusul_id);
    }

    const [updated] = await this.knexService.connection('naskah')
      .where({ id })
      .update({
        ...updateNaskahDto,
        updated_at: new Date(),
      })
      .returning('*');

    return updated;
  }

  async remove(id: number) {
    const naskah = await this.knexService.connection('naskah')
      .where({ id })
      .whereNull('deleted_at')
      .first();

    if (!naskah) {
      throw new NotFoundException('naskah tidak ditemukan');
    }

    await this.knexService.connection('naskah')
      .where({ id })
      .update({
        deleted_at: new Date(),
        updated_at: new Date(),
      });

    return { message: 'naskah berhasil dihapus' };
  }
}
