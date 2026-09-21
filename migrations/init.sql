-- migrations/init.sql

CREATE TABLE fakultas (
  id SERIAL PRIMARY KEY,
  kode_fakultas VARCHAR(10) NOT NULL UNIQUE,
  nama_fakultas VARCHAR(150) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE jurusan (
  id SERIAL PRIMARY KEY,
  fakultas_id INT NOT NULL REFERENCES fakultas(id) ON DELETE CASCADE,
  kode_jurusan VARCHAR(10) NOT NULL UNIQUE,
  nama_jurusan VARCHAR(150) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ
);

-- Table users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nip VARCHAR(20) UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  nama VARCHAR(150) NOT NULL,
  password VARCHAR(255) NOT NULL,
  no_hp VARCHAR(20),
  jurusan_id INT REFERENCES jurusan(id),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  nama_role VARCHAR(50) NOT NULL,
  deskripsi VARCHAR(255)
);

CREATE TABLE user_roles (
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- Enum untuk jurusan
CREATE TYPE jurusan_enum AS ENUM (
  'Informatika',
  'Sistem Informasi',
  'Teknik Elektro',
  'Manajemen'
);

-- Table data_mhs
CREATE TABLE data_mhs (
  id SERIAL PRIMARY KEY,
  nim VARCHAR(20) NOT NULL UNIQUE,
  nama VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  jurusan jurusan_enum,
  tanggal_lahir DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE jenis_buku_enum AS ENUM (
  'Buku Referensi',
  'Buku Ajar'
);

CREATE TYPE warna_isi_enum AS ENUM (
  'Hitam Putih',
  'Hitam Putih dan Berwarna',
  'Full Color'
);

CREATE TYPE status_cover_enum AS ENUM (
  'Sudah',
  'Belum'
);

CREATE TYPE status_naskah_enum AS ENUM (
  'SUBMITTED',
  'PENDING_LPPM',
  'UNDER_REVIEW',
  'REVISION_REQUIRED',
  'APPROVED_FOR_EDIT',
  'IN_EDITING',
  'READY_TO_PRINT',
  'PUBLISHED',
  'REJECTED'
);

CREATE TABLE naskah (
  id SERIAL PRIMARY KEY,
  pengusul_id INT NOT NULL REFERENCES users(id),
  judul_naskah VARCHAR(255) NOT NULL,
  sinopsis TEXT NOT NULL,
  jenis_buku jenis_buku_enum NOT NULL,
  target_pembaca TEXT[] NOT NULL,
  nama_semua_penulis TEXT NOT NULL,
  warna_isi_buku warna_isi_enum NOT NULL,
  pake_editor_pribadi BOOLEAN NOT NULL,
  status_cover status_cover_enum NOT NULL,
  status_saat_ini status_naskah_enum NOT NULL DEFAULT 'SUBMITTED',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE penugasan_reviewer (
    id SERIAL PRIMARY KEY,
    naskah_id INT NOT NULL REFERENCES naskah(id) ON DELETE CASCADE,
    reviewer_id INT NOT NULL REFERENCES users(id),
    ditunjuk_oleh INT NOT NULL REFERENCES users(id),  -- Admin LPPM yang menunjuk

    deadline_review DATE NOT NULL,
    status_penugasan VARCHAR(30) DEFAULT 'PENDING',  -- 'PENDING', 'ACCEPTED', 'COMPLETED', 'DECLINED'

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE tahap_versi_enum AS ENUM (
  'DRAFT_AWAL',
  'REVISI_DOSEN',
  'DRAFT_LAYOUT_EDITOR',
  'FINAL_SIAP_CETAK'
);

CREATE TABLE versi_naskah (
    id SERIAL PRIMARY KEY,
    naskah_id INT NOT NULL REFERENCES naskah(id) ON DELETE CASCADE,
    uploaded_by INT NOT NULL REFERENCES users(id),

    tahap tahap_versi_enum NOT NULL,
    versi_ke INT NOT NULL DEFAULT 1,                 -- 1, 2, 3 (Track riwayat revisi)

    -- Path/URL File Storage (Google Drive / S3 / Local)
    file_draft_naskah VARCHAR(500) NOT NULL,
    file_profile_penulis VARCHAR(500),
    file_surat_keaslian VARCHAR(500),

    catatan_perubahan TEXT,                          -- Ringkasan revisi dari pengunggah
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);