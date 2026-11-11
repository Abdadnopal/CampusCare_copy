// Mock & Seed Data matching UI/UX design references
import sampleAcPhoto from '../assets/sample-ac-rusak.jpg'

export const DEFAULT_USERS = [
  {
    id: 'user-001',
    email: 'beruang@paramadina.ac.id',
    full_name: 'Bas Rocker',
    role: 'user',
    gender: 'Laki-Laki',
    phone: '0868686868',
    avatar: '',
    password: 'password123'
  },
  {
    id: 'user-002',
    email: 'alya@paramadina.ac.id',
    full_name: 'Alya Putri',
    role: 'user',
    gender: 'Perempuan',
    phone: '081234567890',
    avatar: '',
    password: 'password123'
  },
  {
    id: 'user-003',
    email: 'nadia@paramadina.ac.id',
    full_name: 'Nadia Putri',
    role: 'user',
    gender: 'Perempuan',
    phone: '085712345678',
    avatar: '',
    password: 'password123'
  },
  {
    id: 'admin-001',
    email: 'admin@kampus.ac.id',
    full_name: 'Dimas Pratama',
    role: 'admin',
    gender: 'Laki-Laki',
    phone: '081198765432',
    avatar: '',
    password: 'admin123'
  }
]

export const CATEGORIES = [
  'AC & ventilasi',
  'Elektronik',
  'Kelistrikan',
  'Kebersihan',
  'Furnitur',
  'Fasilitas Umum',
  'Lainnya'
]

