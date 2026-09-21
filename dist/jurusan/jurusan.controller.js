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
exports.JurusanController = void 0;
const common_1 = require("@nestjs/common");
const jurusan_service_1 = require("./jurusan.service");
const create_jurusan_dto_1 = require("./dto/create-jurusan.dto");
const update_jurusan_dto_1 = require("./dto/update-jurusan.dto");
let JurusanController = class JurusanController {
    jurusanService;
    constructor(jurusanService) {
        this.jurusanService = jurusanService;
    }
    normalizeValue(value) {
        if (value === null) {
            return 'Belum diisi';
        }
        if (Array.isArray(value)) {
            return value.map((item) => this.normalizeValue(item));
        }
        if (typeof value === 'object' && value !== null) {
            const entries = Object.entries(value).map(([key, item]) => [
                key,
                this.normalizeValue(item),
            ]);
            return Object.fromEntries(entries);
        }
        return value;
    }
    buildResponse(statusCode, message, data) {
        return {
            statusCode,
            message,
            data: this.normalizeValue(data),
        };
    }
    async create(createJurusanDto) {
        const data = await this.jurusanService.create(createJurusanDto);
        return this.buildResponse(common_1.HttpStatus.CREATED, 'Jurusan berhasil dibuat', data);
    }
    async findAll() {
        const data = await this.jurusanService.findAll();
        const message = data.length > 0 ? 'Data jurusan berhasil diambil' : 'Data jurusan masih kosong';
        return this.buildResponse(common_1.HttpStatus.OK, message, data);
    }
    async findByFakultasId(fakultasId) {
        const data = await this.jurusanService.findByFakultasId(fakultasId);
        const message = data.length > 0 ? 'Data jurusan berdasarkan fakultas berhasil diambil' : 'Tidak ada jurusan untuk fakultas ini';
        return this.buildResponse(common_1.HttpStatus.OK, message, data);
    }
    async findOne(id) {
        const data = await this.jurusanService.findOne(id);
        return this.buildResponse(common_1.HttpStatus.OK, 'Detail jurusan berhasil diambil', data);
    }
    async update(id, updateJurusanDto) {
        const data = await this.jurusanService.update(id, updateJurusanDto);
        return this.buildResponse(common_1.HttpStatus.OK, 'Jurusan berhasil diperbarui', data);
    }
    async remove(id) {
        const data = await this.jurusanService.remove(id);
        return this.buildResponse(common_1.HttpStatus.OK, 'Jurusan berhasil dihapus', data);
    }
};
exports.JurusanController = JurusanController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_jurusan_dto_1.CreateJurusanDto]),
    __metadata("design:returntype", Promise)
], JurusanController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JurusanController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('fakultas/:fakultasId'),
    __param(0, (0, common_1.Param)('fakultasId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JurusanController.prototype, "findByFakultasId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JurusanController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_jurusan_dto_1.UpdateJurusanDto]),
    __metadata("design:returntype", Promise)
], JurusanController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JurusanController.prototype, "remove", null);
exports.JurusanController = JurusanController = __decorate([
    (0, common_1.Controller)('jurusan'),
    __metadata("design:paramtypes", [jurusan_service_1.JurusanService])
], JurusanController);
//# sourceMappingURL=jurusan.controller.js.map