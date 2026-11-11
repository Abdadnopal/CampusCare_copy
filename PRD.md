# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## CampusCare – Sistem Pengaduan Fasilitas Kampus Terpadu

---

### Informasi Dokumen
| Atribut | Keterangan |
|---|---|
| **Nama Produk** | **CampusCare** |
| **Versi Produk** | 1.0 (Front-End Prototype Edition) |
| **Status** | Selesai / Siap Presentasi & Evaluasi |
| **Target Platform** | Web Browser (Desktop, Tablet, Mobile) |
| **Teknologi Utama** | HTML5, CSS3 Modern, JavaScript (React 19 + Vite 6 + React Router 7 + Lucide Icons) |
| **Kepatuhan Tugas** | Murni Front-End Interaktif (Tanpa Database & Backend Server) |

---

## 1. Latar Belakang & Pernyataan Masalah

### 1.1 Latar Belakang
Fasilitas perkuliahan seperti pendingin ruangan (AC), proyektor kelas, stopkontak, penerangan, kran air, dan furnitur merupakan sarana vital penunjang kenyamanan belajar mengajar di lingkungan kampus. Namun, proses pelaporan kerusakan sering kali menghadapi kendala:
- Pelaporan masih dilakukan secara konvensional atau pesan lisan kepada staf.
- Mahasiswa tidak memiliki sarana untuk memantau status atau progres tindak lanjut dari laporan yang telah diajukan.
- Kurangnya transparansi terhadap fasilitas publik yang sedang rusak maupun yang sedang diperbaiki.
- Tim Sarana & Prasarana (Sarpras) kesulitan mengelompokkan keluhan berdasarkan urgensi dan kategori fasilitas.

### 1.2 Solusi
**CampusCare** hadir sebagai platform web pelaporan fasilitas kampus berbasis Front-End yang intuitif, modern, dan transparan. Platform ini menjembatani mahasiswa sebagai pelapor fasilitas dengan tim Sarpras sebagai pihak penindak lanjut dalam satu alur terpadu.

---

## 2. Tujuan & Sasaran Produk (Goals & Objectives)

1. **Mempermudah Pelaporan:** Mahasiswa dapat mengajukan laporan kerusakan fasilitas kampus hanya dalam hitungan menit dengan antarmuka yang bersih dan terpandu.
2. **Transparansi Penanganan:** Menyediakan linimasa status (*Menunggu → Diproses → Selesai*) serta tanggapan resmi petugas secara terbuka.
3. **Sentralisasi Kelola Sarpras:** Memberikan panel dasbor bagi admin Sarpras untuk memfilter, mencari, dan memperbarui status laporan secara langsung.
4. **Kepatuhan Standar Tugas Front-End:**
   - Memenuhi standar teknologi HTML5, CSS3, dan JavaScript interaktif.
   - Menyediakan interaksi lengkap di sisi klien (*client-side state management* via React Context & LocalStorage) tanpa membutuhkan koneksi database eksternal.
   - Menerapkan desain modern (*Apple-inspired UI*), responsif di semua resolusi perangkat, dan berorientasi pengguna (*User-Centered Design*).

---

## 3. Persona Pengguna & Hak Akses (User Roles)

Aplikasi memiliki 3 kelompok pengguna utama:

| Peran (Role) | Karakteristik Pengguna | Kebutuhan Utama |
|---|---|---|
| **Tamu (Guest)** | Mahasiswa atau pengunjung yang belum login ke sistem. | Menjelajahi Landing Page, membaca informasi fasilitas, dan mengakses tombol Masuk/Daftar. |
| **Mahasiswa (User)** | Mahasiswa aktif kampus yang memiliki akun student. | Melihat feed aduan seluruh mahasiswa, membuat laporan baru (lengkap dengan foto & kategori kustom), melihat riwayat aduan pribadi, dan mengedit profil serta foto akun. |
| **Admin Sarpras (Admin)** | Staf atau teknisi bagian Sarana dan Prasarana kampus. | Memantau metrik aduan, memfilter & mencari laporan, mengubah status penanganan tiket, serta memberikan tanggapan resmi. |

