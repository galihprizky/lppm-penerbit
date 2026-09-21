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
exports.MahasiswaController = void 0;
const common_1 = require("@nestjs/common");
const mahasiswa_service_1 = require("./mahasiswa.service");
const create_mahasiswa_dto_1 = require("./dto/create-mahasiswa.dto");
const update_mahasiswa_dto_1 = require("./dto/update-mahasiswa.dto");
let MahasiswaController = class MahasiswaController {
    mahasiswaService;
    constructor(mahasiswaService) {
        this.mahasiswaService = mahasiswaService;
    }
    async create(createMahasiswaDto) {
        return this.mahasiswaService.create(createMahasiswaDto);
    }
    async findAll(page, limit, column, search) {
        return this.mahasiswaService.findAll({
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
            column,
            search,
        });
    }
    async findOne(id) {
        return this.mahasiswaService.findOne(id);
    }
    async update(id, updateMahasiswaDto) {
        return this.mahasiswaService.update(id, updateMahasiswaDto);
    }
    async remove(id) {
        return this.mahasiswaService.remove(id);
    }
};
exports.MahasiswaController = MahasiswaController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mahasiswa_dto_1.CreateMahasiswaDto]),
    __metadata("design:returntype", Promise)
], MahasiswaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('column')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], MahasiswaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MahasiswaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_mahasiswa_dto_1.UpdateMahasiswaDto]),
    __metadata("design:returntype", Promise)
], MahasiswaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MahasiswaController.prototype, "remove", null);
exports.MahasiswaController = MahasiswaController = __decorate([
    (0, common_1.Controller)('mahasiswa'),
    __metadata("design:paramtypes", [mahasiswa_service_1.MahasiswaService])
], MahasiswaController);
//# sourceMappingURL=mahasiswa.controller.js.map