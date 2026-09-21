import { JenisBukuEnum, StatusCoverEnum, StatusNaskahEnum, TargetPembacaEnum, WarnaIsiEnum } from './create-naskah.dto';
export declare class UpdateNaskahDto {
    pengusul_id?: number;
    judul_naskah?: string;
    sinopsis?: string;
    jenis_buku?: JenisBukuEnum;
    target_pembaca?: TargetPembacaEnum[];
    nama_semua_penulis?: string;
    warna_isi_buku?: WarnaIsiEnum;
    pake_editor_pribadi?: boolean;
    status_cover?: StatusCoverEnum;
    status_saat_ini?: StatusNaskahEnum;
}
