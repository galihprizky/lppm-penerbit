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
exports.NaskahController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const naskah_service_1 = require("./naskah.service");
const create_naskah_dto_1 = require("./dto/create-naskah.dto");
const update_naskah_dto_1 = require("./dto/update-naskah.dto");
const multer_naskah_config_1 = require("./multer-naskah.config");
let NaskahController = class NaskahController {
    naskahService;
    constructor(naskahService) {
        this.naskahService = naskahService;
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
    async create(createNaskahDto, files) {
        const data = await this.naskahService.create(createNaskahDto, files);
        return this.buildResponse(common_1.HttpStatus.CREATED, 'Naskah berhasil dibuat', data);
    }
    async findAll() {
        const data = await this.naskahService.findAll();
        const message = data.length > 0 ? 'Data naskah berhasil diambil' : 'Data naskah masih kosong';
        return this.buildResponse(common_1.HttpStatus.OK, message, data);
    }
    async findByPengusulId(pengusulId) {
        const data = await this.naskahService.findByPengusulId(pengusulId);
        const message = data.length > 0 ? 'Data naskah berdasarkan pengusul berhasil diambil' : 'Tidak ada naskah untuk pengusul ini';
        return this.buildResponse(common_1.HttpStatus.OK, message, data);
    }
    async findOne(id) {
        const data = await this.naskahService.findOne(id);
        return this.buildResponse(common_1.HttpStatus.OK, 'Detail naskah berhasil diambil', data);
    }
    async update(id, updateNaskahDto) {
        const data = await this.naskahService.update(id, updateNaskahDto);
        return this.buildResponse(common_1.HttpStatus.OK, 'Naskah berhasil diperbarui', data);
    }
    async remove(id) {
        const data = await this.naskahService.remove(id);
        return this.buildResponse(common_1.HttpStatus.OK, 'Naskah berhasil dihapus', data);
    }
};
exports.NaskahController = NaskahController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)(multer_naskah_config_1.naskahFileFields, multer_naskah_config_1.naskahMulterOptions)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_naskah_dto_1.CreateNaskahDto, Object]),
    __metadata("design:returntype", Promise)
], NaskahController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NaskahController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pengusul/:pengusulId'),
    __param(0, (0, common_1.Param)('pengusulId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NaskahController.prototype, "findByPengusulId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NaskahController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_naskah_dto_1.UpdateNaskahDto]),
    __metadata("design:returntype", Promise)
], NaskahController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NaskahController.prototype, "remove", null);
exports.NaskahController = NaskahController = __decorate([
    (0, common_1.Controller)('naskah'),
    __metadata("design:paramtypes", [naskah_service_1.NaskahService])
], NaskahController);
//# sourceMappingURL=naskah.controller.js.map