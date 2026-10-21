import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateStatusPenugasanDto } from './dto/update-status-penugasan.dto';
import { KnexService } from '../database/knex.service';
import {
  CreatePenugasanReviewerDto,
  StatusPenugasanEnum,
} from './dto/create-penugasan-reviewer.dto';
import { UpdatePenugasanReviewerDto } from './dto/update-penugasan-reviewer.dto';

@Injectable()
export class PenugasanReviewerService {
  constructor(private readonly knexService: KnexService) {}

  private async ensureNaskahExists(naskahId: number) {
    const naskah = await this.knexService.connection('naskah')
      .where({ id: naskahId })
      .whereNull('deleted_at')
      .first();

    if (!naskah) {
      throw new NotFoundException('naskah tidak ditemukan');
    }
  }

  private async ensureUserExists(userId: number, label: string) {
    const user = await this.knexService.connection('users')
      .where({ id: userId })
      .whereNull('deleted_at')
      .first();

    if (!user) {
      throw new NotFoundException(`${label} tidak ditemukan`);
    }
  }

  private selectQuery() {
    return this.knexService.connection('penugasan_reviewer as pr')
      .leftJoin('naskah as n', 'n.id', 'pr.naskah_id')
      .leftJoin('users as reviewer', 'reviewer.id', 'pr.reviewer_id')
      .leftJoin('users as penunjuk', 'penunjuk.id', 'pr.ditunjuk_oleh')
      .select(
        'pr.id',
        'pr.naskah_id',
        'n.judul_naskah',
        'pr.reviewer_id',
        'reviewer.nama as nama_reviewer',
        'reviewer.email as email_reviewer',
        'pr.ditunjuk_oleh',
        'penunjuk.nama as nama_penunjuk',
        'pr.deadline_review',
        'pr.status_penugasan',
        'pr.created_at',
        'pr.updated_at',
      );
  }

  async create(createDto: CreatePenugasanReviewerDto) {
    await this.ensureNaskahExists(createDto.naskah_id);
    await this.ensureUserExists(createDto.reviewer_id, 'reviewer');
    await this.ensureUserExists(createDto.ditunjuk_oleh, 'penunjuk (admin LPPM)');

    const created = await this.knexService.connection.transaction(async (trx) => {
      const [row] = await trx('penugasan_reviewer')
        .insert({
          naskah_id: createDto.naskah_id,
          reviewer_id: createDto.reviewer_id,
          ditunjuk_oleh: createDto.ditunjuk_oleh,
          deadline_review: createDto.deadline_review,
          status_penugasan: createDto.status_penugasan ?? StatusPenugasanEnum.PENDING,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning('id');

      await trx('naskah')
        .where({ id: createDto.naskah_id })
        .update({ status_saat_ini: 'UNDER_REVIEW', updated_at: new Date() });

      return row;
    });

    return this.selectQuery().where('pr.id', created.id).first();
  }

  async findByNaskahId(naskahId: number) {
    await this.ensureNaskahExists(naskahId);

    return this.selectQuery()
      .where('pr.naskah_id', naskahId)
      .orderBy('pr.created_at', 'desc');
  }

  async updateStatusByReviewer(id: number, dto: UpdateStatusPenugasanDto) {
    const penugasan = await this.knexService.connection('penugasan_reviewer')
      .where({ id })
      .first();

    if (!penugasan) {
      throw new NotFoundException('penugasan reviewer tidak ditemukan');
    }

    if (penugasan.reviewer_id !== dto.reviewer_id) {
      throw new ForbiddenException('penugasan ini bukan milik reviewer tersebut');
    }

    const allowed: Record<string, StatusPenugasanEnum[]> = {
      [StatusPenugasanEnum.PENDING]: [StatusPenugasanEnum.ACCEPTED, StatusPenugasanEnum.DECLINED],
      [StatusPenugasanEnum.ACCEPTED]: [StatusPenugasanEnum.COMPLETED, StatusPenugasanEnum.DECLINED],
      [StatusPenugasanEnum.COMPLETED]: [],
      [StatusPenugasanEnum.DECLINED]: [],
    };

    if (!(allowed[penugasan.status_penugasan] ?? []).includes(dto.status_penugasan)) {
      throw new BadRequestException(
        `status tidak dapat diubah dari ${penugasan.status_penugasan} ke ${dto.status_penugasan}`,
      );
    }

    await this.knexService.connection('penugasan_reviewer')
      .where({ id })
      .update({
        status_penugasan: dto.status_penugasan,
        updated_at: new Date(),
      });

    return this.selectQuery().where('pr.id', id).first();
  }

  async update(id: number, updateDto: UpdatePenugasanReviewerDto) {
    const penugasan = await this.knexService.connection('penugasan_reviewer')
      .where({ id })
      .first();

    if (!penugasan) {
      throw new NotFoundException('penugasan reviewer tidak ditemukan');
    }

    if (updateDto.naskah_id) {
      await this.ensureNaskahExists(updateDto.naskah_id);
    }

    if (updateDto.reviewer_id) {
      await this.ensureUserExists(updateDto.reviewer_id, 'reviewer');
    }

    if (updateDto.ditunjuk_oleh) {
      await this.ensureUserExists(updateDto.ditunjuk_oleh, 'penunjuk (admin LPPM)');
    }

    await this.knexService.connection('penugasan_reviewer')
      .where({ id })
      .update({
        ...updateDto,
        updated_at: new Date(),
      });

    return this.selectQuery().where('pr.id', id).first();
  }
}
