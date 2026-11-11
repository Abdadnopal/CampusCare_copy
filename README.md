# CampusCare
> **Sistem Pengaduan Fasilitas Kampus Terpadu**  
> *"Peduli Fasilitas, Nyaman Beraktivitas"*

---

## 📌 Deskripsi Proyek
**CampusCare** adalah aplikasi web Front-End interaktif yang dirancang untuk mempermudah mahasiswa dalam melaporkan keluhan atau kerusakan fasilitas kampus (seperti AC, kelistrikan, proyektor, furnitur, kebersihan, dan fasilitas umum lainnya). Aplikasi ini juga menyediakan panel dasbor khusus bagi tim Sarana & Prasarana (Sarpras) untuk memantau status perbaikan, memperbarui status tiket secara instan, dan memberikan tanggapan resmi secara langsung.

Proyek ini dibangun sesuai dengan ketentuan tugas pembuatan **Front-End Interaktif**:
1. **Teknologi**: Menggunakan HTML5, CSS3 kustom modern, dan JavaScript (React 19 + Vite 6 + React Router 7 + Lucide Icons).
2. **Kelengkapan Fitur**: Menyediakan interaksi lengkap pada seluruh alur pengguna (Mahasiswa & Admin Sarpras) secara mandiri di sisi klien (*client-side*) menggunakan React State, React Context, dan LocalStorage tanpa ketergantungan database eksternal.
3. **Desain UI/UX**:
   - **Menarik & Konsisten**: Tata letak rapi terinspirasi estetika desain modern (*Apple-inspired UI*), tipografi bersih (*Plus Jakarta Sans*), dan palet warna biru-putih yang nyaman di mata.
   - **Intuitif**: Navigasi responsif dengan umpan balik visual (*status badge*, linimasa progres laporan, dan dialog notifikasi).
   - **Responsif**: Tampilan otomatis menyesuaikan layar Desktop, Tablet, hingga Smartphone.

---

## 🚀 Fitur Utama Antarmuka (Versi Terbaru)

| No | Modul / Halaman | Penjelasan Tampilan & Interaksi |
|:--:|---|---|
| 1 | **Landing Page (`/`)** | Halaman depan interaktif dengan *hero section*, preview mockup laporan keluhan, dan tombol ajakan bertindak (*Call to Action*). |
| 2 | **Autentikasi (`/login` & `/register`)** | Tab login cepat untuk Mahasiswa dan Admin Sarpras dengan fitur *auto-fill* akun demo, intip password (*show/hide*), serta formulir registrasi mahasiswa baru. |
| 3 | **Dashboard Mahasiswa (`/user`)** | Sapaan ramah dinamis berbasis waktu, 4 kartu statistik data riil, feed laporan dari **seluruh mahasiswa** dilengkapi nama pelapor, serta tombol ekspansi *"Lihat semua"* / *"Tampilkan lebih sedikit"*. |
| 4 | **Formulir Buat Pengaduan (`/user/create-complaint`)** | Dilengkapi panduan pelaporan 3 langkah, kontak darurat kampus, **Custom Dropdown Kategori** (rapi rata kiri penuh), **Kategori Dinamis "Lainnya"** dengan input teks tambahan kustom (maks. 50 karakter), dan komponen *Image Dropzone* foto kerusakan. |
| 5 | **Pengaduan Saya (`/user/my-complaints`)** | Layout satu kolom penuh khusus menampilkan riwayat laporan yang diajukan oleh akun mahasiswa yang sedang login, lengkap dengan indikator tahapan teknisi dan *empty state*. |
| 6 | **Profil Pengguna (`/user/profile`)** | Halaman baru pengelolaan biodata diri mahasiswa dengan **Fitur Upload Foto Profil**: validasi tipe file (JPG, PNG, WEBP), validasi ukuran maksimal 2 MB, preview instan, tombol hapus foto, serta sinkronisasi otomatis ke avatar navbar. |
| 7 | **Dashboard Admin Sarpras (`/admin`)** | Panel kontrol terpusat tim Sarpras dengan 5 kartu metrik, tab filter status aduan (*Semua, Menunggu, Diproses, Selesai*), pencarian langsung (*live search*), tabel ber-paginasi, dan popover aksi cepat *"Ubah status"*. |
| 8 | **Detail Pengaduan (`/user/complaint/:id` & `/admin/complaint/:id`)** | Rincian komprehensif tiket `#CC-XXXX`: foto bukti, deskripsi, linimasa progres 3 tahap (*01 Laporan Diterima → 02 Dalam Penanganan → 03 Selesai*), kontrol status admin, dan formulir tanggapan resmi tim Sarpras. |
| 9 | **Smart Navbar & Proteksi Rute** | Navigasi pintar mendeteksi peran pengguna: Admin Sarpras hanya memiliki akses ke Dashboard Admin (menu Beranda & Pengaduan disembunyikan), redirect otomatis admin dari URL `/` atau `/admin/complaints` kembali ke `/admin`, dropdown profil pengguna, dan mobile drawer menu. |

---

## 🔑 Akun Uji Coba (Demo Credentials)

Untuk keperluan pengujian dan presentasi, aplikasi telah dilengkapi akun bawaan yang dapat langsung digunakan pada halaman **Login**:

