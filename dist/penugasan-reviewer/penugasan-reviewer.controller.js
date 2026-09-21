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
exports.PenugasanReviewerController = void 0;
const common_1 = require("@nestjs/common");
const penugasan_reviewer_service_1 = require("./penugasan-reviewer.service");
const create_penugasan_reviewer_dto_1 = require("./dto/create-penugasan-reviewer.dto");
const update_penugasan_reviewer_dto_1 = require("./dto/update-penugasan-reviewer.dto");
let PenugasanReviewerController = class PenugasanReviewerController {
    penugasanReviewerService;
    constructor(penugasanReviewerService) {
        this.penugasanReviewerService = penugasanReviewerService;
    }
    buildResponse(statusCode, message, data) {
        return { statusCode, message, data };
    }
    async create(createDto) {
        const data = await this.penugasanReviewerService.create(createDto);
        return this.buildResponse(common_1.HttpStatus.CREATED, 'Penugasan reviewer berhasil dibuat', data);
    }
    async findByNaskahId(naskahId) {
        const data = await this.penugasanReviewerService.findByNaskahId(naskahId);
        const message = data.length > 0
            ? 'Data penugasan reviewer berhasil diambil'
            : 'Belum ada penugasan reviewer untuk naskah ini';
        return this.buildResponse(common_1.HttpStatus.OK, message, data);
    }
    async update(id, updateDto) {
        const data = await this.penugasanReviewerService.update(id, updateDto);
        return this.buildResponse(common_1.HttpStatus.OK, 'Penugasan reviewer berhasil diperbarui', data);
    }
};
exports.PenugasanReviewerController = PenugasanReviewerController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_penugasan_reviewer_dto_1.CreatePenugasanReviewerDto]),
    __metadata("design:returntype", Promise)
], PenugasanReviewerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('naskah/:naskahId'),
    __param(0, (0, common_1.Param)('naskahId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PenugasanReviewerController.prototype, "findByNaskahId", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_penugasan_reviewer_dto_1.UpdatePenugasanReviewerDto]),
    __metadata("design:returntype", Promise)
], PenugasanReviewerController.prototype, "update", null);
exports.PenugasanReviewerController = PenugasanReviewerController = __decorate([
    (0, common_1.Controller)('penugasan-reviewer'),
    __metadata("design:paramtypes", [penugasan_reviewer_service_1.PenugasanReviewerService])
], PenugasanReviewerController);
//# sourceMappingURL=penugasan-reviewer.controller.js.map