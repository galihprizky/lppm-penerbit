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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const knex_service_1 = require("../database/knex.service");
let RolesService = class RolesService {
    knexService;
    constructor(knexService) {
        this.knexService = knexService;
    }
    async create(createRoleDto) {
        const existingRole = await this.knexService.connection('roles')
            .where({ nama_role: createRoleDto.nama_role })
            .first();
        if (existingRole) {
            throw new common_1.ConflictException('nama role sudah terdaftar');
        }
        const [role] = await this.knexService.connection('roles')
            .insert({
            nama_role: createRoleDto.nama_role,
            deskripsi: createRoleDto.deskripsi ?? null,
        })
            .returning('*');
        return role;
    }
    async findAll() {
        return this.knexService.connection('roles').select('*').orderBy('id');
    }
    async findOne(id) {
        const role = await this.knexService.connection('roles').where({ id }).first();
        if (!role) {
            throw new common_1.NotFoundException('role tidak ditemukan');
        }
        return role;
    }
    async update(id, updateRoleDto) {
        await this.findOne(id);
        if (updateRoleDto.nama_role) {
            const existingRole = await this.knexService.connection('roles')
                .where({ nama_role: updateRoleDto.nama_role })
                .whereNot({ id })
                .first();
            if (existingRole) {
                throw new common_1.ConflictException('nama role sudah terdaftar');
            }
        }
        const [role] = await this.knexService.connection('roles')
            .where({ id })
            .update(updateRoleDto)
            .returning('*');
        return role;
    }
    async remove(id) {
        await this.findOne(id);
        await this.knexService.connection('roles').where({ id }).del();
        return { message: 'role berhasil dihapus' };
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [knex_service_1.KnexService])
], RolesService);
//# sourceMappingURL=roles.service.js.map