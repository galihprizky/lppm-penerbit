import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { KnexService } from '../database/knex.service';
import { CreateHasilReviewDto, RekomendasiEnum } from './dto/create-hasil-review.dto';
import { StatusNaskahEnum } from '../naskah/dto/create-naskah.dto';

const STATUS_NASKAH_BY_REKOMENDASI: Record<RekomendasiEnum, StatusNaskahEnum> = {
  [RekomendasiEnum.DITERIMA]: StatusNaskahEnum.APPROVED_FOR_EDIT,
  [RekomendasiEnum.REVISI_MINOR]: StatusNaskahEnum.REVISION_REQUIRED,
  [RekomendasiEnum.REVISI_MAYOR]: StatusNaskahEnum.REVISION_REQUIRED,
  [RekomendasiEnum.DITOLAK]: StatusNaskahEnum.REJECTED,
};

@Injectable()
export class HasilReviewService {
  constructor(private readonly knexService: KnexService) {}

  private selectQuery() {
    return this.knexService.connection('hasil_review as hr')
      .join('penugasan_reviewer as pr', 'pr.id', 'hr.penugasan_id')
      .leftJoin('naskah as n', 'n.id', 'pr.naskah_id')
      .leftJoin('users as reviewer', 'reviewer.id', 'pr.reviewer_id')
      .select(
        'hr.id',
        'hr.penugasan_id',
        'pr.naskah_id',
        'n.judul_naskah',
        'pr.reviewer_id',
        'reviewer.nama as nama_reviewer',
        'hr.rekomendasi',
        'hr.catatan_review',
        'hr.file_catatan_review',
        'hr.submitted_at',
      );
  }

  async create(dto: CreateHasilReviewDto, fileAnotasi?: Express.Multer.File) {
    const penugasan = await this.knexService.connection('penugasan_reviewer')
      .where({ id: dto.penugasan_id })
      .first();

    if (!penugasan) {
      throw new NotFoundException('penugasan reviewer tidak ditemukan');
    }

    if (penugasan.reviewer_id !== dto.reviewer_id) {
      throw new ForbiddenException('penugasan ini bukan milik reviewer tersebut');
    }

    if (penugasan.status_penugasan !== 'ACCEPTED') {
      throw new BadRequestException(
        'review hanya dapat diisi untuk penugasan dengan status ACCEPTED',
      );
    }

    const existing = await this.knexService.connection('hasil_review')
      .where({ penugasan_id: dto.penugasan_id })
      .first();

    if (existing) {
      throw new ConflictException('hasil review untuk penugasan ini sudah ada');
    }

    const id = await this.knexService.connection.transaction(async (trx) => {
      const [created] = await trx('hasil_review')
        .insert({
          penugasan_id: dto.penugasan_id,
          rekomendasi: dto.rekomendasi,
          catatan_review: dto.catatan_review,
          file_catatan_review: fileAnotasi?.path ?? null,
          submitted_at: new Date(),
        })
        .returning('id');

      await trx('penugasan_reviewer')
        .where({ id: dto.penugasan_id })
        .update({ status_penugasan: 'COMPLETED', updated_at: new Date() });

      await trx('naskah')
        .where({ id: penugasan.naskah_id })
        .update({
          status_saat_ini: STATUS_NASKAH_BY_REKOMENDASI[dto.rekomendasi],
          updated_at: new Date(),
        });

      return typeof created === 'object' ? created.id : created;
    });

    return this.selectQuery().where('hr.id', id).first();
  }

  async findByPenugasanId(penugasanId: number) {
    const hasil = await this.selectQuery().where('hr.penugasan_id', penugasanId).first();

    if (!hasil) {
      throw new NotFoundException('hasil review tidak ditemukan');
    }

    return hasil;
  }

  async findByNaskahId(naskahId: number) {
    return this.selectQuery()
      .where('pr.naskah_id', naskahId)
      .orderBy('hr.submitted_at', 'desc');
  }
}
