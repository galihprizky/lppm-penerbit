export class UserResponseDto {
  id!: number;
  nip!: string | null;
  email!: string;
  nama!: string;
  no_hp!: string | null;
  jurusan_id!: number | null;
  is_active!: boolean;
  created_at!: Date;
  updated_at!: Date;
  roles!: RoleResponseDto[];
  jurusan!: JurusanResponseDto | null;
}

export class RoleResponseDto {
  id!: number;
  nama_role!: string;
  deskripsi!: string | null;
}

export class JurusanResponseDto {
  id!: number;
  fakultas_id!: number;
  kode_fakultas!: string;
  nama_fakultas!: string;
  kode_jurusan!: string;
  nama_jurusan!: string;
}