### Matriks Hak Akses Pengguna
| Fitur / Halaman | Tamu | Mahasiswa | Admin Sarpras |
|---|:---:|:---:|:---:|
| Halaman Beranda (Landing Page) | ✅ | ✅ | ❌ *(Auto-redirect ke Admin Dashboard)* |
| Form Login & Registrasi | ✅ | ❌ | ❌ |
| Dashboard Mahasiswa (`/user`) | ❌ | ✅ | ❌ |
| Buat Pengaduan (`/user/create-complaint`) | ❌ | ✅ | ❌ |
| Pengaduan Saya (`/user/my-complaints`) | ❌ | ✅ | ❌ |
| Halaman Profil (`/user/profile`) | ❌ | ✅ | ❌ |
| Dashboard Admin (`/admin`) | ❌ | ❌ | ✅ |
| Detail Pengaduan (`/user/complaint/:id` & `/admin/complaint/:id`) | ❌ | ✅ *(Read-Only)* | ✅ *(Bisa ubah status & kirim tanggapan)* |

---

## 4. Alur Pengguna (User Flow)

```
[ Pengunjung / Tamu ]
        │
        ├──> Landing Page (/) ──> Klik "Mulai Laporkan"
        │                                  │
        └──> Halaman Login (/login) <──────┘
                 │
                 ├──> Login Mahasiswa ──> Dashboard Mahasiswa (/user)
                 │                             ├──> Feed Semua Aduan
                 │                             ├──> Buat Pengaduan Baru (/user/create-complaint)
                 │                             ├──> Riwayat Pengaduan Saya (/user/my-complaints)
                 │                             └──> Pengaturan Profil & Foto (/user/profile)
                 │
                 └──> Login Admin Sarpras ──> Dashboard Admin (/admin)
                                                   ├──> Filter & Live Search Aduan
                                                   ├──> Ubah Status Cepat (Dropdown Popover)
                                                   └──> Buka Detail Tiket & Kirim Tanggapan
```

---

## 5. Spesifikasi Kebutuhan Fungsional (Functional Requirements)

### Modul 1: Halaman Depan & Navigasi (Landing Page & Navigation)
- **FR-1.1:** Halaman depan (`/`) menampilkan *Hero Section* dengan judul *"Suaramu berarti, untuk kampus nyaman"*, subjudul, dan tombol Call-to-Action.
- **FR-1.2:** Menampilkan komponen mockup tiket laporan visual yang menggambarkan pratinjau pelaporan kepada calon pengguna.
- **FR-1.3:** Navbar pintar mendeteksi peran aktif (*Role-Aware Navigation*):
  - Tamu: Menampilkan menu Beranda, tombol Masuk, dan Daftar.
  - Mahasiswa: Menampilkan menu Beranda, Dashboard, Pengaduan Saya, tombol notifikasi, dan avatar profil.
  - Admin: Hanya menampilkan menu *Dashboard Admin*, tombol notifikasi, dan profil admin (menu Beranda dan Pengaduan disembunyikan).
- **FR-1.4:** Navigasi mobile (*drawer*) responsif yang muncul dengan tombol hamburger saat diakses pada layar smartphone/tablet.
- **FR-1.5:** Tombol lonceng notifikasi interaktif yang menampilkan tooltip *"Belum ada notifikasi baru"* tanpa memunculkan titik merah palsu (*anti-dark pattern*).

### Modul 2: Autentikasi Pengguna (Authentication)
- **FR-2.1:** Formulir login menyediakan **Tab Switcher** antara Mahasiswa dan Admin Sarpras.
- **FR-2.2:** Memiliki fitur *auto-fill demo credentials* saat tab dipilih guna mempermudah demonstrasi dan evaluasi tugas.
- **FR-2.3:** Fitur *toggle visibility password* (ikon mata) untuk melihat/menyembunyikan kata sandi.
- **FR-2.4:** Formulir registrasi mahasiswa baru dengan input Nama Lengkap, Email Student, Jenis Kelamin, No. Telepon, dan Password.
- **FR-2.5:** Validasi keamanan di sisi klien (*client-side validation*) untuk memastikan kelengkapan data.

### Modul 3: Profil Pengguna & Upload Foto (User Profile)
- **FR-3.1:** Halaman profil terpisah di `/user/profile` yang menampilkan seluruh biodata mahasiswa.
- **FR-3.2:** Pengguna dapat memperbarui Nama Lengkap, Email Student, Jenis Kelamin, dan Nomor Telepon melalui formulir.
- **FR-3.3 (Fitur Upload Foto Profil):**
  - Pengguna dapat memilih file gambar foto profil dari komputer/perangkat.
  - **Validasi Format:** Sistem hanya menerima ekstensi `.jpg`, `.jpeg`, `.png`, dan `.webp`.
  - **Validasi Ukuran:** File dibatasi maksimal **2 MB**. Jika melebihi batas, sistem menampilkan notifikasi peringatan penolakan file.
  - **Pratinjau Langsung (*Preview*):** Foto yang dipilih langsung tampil di layar sebelum disimpan.
  - **Hapus Foto:** Pengguna dapat menghapus foto dan kembali ke tampilan inisial nama.
