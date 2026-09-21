"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const mahasiswa_module_1 = require("./mahasiswa/mahasiswa.module");
const fakultas_module_1 = require("./fakultas/fakultas.module");
const jurusan_module_1 = require("./jurusan/jurusan.module");
const naskah_module_1 = require("./naskah/naskah.module");
const roles_module_1 = require("./roles/roles.module");
const penugasan_reviewer_module_1 = require("./penugasan-reviewer/penugasan-reviewer.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            mahasiswa_module_1.MahasiswaModule,
            fakultas_module_1.FakultasModule,
            jurusan_module_1.JurusanModule,
            naskah_module_1.NaskahModule,
            roles_module_1.RolesModule,
            penugasan_reviewer_module_1.PenugasanReviewerModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map