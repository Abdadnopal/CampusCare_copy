# CampusCare
> **Aplikasi Pelaporan Fasilitas Kampus Terpadu**  
> *"Peduli Fasilitas, Nyaman Beraktivitas"*

---

## 📌 Deskripsi Proyek
**CampusCare** adalah aplikasi web Front-End yang dirancang untuk mempermudah mahasiswa dalam melaporkan keluhan atau kerusakan fasilitas kampus (seperti AC, kelistrikan, proyektor, furnitur, kebersihan, dan fasilitas umum lainnya). Aplikasi ini juga menyediakan panel antarmuka bagi tim Sarana & Prasarana (Sarpras) untuk memantau status perbaikan dan memberikan tanggapan resmi secara langsung.

Proyek ini dibangun sesuai dengan ketentuan tugas pembuatan **Front-End Interaktif**:
1. **Teknologi**: Menggunakan HTML5, CSS3 kustom modern, dan JavaScript (React + Vite).
2. **Kelengkapan Fitur**: Menyediakan interaksi lengkap pada seluruh alur pengguna (Mahasiswa & Admin Sarpras) secara mandiri di sisi klien (*client-side*).
3. **Desain UI/UX**:
   - **Menarik & Konsisten**: Tata letak rapi dengan inspirasi desain modern (*Apple-inspired UI*), tipografi bersih (*Plus Jakarta Sans*), dan palet warna yang nyaman di mata.
   - **Intuitif**: Navigasi responsif dengan umpan balik visual (*status badge*, linimasa progres laporan, dan dialog konfirmasi).
   - **Responsif**: Tampilan otomatis menyesuaikan layar Desktop, Tablet, hingga Smartphone.

---

## 🚀 Fitur Utama Antarmuka

| No | Fitur | Penjelasan Tampilan & Interaksi |
|----|-------|---------------------------------|
| 1 | **Landing Page** | Halaman depan interaktif dengan *hero section*, preview mockup laporan, dan tombol ajakan bertindak (*Call to Action*). |
| 2 | **Autentikasi (Masuk & Daftar)** | Tab login fleksibel untuk Mahasiswa dan Admin Sarpras, serta formulir registrasi akun mahasiswa baru dengan validasi data di sisi klien. |
| 3 | **Dashboard Mahasiswa** | Kartu statistik personal (Total Laporan, Menunggu, Diproses, Selesai), tombol cepat *+ Buat Pengaduan*, dan riwayat laporan terbaru. |
| 4 | **Formulir Buat Pengaduan** | Formulir 3 langkah intuitif dilengkapi pemilihan kategori fasilitas, rincian lokasi ruangan, deskripsi masalah, dan komponen *Image Dropzone* untuk pratinjau foto keluhan. |
| 5 | **Pengaduan Saya & Profil** | Daftar seluruh laporan yang diajukan oleh pengguna beserta kartu identitas profil mahasiswa yang dapat diedit langsung. |
| 6 | **Detail Pengaduan & Linimasa** | Rincian tiket `#CC-XXXX` yang mencakup foto kerusakan, deskripsi, linimasa progres 3 tahap (*01 Laporan Diterima → 02 Dalam Penanganan → 03 Selesai*), dan kolom tanggapan resmi petugas. |
| 7 | **Dashboard & Panel Admin** | Panel kontrol tim Sarpras kampus dengan metrik ringkasan, filter status aduan (*Semua, Menunggu, Diproses, Selesai*), pencarian langsung (*live search*), tombol pengubah status, dan form tanggapan admin. |
| 8 | **Navigasi Responsif** | Navbar pintar dengan deteksi peran aktif (*Role-Aware Navigation*), profil dropdown, dan menu drawer di perangkat seluler (Mobile). |

---

## 🔑 Akun Uji Coba (Demo)

Untuk keperluan pengujian dan presentasi, aplikasi telah dilengkapi akun bawaan yang dapat langsung digunakan pada halaman **Login**:

| Peran (Role) | Nama Lengkap | Email | Kata Sandi |
|--------------|--------------|-------|------------|
| **Mahasiswa** | Bas Rocker | `beruang@paramadina.ac.id` | `password123` |
| **Mahasiswa** | Alya Putri | `alya@paramadina.ac.id` | `password123` |
| **Admin Sarpras** | Dimas Pratama | `admin@kampus.ac.id` | `admin123` |

*(Pada halaman login, Anda cukup mengklik tab **Mahasiswa** atau **Admin** untuk mengisi email dan kata sandi secara otomatis).*

---

## 📁 Struktur Berkas

```
campuscare/
├── public/
│   ├── favicon.png
│   └── favicon.svg
├── src/
│   ├── assets/                # Gambar latar, logo, dan foto pendukung
│   ├── components/            # Komponen UI (Navbar, Card, Badge, Dropzone, dll.)
│   ├── context/               # Manajemen state Front-End (Auth & Aduan)
│   ├── lib/                   # Data statis awal & helper format tanggal
│   ├── pages/
│   │   ├── admin/             # Tampilan panel Admin (Dashboard & Kelola Aduan)
│   │   ├── user/              # Tampilan Mahasiswa (Dashboard, Buat Aduan, Aduan Saya)
│   │   ├── ComplaintDetail.jsx# Halaman detail tiket pengaduan
│   │   ├── Landing.jsx        # Halaman awal (Landing page)
│   │   ├── Login.jsx          # Halaman masuk
│   │   └── Register.jsx       # Halaman pendaftaran
│   ├── styles/
│   │   └── index.css          # Desain sistem tokens, warna, dan responsivitas
│   ├── App.jsx                # Routing & layout aplikasi
│   └── main.jsx               # Entry point React
├── .gitignore
├── index.html                 # Dokumen HTML5 utama
├── package.json
└── vite.config.js
```

---

## 💻 Cara Menjalankan Aplikasi

Pastikan [Node.js](https://nodejs.org/) telah terpasang di komputer Anda.

1. **Buka folder proyek di terminal**:
   ```bash
   cd CampusCare_copy
   ```

2. **Pasang dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan**:
   ```bash
   npm run dev
   ```

4. Buka tautan lokal yang ditampilkan di terminal (biasanya `http://localhost:5173`) pada peramban web (*browser*).