export const INITIAL_COMPLAINTS = [
  {
    id: 'comp-0248',
    complaint_code: '#CC-0248',
    user_id: 'user-002',
    reporter_name: 'Alya Putri',
    reporter_role: 'Mahasiswa',
    title: 'AC ruang kuliah tidak dingin',
    category: 'AC & ventilasi',
    location: 'Gedung B · Lantai 2 · Ruang 204',
    description: 'AC menyala, tetapi ruangan tetap terasa panas. Kendala ini terasa sejak perkuliahan pagi pada 9 November 2026.\n\nSuhu sudah diatur ke 18°C dan mode pendinginan aktif, tetapi udara yang keluar tidak dingin. Kondisi ini membuat kegiatan belajar di ruang 204 kurang nyaman.\n\nMohon bantuan tim Sarpras untuk memeriksa unit AC agar ruang kuliah dapat digunakan dengan nyaman kembali.',
    photo_url: sampleAcPhoto,
    status: 'diproses',
    status_step: 2, // 1: diterima, 2: dalam penanganan, 3: selesai
    timeline: [
      { step: '01', title: 'Laporan diterima', date: '9 Nov 2026', note: 'Menunggu tinjauan tim Sarpras' },
      { step: '02', title: 'Dalam penanganan', date: '10 Nov 2026', note: 'Tim teknis ditugaskan' },
      { step: '03', title: 'Selesai', date: null, note: 'Menunggu hasil perbaikan unit' }
    ],
    admin_response: {
      author: 'Dimas Pratama',
      date: '10 Nov 2026, 09.15',
      message: 'Terima kasih atas laporannya. Tim teknis sudah ditugaskan untuk memeriksa AC di ruang 204. Pengecekan dijadwalkan hari ini setelah perkuliahan. Kami akan memperbarui status setelah penanganan selesai.'
    },
    created_at: '2026-11-09T10:20:00Z',
    updated_at: '2026-11-10T09:15:00Z'
  },
  {
    id: 'comp-0253',
    complaint_code: '#CC-0253',
    user_id: 'user-002',
    reporter_name: 'Alya Putri',
    reporter_role: 'Mahasiswa',
    title: 'Proyektor tidak menyala',
    category: 'Elektronik',
    location: 'Gedung A, ruang 301',
    description: 'Layar proyektor tidak menampilkan gambar saat dinyalakan. Lampu indikator proyektor berkedip merah terus menerus.',
    photo_url: '',
    status: 'menunggu',
    status_step: 1,
    timeline: [
      { step: '01', title: 'Laporan diterima', date: '10 Nov 2026', note: 'Menunggu tinjauan Sarpras' },
      { step: '02', title: 'Dalam penanganan', date: null, note: 'Belum ditugaskan ke teknisi' },
      { step: '03', title: 'Selesai', date: null, note: 'Menunggu perbaikan' }
    ],
    admin_response: null,
    created_at: '2026-11-10T08:30:00Z',
    updated_at: '2026-11-10T08:30:00Z'
  },
  {
    id: 'comp-0255',
    complaint_code: '#CC-0255',
    user_id: 'user-003',
    reporter_name: 'Nadia Putri',
    reporter_role: 'Mahasiswa',
    title: 'Stopkontak ruang diskusi rusak',
    category: 'Kelistrikan',
    location: 'Gedung D, ruang 102',
    description: 'Stopkontak di dinding barat tidak mengalirkan daya dan steker terasa sangat longgar saat dicolokkan, berpotensi memicu percikan.',
    photo_url: '',
    status: 'diproses',
    status_step: 2,
    timeline: [
      { step: '01', title: 'Laporan diterima', date: '10 Nov 2026', note: 'Laporan diverifikasi' },
      { step: '02', title: 'Dalam penanganan', date: '10 Nov 2026', note: 'Teknisi kelistrikan sedang memeriksa stopkontak' },
      { step: '03', title: 'Selesai', date: null, note: 'Menunggu penggantian modul' }
    ],
    admin_response: {
      author: 'Dimas Pratama',
      date: '10 Nov 2026, 11.00',
      message: 'Teknisi listrik sudah meluncur ke lokasi untuk mematikan MCB jalur tersebut dan mengganti stopkontak.'
    },
    created_at: '2026-11-10T09:00:00Z',
    updated_at: '2026-11-10T11:00:00Z'
  },
  {
    id: 'comp-0249',
    complaint_code: '#CC-0249',
    user_id: 'user-001',
    reporter_name: 'Bas Rocker',
    reporter_role: 'Mahasiswa',
    title: 'Kabel Hdmi rusak',
    category: 'Elektronik',
    location: 'Gedung D · Lantai 2 · Ruang d2-4',
    description: 'Kabel HDMI di podium dosen sering putus-putus dan warna display proyektor berubah menjadi kebiruan.',
    photo_url: '',
    status: 'menunggu',
    status_step: 1,
    timeline: [
      { step: '01', title: 'Laporan diterima', date: '8 Nov 2026', note: 'Menunggu tinjauan tim sarpras' },
      { step: '02', title: 'Dalam penanganan', date: null, note: 'Petugas ditugaskan' },
      { step: '03', title: 'Selesai', date: null, note: 'Fasilitas kembali nyaman' }
    ],
    admin_response: null,
    created_at: '2026-11-08T13:15:00Z',
    updated_at: '2026-11-08T13:15:00Z'
  },
  {
    id: 'comp-0240',
    complaint_code: '#CC-0240',
    user_id: 'user-001',
    reporter_name: 'Bas Rocker',
    reporter_role: 'Mahasiswa',
    title: 'Kran wastafel toilet lantai 1 bocor',
    category: 'Fasilitas Umum',
    location: 'Gedung B · Lantai 1 · Toilet Pria',
    description: 'Air mengalir terus-menerus meskipun tuas sudah diputar maksimal. Mengakibatkan pemborosan air dan lantai becek.',
    photo_url: '',
    status: 'selesai',
    status_step: 3,
    timeline: [
      { step: '01', title: 'Laporan diterima', date: '5 Nov 2026', note: 'Laporan diverifikasi' },
      { step: '02', title: 'Dalam penanganan', date: '5 Nov 2026', note: 'Teknisi perpipaan dikirim' },
      { step: '03', title: 'Selesai', date: '6 Nov 2026', note: 'Karet seal kran telah diganti baru' }
    ],
    admin_response: {
      author: 'Dimas Pratama',
      date: '6 Nov 2026, 14.30',
      message: 'Perbaikan kran air selesai dilakukan oleh tim Sarpras. Terima kasih atas partisipasi aktif Anda.'
    },
    created_at: '2026-11-05T09:40:00Z',
    updated_at: '2026-11-06T14:30:00Z'
  },
  {
    id: 'comp-0238',
    complaint_code: '#CC-0238',
    user_id: 'user-001',
    reporter_name: 'Bas Rocker',
    reporter_role: 'Mahasiswa',
    title: 'Kursi kuliah patah sandaran',
    category: 'Furnitur',
    location: 'Gedung C · Lantai 2 · Ruang 201',
    description: 'Satu kursi di baris ketiga sandaran punggungnya copot dan berbahaya jika diduduki.',
    photo_url: '',
    status: 'selesai',
    status_step: 3,
    timeline: [
      { step: '01', title: 'Laporan diterima', date: '3 Nov 2026', note: 'Tinjauan Sarpras' },
      { step: '02', title: 'Dalam penanganan', date: '4 Nov 2026', note: 'Kursi dipindahkan ke gudang reparasi' },
      { step: '03', title: 'Selesai', date: '4 Nov 2026', note: 'Sudah diganti dengan unit kursi baru' }
    ],
    admin_response: {
      author: 'Dimas Pratama',
      date: '4 Nov 2026, 16.00',
      message: 'Kursi telah diganti dengan unit pengganti yang layak pakai.'
    },
    created_at: '2026-11-03T11:10:00Z',
    updated_at: '2026-11-04T16:00:00Z'
  }
]
