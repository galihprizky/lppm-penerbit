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
exports.JurusanService = void 0;
const common_1 = require("@nestjs/common");
const knex_service_1 = require("../database/knex.service");
let JurusanService = class JurusanService {
    knexService;
    constructor(knexService) {
        this.knexService = knexService;
    }
    async ensureFakultasExists(fakultasId) {
        const fakultas = await this.knexService.connection('fakultas')
            .where({ id: fakultasId })
            .whereNull('deleted_at')
            .first();
        if (!fakultas) {
            throw new common_1.NotFoundException('fakultas tidak ditemukan');
        }
    }
    async create(createJurusanDto) {
        const { fakultas_id, kode_jurusan } = createJurusanDto;
        await this.ensureFakultasExists(fakultas_id);
        const exists = await this.knexService.connection('jurusan')
            .where({ kode_jurusan })
            .whereNull('deleted_at')
            .first();
        if (exists) {
            throw new common_1.ConflictException('kode jurusan sudah terdaftar');
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
            .select('j.id', 'j.fakultas_id', 'f.kode_fakultas', 'f.nama_fakultas', 'j.kode_jurusan', 'j.nama_jurusan', 'j.created_at', 'j.updated_at')
            .orderBy('j.created_at', 'desc');
    }
    async findOne(id) {
        const jurusan = await this.knexService.connection('jurusan as j')
            .leftJoin('fakultas as f', 'f.id', 'j.fakultas_id')
            .where({ 'j.id': id })
            .whereNull('j.deleted_at')
            .whereNull('f.deleted_at')
            .select('j.id', 'j.fakultas_id', 'f.kode_fakultas', 'f.nama_fakultas', 'j.kode_jurusan', 'j.nama_jurusan', 'j.created_at', 'j.updated_at')
            .first();
        if (!jurusan) {
            throw new common_1.NotFoundException('jurusan tidak ditemukan');
        }
        return jurusan;
    }
    async findByFakultasId(fakultasId) {
        await this.ensureFakultasExists(fakultasId);
        return this.knexService.connection('jurusan as j')
            .leftJoin('fakultas as f', 'f.id', 'j.fakultas_id')
            .where({ 'j.fakultas_id': fakultasId })
            .whereNull('j.deleted_at')
            .whereNull('f.deleted_at')
            .select('j.id', 'j.fakultas_id', 'f.kode_fakultas', 'f.nama_fakultas', 'j.kode_jurusan', 'j.nama_jurusan', 'j.created_at', 'j.updated_at')
            .orderBy('j.created_at', 'desc');
    }
    async update(id, updateJurusanDto) {
        const jurusan = await this.knexService.connection('jurusan')
            .where({ id })
            .whereNull('deleted_at')
            .first();
        if (!jurusan) {
            throw new common_1.NotFoundException('jurusan tidak ditemukan');
        }
        if (updateJurusanDto.fakultas_id) {
            await this.ensureFakultasExists(updateJurusanDto.fakultas_id);
        }
        if (updateJurusanDto.kode_jurusan &&
            updateJurusanDto.kode_jurusan !== jurusan.kode_jurusan) {
            const kodeExists = await this.knexService.connection('jurusan')
                .where({ kode_jurusan: updateJurusanDto.kode_jurusan })
                .whereNull('deleted_at')
                .whereNot({ id })
                .first();
            if (kodeExists) {
                throw new common_1.ConflictException('kode jurusan sudah terdaftar');
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
    async remove(id) {
        const jurusan = await this.knexService.connection('jurusan')
            .where({ id })
            .whereNull('deleted_at')
            .first();
        if (!jurusan) {
            throw new common_1.NotFoundException('jurusan tidak ditemukan');
        }
        await this.knexService.connection('jurusan')
            .where({ id })
            .update({
            deleted_at: new Date(),
            updated_at: new Date(),
        });
        return { message: 'jurusan berhasil dihapus' };
    }
};
exports.JurusanService = JurusanService;
exports.JurusanService = JurusanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [knex_service_1.KnexService])
], JurusanService);
//# sourceMappingURL=jurusan.service.js.map