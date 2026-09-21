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
exports.CreateNaskahDto = exports.StatusNaskahEnum = exports.StatusCoverEnum = exports.WarnaIsiEnum = exports.TargetPembacaEnum = exports.JenisBukuEnum = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var JenisBukuEnum;
(function (JenisBukuEnum) {
    JenisBukuEnum["BUKU_REFERENSI"] = "Buku Referensi";
    JenisBukuEnum["BUKU_AJAR"] = "Buku Ajar";
})(JenisBukuEnum || (exports.JenisBukuEnum = JenisBukuEnum = {}));
var TargetPembacaEnum;
(function (TargetPembacaEnum) {
    TargetPembacaEnum["MAHASISWA"] = "Mahasiswa";
    TargetPembacaEnum["AKADEMISI"] = "Akademisi";
    TargetPembacaEnum["UMUM"] = "Umum";
})(TargetPembacaEnum || (exports.TargetPembacaEnum = TargetPembacaEnum = {}));
var WarnaIsiEnum;
(function (WarnaIsiEnum) {
    WarnaIsiEnum["HITAM_PUTIH"] = "Hitam Putih";
    WarnaIsiEnum["HITAM_PUTIH_DAN_BERWARNA"] = "Hitam Putih dan Berwarna";
    WarnaIsiEnum["FULL_COLOR"] = "Full Color";
})(WarnaIsiEnum || (exports.WarnaIsiEnum = WarnaIsiEnum = {}));
var StatusCoverEnum;
(function (StatusCoverEnum) {
    StatusCoverEnum["SUDAH"] = "Sudah";
    StatusCoverEnum["BELUM"] = "Belum";
})(StatusCoverEnum || (exports.StatusCoverEnum = StatusCoverEnum = {}));
var StatusNaskahEnum;
(function (StatusNaskahEnum) {
    StatusNaskahEnum["SUBMITTED"] = "SUBMITTED";
    StatusNaskahEnum["PENDING_LPPM"] = "PENDING_LPPM";
    StatusNaskahEnum["UNDER_REVIEW"] = "UNDER_REVIEW";
    StatusNaskahEnum["REVISION_REQUIRED"] = "REVISION_REQUIRED";
    StatusNaskahEnum["APPROVED_FOR_EDIT"] = "APPROVED_FOR_EDIT";
    StatusNaskahEnum["IN_EDITING"] = "IN_EDITING";
    StatusNaskahEnum["READY_TO_PRINT"] = "READY_TO_PRINT";
    StatusNaskahEnum["PUBLISHED"] = "PUBLISHED";
    StatusNaskahEnum["REJECTED"] = "REJECTED";
})(StatusNaskahEnum || (exports.StatusNaskahEnum = StatusNaskahEnum = {}));
class CreateNaskahDto {
    pengusul_id;
    judul_naskah;
    sinopsis;
    jenis_buku;
    target_pembaca;
    nama_semua_penulis;
    warna_isi_buku;
    pake_editor_pribadi;
    status_cover;
    status_saat_ini;
    catatan_perubahan;
}
exports.CreateNaskahDto = CreateNaskahDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateNaskahDto.prototype, "pengusul_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNaskahDto.prototype, "judul_naskah", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNaskahDto.prototype, "sinopsis", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(JenisBukuEnum),
    __metadata("design:type", String)
], CreateNaskahDto.prototype, "jenis_buku", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsEnum)(TargetPembacaEnum, { each: true }),
    __metadata("design:type", Array)
], CreateNaskahDto.prototype, "target_pembaca", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNaskahDto.prototype, "nama_semua_penulis", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(WarnaIsiEnum),
    __metadata("design:type", String)
], CreateNaskahDto.prototype, "warna_isi_buku", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateNaskahDto.prototype, "pake_editor_pribadi", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(StatusCoverEnum),
    __metadata("design:type", String)
], CreateNaskahDto.prototype, "status_cover", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(StatusNaskahEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNaskahDto.prototype, "status_saat_ini", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNaskahDto.prototype, "catatan_perubahan", void 0);
//# sourceMappingURL=create-naskah.dto.js.map