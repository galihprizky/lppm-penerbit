export declare enum Jurusan {
    INFORMATIKA = "Informatika",
    SISTEM_INFORMASI = "Sistem Informasi",
    TEKNIK_ELEKTRO = "Teknik Elektro",
    MANAJEMEN = "Manajemen"
}
export declare class CreateMahasiswaDto {
    nim: string;
    nama?: string;
    email?: string;
    jurusan?: Jurusan;
    tanggal_lahir?: string;
}
