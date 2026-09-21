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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    replaceNulls(payload) {
        if (payload === null) {
            return 'Belum diisi';
        }
        if (Array.isArray(payload)) {
            return payload.map((item) => this.replaceNulls(item));
        }
        if (typeof payload === 'object' && payload !== null) {
            const entries = Object.entries(payload).map(([key, value]) => [
                key,
                this.replaceNulls(value),
            ]);
            return Object.fromEntries(entries);
        }
        return payload;
    }
    formatResponse(statusCode, message, data) {
        return {
            statusCode,
            message,
            data: this.replaceNulls(data),
        };
    }
    async create(createUserDto) {
        const user = await this.usersService.create(createUserDto);
        return this.formatResponse(common_1.HttpStatus.CREATED, 'User berhasil dibuat', user);
    }
    async findAll() {
        const users = await this.usersService.findAll();
        const message = users.length > 0 ? 'Data user berhasil diambil' : 'Data user masih kosong';
        return this.formatResponse(common_1.HttpStatus.OK, message, users);
    }
    async findByEmail(email) {
        const user = await this.usersService.findByEmail(email);
        return this.formatResponse(common_1.HttpStatus.OK, 'User berhasil ditemukan', user);
    }
    async findOne(id) {
        const user = await this.usersService.findById(id);
        return this.formatResponse(common_1.HttpStatus.OK, 'Detail user berhasil diambil', user);
    }
    async update(id, updateUserDto) {
        const user = await this.usersService.update(id, updateUserDto);
        return this.formatResponse(common_1.HttpStatus.OK, 'User berhasil diperbarui', user);
    }
    async remove(id) {
        const result = await this.usersService.remove(id);
        return this.formatResponse(common_1.HttpStatus.OK, 'User berhasil dihapus', result);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map