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
exports.MahasiswaService = void 0;
const common_1 = require("@nestjs/common");
const knex_service_1 = require("../database/knex.service");
let MahasiswaService = class MahasiswaService {
    knexService;
    constructor(knexService) {
        this.knexService = knexService;
    }
    async create(createMahasiswaDto) {
        const { nim, email } = createMahasiswaDto;
        const nimExists = await this.knexService.connection('data_mhs')
            .where({ nim })
            .first();
        if (nimExists) {
            throw new common_1.ConflictException('nim sudah terdaftar');
        }
        if (email) {
            const emailExists = await this.knexService.connection('data_mhs')
                .where({ email })
                .first();
            if (emailExists) {
                throw new common_1.ConflictException('email sudah terdaftar');
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
    async findAll(query) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const offset = (page - 1) * limit;
        const allowedColumns = ['nim', 'nama', 'email', 'jurusan'];
        let dbQuery = this.knexService.connection('data_mhs');
        if (query.column && query.search) {
            if (allowedColumns.includes(query.column)) {
                dbQuery = dbQuery.where(query.column, 'ilike', `%${query.search}%`);
            }
        }
        const [{ count }] = await dbQuery.clone().count('id as count');
        const total = parseInt(count, 10);
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
    async findOne(id) {
        const mhs = await this.knexService.connection('data_mhs')
            .where({ id })
            .first();
        if (!mhs) {
            throw new common_1.NotFoundException('mahasiswa tidak ditemukan');
        }
        return mhs;
    }
    async update(id, updateMahasiswaDto) {
        const mhs = await this.knexService.connection('data_mhs')
            .where({ id })
            .first();
        if (!mhs) {
            throw new common_1.NotFoundException('mahasiswa tidak ditemukan');
        }
        if (updateMahasiswaDto.nim && updateMahasiswaDto.nim !== mhs.nim) {
            const nimExists = await this.knexService.connection('data_mhs')
                .where({ nim: updateMahasiswaDto.nim })
                .whereNot({ id })
                .first();
            if (nimExists) {
                throw new common_1.ConflictException('nim sudah terdaftar');
            }
        }
        if (updateMahasiswaDto.email && updateMahasiswaDto.email !== mhs.email) {
            const emailExists = await this.knexService.connection('data_mhs')
                .where({ email: updateMahasiswaDto.email })
                .whereNot({ id })
                .first();
            if (emailExists) {
                throw new common_1.ConflictException('email sudah terdaftar');
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
    async remove(id) {
        const mhs = await this.knexService.connection('data_mhs')
            .where({ id })
            .first();
        if (!mhs) {
            throw new common_1.NotFoundException('mahasiswa tidak ditemukan');
        }
        await this.knexService.connection('data_mhs')
            .where({ id })
            .delete();
        return { message: 'data mahasiswa berhasil dihapus' };
    }
};
exports.MahasiswaService = MahasiswaService;
exports.MahasiswaService = MahasiswaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [knex_service_1.KnexService])
], MahasiswaService);
//# sourceMappingURL=mahasiswa.service.js.map