"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.naskahMulterOptions = exports.naskahFileFields = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const fs = __importStar(require("fs"));
const uploadDir = './uploads/naskah';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
exports.naskahFileFields = [
    { name: 'file_draft_naskah', maxCount: 1 },
    { name: 'file_profile_penulis', maxCount: 1 },
    { name: 'file_surat_keaslian', maxCount: 1 },
];
exports.naskahMulterOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: uploadDir,
        filename: (_req, file, callback) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            callback(null, `${file.fieldname}-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
        },
    }),
};
//# sourceMappingURL=multer-naskah.config.js.map