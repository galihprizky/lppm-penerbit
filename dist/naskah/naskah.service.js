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
exports.NaskahService = void 0;
const common_1 = require("@nestjs/common");
const knex_service_1 = require("../database/knex.service");
const create_naskah_dto_1 = require("./dto/create-naskah.dto");
let NaskahService = class NaskahService {
    knexService;
    constructor(knexService) {
        this.knexService = knexService;
    }
    async ensurePengusulExists(pengusulId) {
        const pengusul = await this.knexService.connection('users')
            .where({ id: pengusulId })
            .whereNull('deleted_at')
            .first();
        if (!pengusul) {
            throw new common_1.NotFoundException('pengusul tidak ditemukan');
        }
    }
    async create(createNaskahDto, files) {
        await this.ensurePengusulExists(createNaskahDto.pengusul_id);
        const fileDraftNaskah = files?.file_draft_naskah?.[0];
        if (!fileDraftNaskah) {
            throw new common_1.BadRequestException('file_draft_naskah wajib diunggah');
        }
        const fileProfilePenulis = files?.file_profile_penulis?.[0];
        const fileSuratKeaslian = files?.file_surat_keaslian?.[0];
        const { catatan_perubahan, ...naskahFields } = createNaskahDto;
        return this.knexService.connection.transaction(async (trx) => {
            const [created] = await trx('naskah')
                .insert({
                ...naskahFields,
                status_saat_ini: createNaskahDto.status_saat_ini ?? create_naskah_dto_1.StatusNaskahEnum.SUBMITTED,
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
            .select('n.id', 'n.pengusul_id', 'u.nama as nama_pengusul', 'u.email as email_pengusul', 'n.judul_naskah', 'n.sinopsis', 'n.jenis_buku', 'n.target_pembaca', 'n.nama_semua_penulis', 'n.warna_isi_buku', 'n.pake_editor_pribadi', 'n.status_cover', 'n.status_saat_ini', 'n.created_at', 'n.updated_at')
            .orderBy('n.created_at', 'desc');
    }
    async findOne(id) {
        const naskah = await this.knexService.connection('naskah as n')
            .leftJoin('users as u', 'u.id', 'n.pengusul_id')
            .where({ 'n.id': id })
            .whereNull('n.deleted_at')
            .whereNull('u.deleted_at')
            .select('n.id', 'n.pengusul_id', 'u.nama as nama_pengusul', 'u.email as email_pengusul', 'n.judul_naskah', 'n.sinopsis', 'n.jenis_buku', 'n.target_pembaca', 'n.nama_semua_penulis', 'n.warna_isi_buku', 'n.pake_editor_pribadi', 'n.status_cover', 'n.status_saat_ini', 'n.created_at', 'n.updated_at')
            .first();
        if (!naskah) {
            throw new common_1.NotFoundException('naskah tidak ditemukan');
        }
        return naskah;
    }
    async findByPengusulId(pengusulId) {
        await this.ensurePengusulExists(pengusulId);
        return this.knexService.connection('naskah as n')
            .leftJoin('users as u', 'u.id', 'n.pengusul_id')
            .where({ 'n.pengusul_id': pengusulId })
            .whereNull('n.deleted_at')
            .whereNull('u.deleted_at')
            .select('n.id', 'n.pengusul_id', 'u.nama as nama_pengusul', 'u.email as email_pengusul', 'n.judul_naskah', 'n.sinopsis', 'n.jenis_buku', 'n.target_pembaca', 'n.nama_semua_penulis', 'n.warna_isi_buku', 'n.pake_editor_pribadi', 'n.status_cover', 'n.status_saat_ini', 'n.created_at', 'n.updated_at')
            .orderBy('n.created_at', 'desc');
    }
    async update(id, updateNaskahDto) {
        const naskah = await this.knexService.connection('naskah')
            .where({ id })
            .whereNull('deleted_at')
            .first();
        if (!naskah) {
            throw new common_1.NotFoundException('naskah tidak ditemukan');
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
    async remove(id) {
        const naskah = await this.knexService.connection('naskah')
            .where({ id })
            .whereNull('deleted_at')
            .first();
        if (!naskah) {
            throw new common_1.NotFoundException('naskah tidak ditemukan');
        }
        await this.knexService.connection('naskah')
            .where({ id })
            .update({
            deleted_at: new Date(),
            updated_at: new Date(),
        });
        return { message: 'naskah berhasil dihapus' };
    }
};
exports.NaskahService = NaskahService;
exports.NaskahService = NaskahService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [knex_service_1.KnexService])
], NaskahService);
//# sourceMappingURL=naskah.service.js.map