| Peran (Role) | Nama Lengkap | Email | Kata Sandi | Hak Akses Utama |
|---|---|---|---|---|
| **Mahasiswa** | Bas Rocker | `beruang@paramadina.ac.id` | `password123` | Melihat feed aduan, membuat laporan aduan, melihat aduan pribadi, dan upload foto profil. |
| **Mahasiswa 2** | Alya Putri | `alya@paramadina.ac.id` | `password123` | Akun pembanding untuk pengujian feed aduan multi-pengguna. |
| **Mahasiswa 3** | Nadia Putri | `nadia@paramadina.ac.id` | `password123` | Akun pembanding pengaduan kelistrikan. |
| **Admin Sarpras** | Dimas Pratama | `admin@kampus.ac.id` | `admin123` | Mengubah status aduan, memfilter/mencari aduan, dan memberikan tanggapan resmi petugas. |

> **Tips Presentasi:** Pada halaman login, cukup klik tab **"Mahasiswa"** atau **"Admin"** untuk mengisi email dan kata sandi secara otomatis tanpa mengetik manual.

---

## 📁 Struktur Berkas Proyek

```
CampusCare_copy/
├── public/                     # Aset publik (favicon & ikon)
├── src/
│   ├── assets/                 # Gambar latar, logo, dan foto pendukung
│   ├── components/             # Komponen UI reusable
│   │   ├── ComplaintCard.jsx   # Kartu pengaduan (dengan nama pelapor & status)
│   │   ├── ImageDropzone.jsx   # Komponen upload foto aduan
│   │   ├── LoadingState.jsx    # Indikator loading
│   │   ├── Logo.jsx            # Brand logo CampusCare
│   │   ├── Navbar.jsx          # Navigasi utama (role-aware & mobile drawer)
│   │   ├── ProtectedRoute.jsx  # Pelindung rute berdasarkan peran pengguna
│   │   ├── StatCard.jsx        # Kartu statistik metrik
│   │   └── StatusBadge.jsx     # Badge status warna (Menunggu, Diproses, Selesai)
│   ├── context/                # Pengelola state aplikasi (Client-Side)
│   │   ├── AuthContext.jsx     # State autentikasi sesi, profil, & foto akun
│   │   └── ComplaintContext.jsx# State pengaduan, penambahan aduan, status, & respon
│   ├── lib/                    # Helper & data inisial
│   │   ├── complaints.js       # Generator kode tiket (#CC-XXXX)
│   │   ├── formatDate.js       # Formatter tanggal lokal Bahasa Indonesia
│   │   └── mockData.js         # Kumpulan data bawaan & kategori fasilitas
│   ├── pages/                  # Halaman aplikasi
│   │   ├── admin/
│   │   │   ├── Complaints.jsx  # Halaman arsip kelola pengaduan
│   │   │   └── Dashboard.jsx   # Dashboard utama Admin Sarpras (Filter, Search, Tabel, Aksi)
│   │   ├── user/
│   │   │   ├── CreateComplaint.jsx # Form buat aduan (Custom dropdown & opsi "Lainnya")
│   │   │   ├── Dashboard.jsx   # Dashboard Mahasiswa (Feed semua aduan & metrik)
│   │   │   ├── MyComplaints.jsx# Halaman aduan pribadi mahasiswa (Layout 1 kolom)
│   │   │   └── Profile.jsx     # Halaman profil & upload foto profil (Validasi 2 MB)
│   │   ├── ComplaintDetail.jsx # Halaman rincian tiket & tanggapan petugas
│   │   ├── Landing.jsx         # Landing page beranda utama
│   │   ├── Login.jsx           # Halaman masuk (Role switcher tab)
│   │   └── Register.jsx        # Halaman pendaftaran mahasiswa baru
│   ├── styles/
│   │   └── index.css           # Desain sistem tokens, styling Apple-inspired, & responsivitas
│   ├── App.jsx                 # Routing rute aplikasi & proteksi akses
│   └── main.jsx                # Entry point aplikasi React
├── .gitignore
├── index.html                  # Dokumen HTML5 utama
├── package.json                # Informasi proyek & dependensi
├── PRD.md                      # Product Requirements Document lengkap
├── README.md                   # Dokumentasi proyek
└── vite.config.js              # Konfigurasi Vite builder
```

---

## 💻 Panduan Menjalankan Aplikasi

Pastikan [Node.js](https://nodejs.org/) (versi 18 ke atas) telah terpasang di komputer Anda.

1. **Buka terminal dan arahkan ke direktori proyek**:
   ```bash
   cd CampusCare_copy
   ```

2. **Pasang dependensi proyek** (jika belum):
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan lokal**:
   ```bash
   npm run dev
   ```

4. Buka alamat lokal yang tertera di terminal (biasanya `http://localhost:5173`) pada peramban web (*Google Chrome, Edge, Safari, Firefox*).

5. **Uji Build Produksi** (opsional):
   ```bash
   npm run build
   ```

---

## 📋 Dokumen Kebutuhan Produk (PRD)

Dokumen spesifikasi teknis lengkap, matriks hak akses, diagram alur sistem, dan skenario pengujian (*test cases*) tersedia di file:  
👉 **[`PRD.md`](./PRD.md)**

---

*Dibuat dengan dedikasi untuk kenyamanan fasilitas perkuliahan kampus.*