- **FR-3.4:** Foto profil yang tersimpan otomatis tersinkronisasi ke avatar navbar, drawer menu mobile, dan header halaman.
- **FR-3.5:** Terdapat feedback visual berupa notifikasi alert hijau (*berhasil*) atau merah (*gagal*).

### Modul 4: Dashboard Mahasiswa (Student Dashboard)
- **FR-4.1:** Menampilkan ucapan sapaan waktu dinamis (*"Hallo selamat pagi/siang/sore/malam, [Nama]"*).
- **FR-4.2:** 4 Kartu Statistik data riil:
  - *Total pengaduan* (jumlah seluruh aduan).
  - *Menunggu* (aduan belum ditangani teknisi).
  - *Diproses* (aduan sedang dalam perbaikan).
  - *Selesai* (fasilitas telah berhasil diperbaiki).
- **FR-4.3:** Bagian *"Pengaduan terbaru"* menampilkan daftar pengaduan dari **seluruh mahasiswa** secara transparan, diurutkan dari yang terbaru.
- **FR-4.4:** Setiap kartu aduan menampilkan nama pelapor (`Pelapor: [Nama Mahasiswa]`) tanpa mengekspos kontak pribadi (email/nomor telepon).
- **FR-4.5:** Tombol ekspansi *"Lihat semua"* / *"Tampilkan lebih sedikit"* untuk membuka seluruh daftar pengaduan langsung di halaman dashboard.

### Modul 5: Formulir Buat Pengaduan (Create Complaint)
- **FR-5.1:** Menampilkan panduan 3 langkah pelaporan yang efektif (*Pilih lokasi, Ceritakan spesifik, Tambahkan foto*) dan kontak darurat kampus.
- **FR-5.2:** Input wajib (*mandatory fields*) ditandai dengan tanda bintang merah (`*`): Judul, Kategori, Lokasi, dan Deskripsi.
- **FR-5.3 (Custom Dropdown Kategori):**
  - Dropdown kategori kustom dengan styling rapi rata kiri penuh (*flush* di bawah field).
  - Pilihan kategori bawaan: *AC & ventilasi, Elektronik, Kelistrikan, Kebersihan, Furnitur, Fasilitas Umum, dan Lainnya*.
- **FR-5.4 (Kategori Dinamis "Lainnya"):**
  - Jika pengguna memilih opsi *"Lainnya"*, sistem memunculkan input teks tambahan *"Sebutkan kategori"*.
  - Field ini wajib diisi dengan batasan maksimal 50 karakter dan counter karakter real-time.
  - Kategori kustom tersimpan dan tampil di seluruh tiket laporan (*Contoh: "Lainnya (Pintu kelas rusak)"*).
- **FR-5.5 (Image Dropzone):**
  - Pengguna dapat mengunggah foto bukti fisik kerusakan fasilitas kampus (opsional) dengan fitur drag-and-drop atau file picker.
  - Dilengkapi tombol pratinjau dan hapus foto sebelum laporan dikirim.
- **FR-5.6:** Notifikasi toast sukses yang mengarahkan pengguna secara otomatis ke halaman detail laporan yang baru dibuat.

### Modul 6: Pengaduan Saya (Personal Complaints History)
- **FR-6.1:** Halaman `/user/my-complaints` menggunakan layout **1 kolom penuh** yang fokus pada riwayat pelaporan pribadi.
- **FR-6.2:** Menampilkan **hanya** pengaduan yang diajukan oleh akun mahasiswa yang sedang login.
- **FR-6.3:** Menampilkan status badge penanganan (*Menunggu, Diproses, Selesai*), tahapan teknisi, lokasi, dan tanggal laporan.
- **FR-6.4:** Dilengkapi tampilan status kosong (*empty state card*) jika pengguna belum pernah mengajukan aduan, lengkap dengan tombol langsung ke formulir pelaporan.

