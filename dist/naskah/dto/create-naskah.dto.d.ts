export declare enum JenisBukuEnum {
    BUKU_REFERENSI = "Buku Referensi",
    BUKU_AJAR = "Buku Ajar"
}
export declare enum TargetPembacaEnum {
    MAHASISWA = "Mahasiswa",
    AKADEMISI = "Akademisi",
    UMUM = "Umum"
}
export declare enum WarnaIsiEnum {
    HITAM_PUTIH = "Hitam Putih",
    HITAM_PUTIH_DAN_BERWARNA = "Hitam Putih dan Berwarna",
    FULL_COLOR = "Full Color"
}
export declare enum StatusCoverEnum {
    SUDAH = "Sudah",
    BELUM = "Belum"
}
export declare enum StatusNaskahEnum {
    SUBMITTED = "SUBMITTED",
    PENDING_LPPM = "PENDING_LPPM",
    UNDER_REVIEW = "UNDER_REVIEW",
    REVISION_REQUIRED = "REVISION_REQUIRED",
    APPROVED_FOR_EDIT = "APPROVED_FOR_EDIT",
    IN_EDITING = "IN_EDITING",
    READY_TO_PRINT = "READY_TO_PRINT",
    PUBLISHED = "PUBLISHED",
    REJECTED = "REJECTED"
}
export declare class CreateNaskahDto {
    pengusul_id: number;
    judul_naskah: string;
    sinopsis: string;
    jenis_buku: JenisBukuEnum;
    target_pembaca: TargetPembacaEnum[];
    nama_semua_penulis: string;
    warna_isi_buku: WarnaIsiEnum;
    pake_editor_pribadi: boolean;
    status_cover: StatusCoverEnum;
    status_saat_ini?: StatusNaskahEnum;
    catatan_perubahan?: string;
}
