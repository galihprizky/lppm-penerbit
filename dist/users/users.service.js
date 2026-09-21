"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const knex_service_1 = require("../database/knex.service");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    knexService;
    constructor(knexService) {
        this.knexService = knexService;
    }
    async create(createUserDto) {
        const { nip, email, nama, password, no_hp, jurusan_id, is_active, role_ids } = createUserDto;
        const existingEmail = await this.knexService.connection('users')
            .where({ email })
            .whereNull('deleted_at')
            .first();
        if (existingEmail) {
            throw new common_1.ConflictException('email already exists');
        }
        if (nip) {
            const existingNip = await this.knexService.connection('users')
                .where({ nip })
                .whereNull('deleted_at')
                .first();
            if (existingNip) {
                throw new common_1.ConflictException('nip already exists');
            }
        }
        const normalizedRoleIds = await this.validateRoleIds(role_ids);
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.knexService.connection.transaction(async (trx) => {
            const [user] = await trx('users')
                .insert({
                nip: nip ?? null,
                email,
                nama,
                password: hashedPassword,
                no_hp: no_hp ?? null,
                jurusan_id: jurusan_id ?? null,
                is_active: is_active ?? true,
            })
                .returning('*');
            await this.replaceRoles(trx, user.id, normalizedRoleIds);
            return this.mapToResponseDto(user, await this.getRoles(trx, user.id));
        });
    }
    async findAll() {
        const users = await this.knexService.connection('users')
            .whereNull('deleted_at')
            .select('id', 'nip', 'email', 'nama', 'no_hp', 'jurusan_id', 'is_active', 'created_at', 'updated_at');
        return Promise.all(users.map(async (u) => this.mapToResponseDto(u, await this.getRoles(this.knexService.connection, u.id), await this.getJurusan(u.jurusan_id))));
    }
    async findById(id) {
        const user = await this.knexService.connection('users')
            .where({ id })
            .whereNull('deleted_at')
            .first();
        if (!user) {
            throw new common_1.NotFoundException('user tidak ditemukan');
        }
        return this.mapToResponseDto(user, await this.getRoles(this.knexService.connection, user.id), await this.getJurusan(user.jurusan_id));
    }
    async findByEmail(email) {
        const user = await this.knexService.connection('users')
            .where({ email })
            .whereNull('deleted_at')
            .first();
        if (!user) {
            throw new common_1.NotFoundException('user tidak ditemukan');
        }
        return this.mapToResponseDto(user, await this.getRoles(this.knexService.connection, user.id), await this.getJurusan(user.jurusan_id));
    }
    async findByEmailWithPassword(email) {
        return this.knexService.connection('users')
            .where({ email })
            .whereNull('deleted_at')
            .first();
    }
    async update(id, updateUserDto) {
        const user = await this.knexService.connection('users')
            .where({ id })
            .whereNull('deleted_at')
            .first();
        if (!user) {
            throw new common_1.NotFoundException('user tidak ditemukan');
        }
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const emailExists = await this.knexService.connection('users')
                .where({ email: updateUserDto.email })
                .whereNull('deleted_at')
                .whereNot({ id })
                .first();
            if (emailExists) {
                throw new common_1.ConflictException('email already exists');
            }
        }
        if (updateUserDto.nip && updateUserDto.nip !== user.nip) {
            const nipExists = await this.knexService.connection('users')
                .where({ nip: updateUserDto.nip })
                .whereNull('deleted_at')
                .whereNot({ id })
                .first();
            if (nipExists) {
                throw new common_1.ConflictException('nip already exists');
            }
        }
        const { role_ids, ...userFields } = updateUserDto;
        const normalizedRoleIds = role_ids === undefined ? undefined : await this.validateRoleIds(role_ids);
        const updateData = { ...userFields, updated_at: new Date() };
        if (updateUserDto.password) {
            updateData.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        return this.knexService.connection.transaction(async (trx) => {
            const [updated] = await trx('users').where({ id }).update(updateData).returning('*');
            if (normalizedRoleIds !== undefined) {
                await this.replaceRoles(trx, id, normalizedRoleIds);
            }
            return this.mapToResponseDto(updated, await this.getRoles(trx, id));
        });
    }
    async remove(id) {
        const user = await this.knexService.connection('users')
            .where({ id })
            .whereNull('deleted_at')
            .first();
        if (!user) {
            throw new common_1.NotFoundException('user tidak ditemukan');
        }
        await this.knexService.connection('users')
            .where({ id })
            .update({ deleted_at: new Date(), updated_at: new Date() });
        return { message: 'user berhasil dihapus' };
    }
    mapToResponseDto(user, roles = [], jurusan = null) {
        return {
            id: user.id,
            nip: user.nip,
            email: user.email,
            nama: user.nama,
            no_hp: user.no_hp,
            jurusan_id: user.jurusan_id,
            is_active: user.is_active,
            created_at: user.created_at,
            updated_at: user.updated_at,
            roles,
            jurusan,
        };
    }
    async validateRoleIds(roleIds) {
        const normalizedRoleIds = [...new Set(roleIds ?? [])];
        if (normalizedRoleIds.length === 0) {
            return normalizedRoleIds;
        }
        const roles = await this.knexService.connection('roles')
            .whereIn('id', normalizedRoleIds)
            .select('id');
        if (roles.length !== normalizedRoleIds.length) {
            throw new common_1.NotFoundException('satu atau beberapa role tidak ditemukan');
        }
        return normalizedRoleIds;
    }
    async replaceRoles(trx, userId, roleIds) {
        await trx('user_roles').where({ user_id: userId }).del();
        if (roleIds.length > 0) {
            await trx('user_roles').insert(roleIds.map((roleId) => ({ user_id: userId, role_id: roleId })));
        }
    }
    async getRoles(query, userId) {
        return query('roles')
            .join('user_roles', 'roles.id', 'user_roles.role_id')
            .where('user_roles.user_id', userId)
            .select('roles.id', 'roles.nama_role', 'roles.deskripsi')
            .orderBy('roles.id');
    }
    async findRolesByUserId(userId) {
        return this.getRoles(this.knexService.connection, userId);
    }
    async getJurusan(jurusanId) {
        if (jurusanId === null) {
            return null;
        }
        return (await this.knexService
            .connection('jurusan as j')
            .leftJoin('fakultas as f', 'f.id', 'j.fakultas_id')
            .where('j.id', jurusanId)
            .whereNull('j.deleted_at')
            .whereNull('f.deleted_at')
            .select('j.id', 'j.fakultas_id', 'f.kode_fakultas', 'f.nama_fakultas', 'j.kode_jurusan', 'j.nama_jurusan')
            .first()) ?? null;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [knex_service_1.KnexService])
], UsersService);
//# sourceMappingURL=users.service.js.map