### Modul 7: Panel Dashboard Admin Sarpras (Admin Management Dashboard)
- **FR-7.1:** 5 Kartu Metrik Sarpras: *Total pengaduan, Menunggu, Diproses, Selesai, dan Pengguna terdaftar*.
- **FR-7.2 (Filter Status):** Tab pill filter interaktif untuk menyaring laporan berdasarkan status (*Semua, Menunggu, Diproses, Selesai*) beserta angka hitungan masing-masing.
- **FR-7.3 (Pencarian Real-Time):** Input pencarian instan yang memfilter tabel berdasarkan judul pengaduan, kode tiket `#CC-XXXX`, nama pelapor, atau lokasi fasilitas.
- **FR-7.4 (Tabel Pengaduan):** Menampilkan rincian tiket, nama pelapor, tanggal, status badge, dan kolom aksi cepat.
- **FR-7.5 (Aksi Ubah Status):** Menu dropdown popover di setiap baris tabel yang memungkinkan admin mengubah status pengaduan secara instan (*Menunggu → Diproses → Selesai*).
- **FR-7.6 (Pagination):** Pengaturan halaman tabel data agar tidak memanjang ke bawah.
- **FR-7.7 (Proteksi Rute Admin):**
  - Admin yang mengakses URL `/` (Beranda) otomatis dialihkan ke `/admin`.
  - Admin yang mengakses URL `/admin/complaints` otomatis dialihkan ke `/admin`.

### Modul 8: Detail Pengaduan & Tanggapan Petugas (Complaint Detail & Timeline)
- **FR-8.1:** Halaman detail menampilkan kode unik pengaduan (`#CC-0248`), foto dokumentasi kerusakan, deskripsi masalah, lokasi ruangan, dan tanggal lapor.
- **FR-8.2 (Linimasa Progres 3 Tahap):**
  - Tahap 01: *Laporan diterima*
  - Tahap 02: *Dalam penanganan* (Teknisi ditugaskan)
  - Tahap 03: *Selesai* (Fasilitas kembali nyaman)
- **FR-8.3 (Kolom Tanggapan Resmi Sarpras):**
  - Mahasiswa dapat membaca tanggapan atau instruksi resmi dari tim teknis.
  - Admin Sarpras memiliki form untuk mengetikkan, mengirimkan, dan memperbarui tanggapan resmi.
- **FR-8.4 (Kontrol Status Admin):** Panel tombol pilihan status di sisi kanan untuk memperbarui status tiket secara langsung.

---

## 6. Spesifikasi Kebutuhan Non-Fungsional (Non-Functional Requirements)

1. **User Interface & Desain Visual:**
   - Mengusung gaya modern terinspirasi estetika Apple (*clean layout, rounded corners, subtle shadows, border-subtle*).
   - Palet warna: Biru Utama (`#0071E3`), Latar Belakang Bersih (`#F8FAFC` / `#FFFFFF`), Status Warning (`#F59E0B`), Status Info (`#0284C7`), Status Success (`#10B981`).
   - Tipografi: Font sans-serif modern berlisensi terbuka (*Plus Jakarta Sans / Inter / system-ui*).
2. **Responsivitas (Cross-Device Support):**
   - Mendukung penuh tampilan Desktop (1200px+), Laptop (992px - 1199px), Tablet (768px - 991px), dan Smartphone (< 768px).
   - Navigasi menyesuaikan secara otomatis menjadi hamburger drawer menu pada layar kecil.
3. **Privasi & Keamanan Data Mahasiswa:**
   - Data kontak pribadi mahasiswa lain (email dan no. telepon) tidak diekspos di feed publik dashboard. Hanya nama pelapor yang ditampilkan untuk keperluan identifikasi pengaduan.
4. **Performa & Standar Kode:**
   - Waktu build produksi Vite sangat cepat (< 7 detik).
   - Zero-dependency terhadap database server (menggunakan React State, React Context, dan LocalStorage sebagai media penyimpanan lokal peramban).

---

## 7. Model Data Sisi Klien (Client-Side Data Schema)

### 7.1 Objek Pengguna (User Entity)
```typescript
interface User {
  id: string;              // Contoh: "user-001" atau "admin-001"
  email: string;           // Contoh: "beruang@paramadina.ac.id"
  full_name: string;       // Contoh: "Bas Rocker"
  role: 'user' | 'admin';  // Peran akses pengguna
  gender: 'Laki-Laki' | 'Perempuan';
  phone: string;           // Contoh: "08123456789"
  avatar: string;          // Data URL (Base64) foto profil
  password?: string;       // Kata sandi akun demo
}
```

