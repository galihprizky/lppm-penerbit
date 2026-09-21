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
exports.FakultasController = void 0;
const common_1 = require("@nestjs/common");
const fakultas_service_1 = require("./fakultas.service");
const create_fakultas_dto_1 = require("./dto/create-fakultas.dto");
const update_fakultas_dto_1 = require("./dto/update-fakultas.dto");
let FakultasController = class FakultasController {
    fakultasService;
    constructor(fakultasService) {
        this.fakultasService = fakultasService;
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
    async create(createFakultasDto) {
        const data = await this.fakultasService.create(createFakultasDto);
        return this.buildResponse(common_1.HttpStatus.CREATED, 'Fakultas berhasil dibuat', data);
    }
    async findAll() {
        const data = await this.fakultasService.findAll();
        const message = data.length > 0 ? 'Data fakultas berhasil diambil' : 'Data fakultas masih kosong';
        return this.buildResponse(common_1.HttpStatus.OK, message, data);
    }
    async findOne(id) {
        const data = await this.fakultasService.findOne(id);
        return this.buildResponse(common_1.HttpStatus.OK, 'Detail fakultas berhasil diambil', data);
    }
    async update(id, updateFakultasDto) {
        const data = await this.fakultasService.update(id, updateFakultasDto);
        return this.buildResponse(common_1.HttpStatus.OK, 'Fakultas berhasil diperbarui', data);
    }
    async remove(id) {
        const data = await this.fakultasService.remove(id);
        return this.buildResponse(common_1.HttpStatus.OK, 'Fakultas berhasil dihapus', data);
    }
};
exports.FakultasController = FakultasController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fakultas_dto_1.CreateFakultasDto]),
    __metadata("design:returntype", Promise)
], FakultasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FakultasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FakultasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_fakultas_dto_1.UpdateFakultasDto]),
    __metadata("design:returntype", Promise)
], FakultasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FakultasController.prototype, "remove", null);
exports.FakultasController = FakultasController = __decorate([
    (0, common_1.Controller)('fakultas'),
    __metadata("design:paramtypes", [fakultas_service_1.FakultasService])
], FakultasController);
//# sourceMappingURL=fakultas.controller.js.map