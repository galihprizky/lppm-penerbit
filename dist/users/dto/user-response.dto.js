"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JurusanResponseDto = exports.RoleResponseDto = exports.UserResponseDto = void 0;
class UserResponseDto {
    id;
    nip;
    email;
    nama;
    no_hp;
    jurusan_id;
    is_active;
    created_at;
    updated_at;
    roles;
    jurusan;
}
exports.UserResponseDto = UserResponseDto;
class RoleResponseDto {
    id;
    nama_role;
    deskripsi;
}
exports.RoleResponseDto = RoleResponseDto;
class JurusanResponseDto {
    id;
    fakultas_id;
    kode_fakultas;
    nama_fakultas;
    kode_jurusan;
    nama_jurusan;
}
exports.JurusanResponseDto = JurusanResponseDto;
//# sourceMappingURL=user-response.dto.js.map