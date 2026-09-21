"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaskahModule = void 0;
const common_1 = require("@nestjs/common");
const naskah_controller_1 = require("./naskah.controller");
const naskah_service_1 = require("./naskah.service");
let NaskahModule = class NaskahModule {
};
exports.NaskahModule = NaskahModule;
exports.NaskahModule = NaskahModule = __decorate([
    (0, common_1.Module)({
        controllers: [naskah_controller_1.NaskahController],
        providers: [naskah_service_1.NaskahService],
        exports: [naskah_service_1.NaskahService],
    })
], NaskahModule);
//# sourceMappingURL=naskah.module.js.map