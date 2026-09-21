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
exports.CreateMahasiswaDto = exports.Jurusan = void 0;
const class_validator_1 = require("class-validator");
var Jurusan;
(function (Jurusan) {
    Jurusan["INFORMATIKA"] = "Informatika";
    Jurusan["SISTEM_INFORMASI"] = "Sistem Informasi";
    Jurusan["TEKNIK_ELEKTRO"] = "Teknik Elektro";
    Jurusan["MANAJEMEN"] = "Manajemen";
})(Jurusan || (exports.Jurusan = Jurusan = {}));
class CreateMahasiswaDto {
    nim;
    nama;
    email;
    jurusan;
    tanggal_lahir;
}
exports.CreateMahasiswaDto = CreateMahasiswaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMahasiswaDto.prototype, "nim", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMahasiswaDto.prototype, "nama", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMahasiswaDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Jurusan),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMahasiswaDto.prototype, "jurusan", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMahasiswaDto.prototype, "tanggal_lahir", void 0);
//# sourceMappingURL=create-mahasiswa.dto.js.map