"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MahasiswaModule = void 0;
const common_1 = require("@nestjs/common");
const mahasiswa_service_1 = require("./mahasiswa.service");
const mahasiswa_controller_1 = require("./mahasiswa.controller");
let MahasiswaModule = class MahasiswaModule {
};
exports.MahasiswaModule = MahasiswaModule;
exports.MahasiswaModule = MahasiswaModule = __decorate([
    (0, common_1.Module)({
        providers: [mahasiswa_service_1.MahasiswaService],
        controllers: [mahasiswa_controller_1.MahasiswaController],
    })
], MahasiswaModule);
//# sourceMappingURL=mahasiswa.module.js.map