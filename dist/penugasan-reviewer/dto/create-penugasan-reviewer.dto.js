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
exports.CreatePenugasanReviewerDto = exports.StatusPenugasanEnum = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var StatusPenugasanEnum;
(function (StatusPenugasanEnum) {
    StatusPenugasanEnum["PENDING"] = "PENDING";
    StatusPenugasanEnum["ACCEPTED"] = "ACCEPTED";
    StatusPenugasanEnum["COMPLETED"] = "COMPLETED";
    StatusPenugasanEnum["DECLINED"] = "DECLINED";
})(StatusPenugasanEnum || (exports.StatusPenugasanEnum = StatusPenugasanEnum = {}));
class CreatePenugasanReviewerDto {
    naskah_id;
    reviewer_id;
    ditunjuk_oleh;
    deadline_review;
    status_penugasan;
}
exports.CreatePenugasanReviewerDto = CreatePenugasanReviewerDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePenugasanReviewerDto.prototype, "naskah_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePenugasanReviewerDto.prototype, "reviewer_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePenugasanReviewerDto.prototype, "ditunjuk_oleh", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePenugasanReviewerDto.prototype, "deadline_review", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(StatusPenugasanEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePenugasanReviewerDto.prototype, "status_penugasan", void 0);
//# sourceMappingURL=create-penugasan-reviewer.dto.js.map