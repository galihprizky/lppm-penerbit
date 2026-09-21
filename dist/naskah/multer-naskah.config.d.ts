export declare const naskahFileFields: {
    name: string;
    maxCount: number;
}[];
export declare const naskahMulterOptions: {
    storage: import("multer").StorageEngine;
};
export type NaskahUploadedFiles = {
    file_draft_naskah?: Express.Multer.File[];
    file_profile_penulis?: Express.Multer.File[];
    file_surat_keaslian?: Express.Multer.File[];
};