### 7.2 Objek Pengaduan (Complaint Entity)
```typescript
interface Complaint {
  id: string;                 // Contoh: "comp-0248"
  complaint_code: string;     // Contoh: "#CC-0248"
  user_id: string;            // ID pelapor pembuat aduan
  reporter_name: string;      // Nama lengkap mahasiswa pelapor
  reporter_role: string;      // Label peran: "Mahasiswa"
  title: string;              // Judul keluhan fasilitas
  category: string;           // Kategori fasilitas (termasuk "Lainnya (...)")
  custom_category?: string;   // Teks kategori kustom jika memilih Lainnya
  location: string;           // Rincian gedung, lantai, dan nomor ruangan
  description: string;        // Penjelasan kendala kerusakan fasilitas
  photo_url: string;          // Data URL (Base64) foto dokumentasi bukti
  status: 'menunggu' | 'diproses' | 'selesai';
  status_step: 1 | 2 | 3;
  timeline: Array<{
    step: string;             // "01", "02", "03"
    title: string;            // Nama tahapan progres
    date: string | null;      // Tanggal tahapan selesai
    note: string;             // Keterangan status progres
  }>;
  admin_response: {
    author: string;           // Nama admin penanggap
    date: string;             // Waktu penyerahan tanggapan
    message: string;          // Isi pesan resmi tindak lanjut
  } | null;
  created_at: string;         // ISO timestamp
  updated_at: string;         // ISO timestamp
}
```

---

## 8. Skenario Pengujian Sistem (Test Cases / QA Guide)

| ID Uji | Fitur yang Diuji | Langkah Pengujian | Hasil yang Diharapkan |
|---|---|---|---|
| **TC-01** | Login Role Switcher | Buka `/login`, klik tab "Mahasiswa" lalu tab "Admin". | Kredensial demo otomatis terisi sesuai peran tanpa perlu mengetik manual. |
| **TC-02** | Proteksi Akses Admin | Login sebagai Admin Sarpras, lalu ketik `/` atau `/admin/complaints` di browser. | Sistem otomatis mengalihkan (*redirect*) URL kembali ke `/admin`. |
| **TC-03** | Custom Dropdown Kategori | Buka `/user/create-complaint`, klik dropdown Kategori. | Menu opsi terbuka rata kiri di bawah field tanpa melayang ke tengah. |
| **TC-04** | Kategori Dinamis "Lainnya" | Pada form buat aduan, pilih kategori *"Lainnya"*. | Input tambahan *"Sebutkan kategori"* langsung muncul dan bersifat wajib diisi. |
| **TC-05** | Feed Semua Aduan | Login sebagai Mahasiswa, buka `/user`. | Menampilkan aduan dari seluruh mahasiswa lengkap dengan identitas pelapor. |
| **TC-06** | Pengaduan Saya (1 Kolom) | Buka `/user/my-complaints`. | Halaman tampil 1 kolom bersih, hanya berisi aduan milik akun yang login. |
| **TC-07** | Upload Foto Profil (Valid) | Buka `/user/profile`, klik "Ganti foto", pilih file PNG/JPG berukuran < 2 MB, lalu simpan. | Foto terunggah, muncul preview, notifikasi hijau sukses, dan avatar navbar berganti. |
| **TC-08** | Validasi File Foto (> 2 MB) | Buka `/user/profile`, pilih file gambar dengan ukuran di atas 2 MB. | Sistem menolak file dan memunculkan notifikasi error merah bahwa file melebihi 2 MB. |
| **TC-09** | Live Search & Filter Admin | Buka `/admin`, ketik nama pelapor / klik filter *"Menunggu"*. | Tabel hanya menampilkan baris aduan yang sesuai filter secara instan. |
| **TC-10** | Ubah Status Pengaduan | Pada tabel admin, klik tombol *"Ubah status"*, pilih *"Selesai"*. | Status aduan dan badge langsung berubah menjadi "Selesai" warna hijau. |

---

## 9. Akun Pengujian Demo (Pre-configured Credentials)

| Peran Akun | Email | Kata Sandi | Deskripsi Penggunaan |
|---|---|---|---|
| **Mahasiswa Utama** | `beruang@paramadina.ac.id` | `password123` | Akun demo mahasiswa untuk membuat laporan, melihat aduan pribadi, dan ganti foto profil. |
| **Mahasiswa 2** | `alya@paramadina.ac.id` | `password123` | Akun mahasiswa kedua (digunakan untuk verifikasi feed multi-pengguna). |
| **Mahasiswa 3** | `nadia@paramadina.ac.id` | `password123` | Akun mahasiswa ketiga. |
| **Admin Sarpras** | `admin@kampus.ac.id` | `admin123` | Akun petugas Sarana & Prasarana untuk mengelola tabel, mengubah status, dan membalas aduan. |

---

*Dokumen PRD ini disusun sebagai acuan teknis pengembangan antarmuka, pembagian tugas kelompok, dan panduan presentasi sistem **CampusCare**.*

