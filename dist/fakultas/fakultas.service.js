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
exports.FakultasService = void 0;
const common_1 = require("@nestjs/common");
const knex_service_1 = require("../database/knex.service");
let FakultasService = class FakultasService {
    knexService;
    constructor(knexService) {
        this.knexService = knexService;
    }
    async create(createFakultasDto) {
        const { kode_fakultas } = createFakultasDto;
        const exists = await this.knexService.connection('fakultas')
            .where({ kode_fakultas })
            .whereNull('deleted_at')
            .first();
        if (exists) {
            throw new common_1.ConflictException('kode fakultas sudah terdaftar');
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
    async findOne(id) {
        const fakultas = await this.knexService.connection('fakultas')
            .where({ id })
            .whereNull('deleted_at')
            .first();
        if (!fakultas) {
            throw new common_1.NotFoundException('fakultas tidak ditemukan');
        }
        return fakultas;
    }
    async update(id, updateFakultasDto) {
        const fakultas = await this.knexService.connection('fakultas')
            .where({ id })
            .whereNull('deleted_at')
            .first();
        if (!fakultas) {
            throw new common_1.NotFoundException('fakultas tidak ditemukan');
        }
        if (updateFakultasDto.kode_fakultas &&
            updateFakultasDto.kode_fakultas !== fakultas.kode_fakultas) {
            const kodeExists = await this.knexService.connection('fakultas')
                .where({ kode_fakultas: updateFakultasDto.kode_fakultas })
                .whereNull('deleted_at')
                .whereNot({ id })
                .first();
            if (kodeExists) {
                throw new common_1.ConflictException('kode fakultas sudah terdaftar');
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
    async remove(id) {
        const fakultas = await this.knexService.connection('fakultas')
            .where({ id })
            .whereNull('deleted_at')
            .first();
        if (!fakultas) {
            throw new common_1.NotFoundException('fakultas tidak ditemukan');
        }
        await this.knexService.connection('fakultas')
            .where({ id })
            .update({
            deleted_at: new Date(),
            updated_at: new Date(),
        });
        return { message: 'fakultas berhasil dihapus' };
    }
};
exports.FakultasService = FakultasService;
exports.FakultasService = FakultasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [knex_service_1.KnexService])
], FakultasService);
//# sourceMappingURL=fakultas.service.js.map