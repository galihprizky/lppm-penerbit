"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenugasanReviewerService = void 0;
const common_1 = require("@nestjs/common");
const knex_service_1 = require("../database/knex.service");
const create_penugasan_reviewer_dto_1 = require("./dto/create-penugasan-reviewer.dto");
let PenugasanReviewerService = class PenugasanReviewerService {
    knexService;
    constructor(knexService) {
        this.knexService = knexService;
    }
    async ensureNaskahExists(naskahId) {
        const naskah = await this.knexService.connection('naskah')
            .where({ id: naskahId })
            .whereNull('deleted_at')
            .first();
        if (!naskah) {
            throw new common_1.NotFoundException('naskah tidak ditemukan');
        }
    }
    async ensureUserExists(userId, label) {
        const user = await this.knexService.connection('users')
            .where({ id: userId })
            .whereNull('deleted_at')
            .first();
        if (!user) {
            throw new common_1.NotFoundException(`${label} tidak ditemukan`);
        }
    }
    selectQuery() {
        return this.knexService.connection('penugasan_reviewer as pr')
            .leftJoin('naskah as n', 'n.id', 'pr.naskah_id')
            .leftJoin('users as reviewer', 'reviewer.id', 'pr.reviewer_id')
            .leftJoin('users as penunjuk', 'penunjuk.id', 'pr.ditunjuk_oleh')
            .select('pr.id', 'pr.naskah_id', 'n.judul_naskah', 'pr.reviewer_id', 'reviewer.nama as nama_reviewer', 'reviewer.email as email_reviewer', 'pr.ditunjuk_oleh', 'penunjuk.nama as nama_penunjuk', 'pr.deadline_review', 'pr.status_penugasan', 'pr.created_at', 'pr.updated_at');
    }
    async create(createDto) {
        await this.ensureNaskahExists(createDto.naskah_id);
        await this.ensureUserExists(createDto.reviewer_id, 'reviewer');
        await this.ensureUserExists(createDto.ditunjuk_oleh, 'penunjuk (admin LPPM)');
        const [created] = await this.knexService.connection('penugasan_reviewer')
            .insert({
            naskah_id: createDto.naskah_id,
            reviewer_id: createDto.reviewer_id,
            ditunjuk_oleh: createDto.ditunjuk_oleh,
            deadline_review: createDto.deadline_review,
            status_penugasan: createDto.status_penugasan ?? create_penugasan_reviewer_dto_1.StatusPenugasanEnum.PENDING,
            created_at: new Date(),
            updated_at: new Date(),
        })
            .returning('id');
        return this.selectQuery().where('pr.id', created.id).first();
    }
    async findByNaskahId(naskahId) {
        await this.ensureNaskahExists(naskahId);
        return this.selectQuery()
            .where('pr.naskah_id', naskahId)
            .orderBy('pr.created_at', 'desc');
    }
    async update(id, updateDto) {
        const penugasan = await this.knexService.connection('penugasan_reviewer')
            .where({ id })
            .first();
        if (!penugasan) {
            throw new common_1.NotFoundException('penugasan reviewer tidak ditemukan');
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
};
exports.PenugasanReviewerService = PenugasanReviewerService;
exports.PenugasanReviewerService = PenugasanReviewerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [knex_service_1.KnexService])
], PenugasanReviewerService);
//# sourceMappingURL=penugasan-reviewer.service.js.map