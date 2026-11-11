import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { User, Camera, Trash2, CheckCircle2, AlertTriangle, ArrowLeft, Save } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Profile() {
  const { user, updateProfile } = useAuth()

  const [fullName, setFullName] = useState(user?.full_name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [gender, setGender] = useState(user?.gender || 'Laki-Laki')
  const [phone, setPhone] = useState(user?.phone || '')
  const [avatar, setAvatar] = useState(user?.avatar || '')
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '')

  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' })
  const [isSaving, setIsSaving] = useState(false)

  const fileInputRef = useRef(null)

  // Handle avatar file selection with validation
  const handleFileChange = (e) => {
    setStatusMsg({ type: '', text: '' })
    const file = e.target.files?.[0]
    if (!file) return

    // 1. Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setStatusMsg({
        type: 'error',
        text: 'Format foto tidak didukung. Harap pilih gambar dengan format JPG, PNG, atau WEBP.'
      })
      e.target.value = ''
      return
    }

    // 2. Validate file size (max 2 MB = 2 * 1024 * 1024 bytes)
    const maxSizeBytes = 2 * 1024 * 1024
    if (file.size > maxSizeBytes) {
      setStatusMsg({
        type: 'error',
        text: 'Ukuran file terlalu besar. Maksimal ukuran foto profil adalah 2 MB.'
      })
      e.target.value = ''
      return
    }

    // Read and preview
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target.result
      setAvatarPreview(base64)
      setAvatar(base64)
      setStatusMsg({
        type: 'info',
        text: 'Foto baru terpilih. Klik "Simpan perubahan" untuk menerapkan.'
      })
    }
    reader.onerror = () => {
      setStatusMsg({
        type: 'error',
        text: 'Gagal memproses file foto. Silakan coba kembali.'
      })
    }
    reader.readAsDataURL(file)
  }

  // Remove photo
  const handleRemovePhoto = () => {
    setAvatar('')
    setAvatarPreview('')
    if (fileInputRef.current) fileInputRef.current.value = ''
    setStatusMsg({
      type: 'info',
      text: 'Foto profil dihapus. Klik "Simpan perubahan" untuk menerapkan.'
    })
  }

  // Handle save profile form
  const handleSaveProfile = (e) => {
    e.preventDefault()
    setStatusMsg({ type: '', text: '' })

    if (!fullName.trim() || !email.trim()) {
      setStatusMsg({
        type: 'error',
        text: 'Nama lengkap dan email tidak boleh kosong.'
      })
      return
    }

    setIsSaving(true)
    try {
      updateProfile({
        full_name: fullName.trim(),
        email: email.trim(),
        gender,
        phone: phone.trim(),
        avatar
      })

      setStatusMsg({
        type: 'success',
        text: 'Profil dan foto akun berhasil diperbarui!'
      })
      setTimeout(() => {
        setStatusMsg({ type: '', text: '' })
      }, 3500)
    } catch (err) {
      setStatusMsg({
        type: 'error',
        text: 'Terjadi kesalahan saat menyimpan profil. Silakan coba lagi.'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const initialLetter = fullName ? fullName.charAt(0).toUpperCase() : 'U'

  return (
    <div className="page-wrapper">
      <div className="page-container" style={{ maxWidth: '720px' }}>
        {/* Back Link */}
        <Link to="/user" className="link-back-dashboard">
          <ArrowLeft size={16} />
          <span>Kembali ke dashboard</span>
        </Link>

        {/* Page Title */}
        <div className="profile-page-header mb-8">
          <span className="greeting-pill">Pengaturan Akun</span>
          <h1 className="page-heading">Profil Pengguna</h1>
          <p className="page-subheading" style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '6px' }}>
            Kelola data diri, informasi kontak, dan foto profil akun mahasiswa Anda.
          </p>
        </div>

        {/* Alert Notifications */}
        {statusMsg.text && (
          <div
            className={`form-alert-box mb-6 ${
              statusMsg.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-700'
                : statusMsg.type === 'info'
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              border: '1px solid',
              marginBottom: '20px'
            }}
          >
            {statusMsg.type === 'success' ? (
              <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
            ) : statusMsg.type === 'info' ? (
              <CheckCircle2 size={18} className="text-blue-600 flex-shrink-0" />
            ) : (
              <AlertTriangle size={18} className="text-red-600 flex-shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Profile Card */}
        <div
          className="profile-card"
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '32px 28px',
            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Avatar Upload Section */}
          <div
            className="avatar-edit-section"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              paddingBottom: '28px',
              borderBottom: '1px solid #f1f5f9',
              marginBottom: '28px',
              flexWrap: 'wrap'
            }}
          >
            {/* Avatar Preview */}
            <div
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                background: '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '3px solid #e2e8f0',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                flexShrink: 0
              }}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={fullName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary-blue)' }}>
                  {initialLetter}
                </span>
              )}
            </div>

            {/* Avatar Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                Foto Profil
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                Mendukung format JPG, PNG, atau WEBP. Maksimal 2 MB.
              </p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/webp"
                  style={{ display: 'none' }}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-change-photo"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: '#eff6ff',
                    color: 'var(--primary-blue)',
                    border: '1px solid #bfdbfe',
                    borderRadius: '50px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Camera size={15} />
                  <span>Ganti foto</span>
                </button>

                {avatarPreview && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      background: '#fff1f2',
                      color: '#e11d48',
                      border: '1px solid #fecdd3',
                      borderRadius: '50px',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={14} />
                    <span>Hapus</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Biodata Form */}
          <form onSubmit={handleSaveProfile}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email Student <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@paramadina.ac.id"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Jenis Kelamin</label>
                <select
                  className="form-input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Nomor Telepon</label>
                <input
                  type="tel"
                  className="form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                />
              </div>
            </div>

            <div className="form-group mt-4" style={{ marginTop: '16px' }}>
              <label className="form-label">Peran Akun</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    background: '#f1f5f9',
                    color: '#475569',
                    fontSize: '13px',
                    fontWeight: 600,
                    borderRadius: '50px'
                  }}
                >
                  Mahasiswa
                </span>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                  Peran terverifikasi oleh institusi kampus.
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '32px',
                paddingTop: '20px',
                borderTop: '1px solid #f1f5f9'
              }}
            >
              <button
                type="submit"
                className="btn-primary-blue"
                disabled={isSaving}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 28px',
                  borderRadius: '50px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: isSaving ? 'not-allowed' : 'pointer'
                }}
              >
                <Save size={16} />
                <span>{isSaving ? 'Menyimpan...' : 'Simpan perubahan'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

