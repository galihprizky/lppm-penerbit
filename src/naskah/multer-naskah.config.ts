import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

const uploadDir = './uploads/naskah';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const naskahFileFields = [
  { name: 'file_draft_naskah', maxCount: 1 },
  { name: 'file_profile_penulis', maxCount: 1 },
  { name: 'file_surat_keaslian', maxCount: 1 },
];

export const naskahMulterOptions = {
  storage: diskStorage({
    destination: uploadDir,
    filename: (_req, file, callback) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
};

export type NaskahUploadedFiles = {
  file_draft_naskah?: Express.Multer.File[];
  file_profile_penulis?: Express.Multer.File[];
  file_surat_keaslian?: Express.Multer.File[];
};
