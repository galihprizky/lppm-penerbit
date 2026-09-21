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
exports.UpdateNaskahDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_naskah_dto_1 = require("./create-naskah.dto");
class UpdateNaskahDto {
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
}
exports.UpdateNaskahDto = UpdateNaskahDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateNaskahDto.prototype, "pengusul_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNaskahDto.prototype, "judul_naskah", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNaskahDto.prototype, "sinopsis", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(create_naskah_dto_1.JenisBukuEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNaskahDto.prototype, "jenis_buku", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsEnum)(create_naskah_dto_1.TargetPembacaEnum, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateNaskahDto.prototype, "target_pembaca", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNaskahDto.prototype, "nama_semua_penulis", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(create_naskah_dto_1.WarnaIsiEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNaskahDto.prototype, "warna_isi_buku", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateNaskahDto.prototype, "pake_editor_pribadi", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(create_naskah_dto_1.StatusCoverEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNaskahDto.prototype, "status_cover", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(create_naskah_dto_1.StatusNaskahEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNaskahDto.prototype, "status_saat_ini", void 0);
//# sourceMappingURL=update-naskah.dto.js.map