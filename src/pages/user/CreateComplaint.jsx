import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, ShieldAlert, ChevronDown, Check } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useComplaints } from '../../context/ComplaintContext'
import ImageDropzone from '../../components/ImageDropzone'
import { CATEGORIES } from '../../lib/mockData'

export default function CreateComplaint() {
  const { user } = useAuth()
  const { addComplaint } = useComplaints()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  const categoryRef = useRef(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleImageSelect = (base64) => {
    setPhotoUrl(base64)
  }

  const handleImageRemove = () => {
    setPhotoUrl('')
  }

  const handleSelectCategory = (cat) => {
    setCategory(cat)
    setIsCategoryOpen(false)
    if (cat !== 'Lainnya') {
      setCustomCategory('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!title.trim() || !category || !location.trim() || !description.trim()) {
      setErrorMsg('Harap lengkapi semua kolom bertanda * sebelum mengirimkan pengaduan.')
      return
    }

    if (category === 'Lainnya' && !customCategory.trim()) {
      setErrorMsg('Harap sebutkan nama kategori pada kolom "Sebutkan kategori".')
      return
    }

    setIsSubmitting(true)

    try {
      const finalCategory = category === 'Lainnya' && customCategory.trim()
        ? `Lainnya (${customCategory.trim()})`
        : category

      const newComp = await addComplaint({
        title: title.trim(),
        category: finalCategory,
        custom_category: category === 'Lainnya' ? customCategory.trim() : null,
        location: location.trim(),
        description: description.trim(),
        photo_url: photoUrl
      }, user)

      setShowSuccessToast(true)
      setTimeout(() => {
        navigate(`/user/complaint/${newComp.id}`)
      }, 1200)
    } catch (err) {
      setErrorMsg('Gagal mengirimkan pengaduan. Silakan coba kembali.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-wrapper">
      <div className="page-container">
        {/* Back navigation */}
        <Link to="/user" className="link-back-dashboard">
          <ArrowLeft size={16} />
          <span>Kembali ke dashboard</span>
        </Link>

        {/* Page Header */}
        <div className="create-header-section">
          <h1 className="page-heading">Buat Pengaduan</h1>
          <p className="page-subheading">
            Ceritakan kendala fasilitas yang kamu temui. Kami bantu teruskan ke tim Sarpras.
          </p>
        </div>

        {/* Two-column Layout */}
        <div className="create-complaint-grid">
          {/* Left Column: Guidelines Card */}
          <div className="guidelines-col">
            <div className="guidelines-card">
              <h2 className="guidelines-title">
                Jangan lupa untuk membuat laporan yang benar agar solusi lebih cepat.
              </h2>

              <div className="guidelines-steps-list">
                <div className="guideline-step">
                  <span className="step-num-badge">01</span>
                  <div className="step-content">
                    <h4>Pilih lokasi yang tepat</h4>
                    <p>Sertakan gedung, lantai, dan nomor ruangan.</p>
                  </div>
                </div>

                <div className="guideline-step">
                  <span className="step-num-badge">02</span>
                  <div className="step-content">
                    <h4>Ceritakan secara spesifik</h4>
                    <p>Jelaskan apa yang rusak dan dampak yang kamu rasakan.</p>
                  </div>
                </div>

                <div className="guideline-step">
                  <span className="step-num-badge">03</span>
                  <div className="step-content">
                    <h4>Tambahkan foto</h4>
                    <p>Foto membantu petugas memahami kondisi fasilitas.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="emergency-notice-card">
              <div className="notice-header">
                <ShieldAlert size={18} className="emergency-icon" />
                <span className="emergency-title">Ada kondisi darurat?</span>
              </div>
              <p className="emergency-text">
                Untuk risiko keselamatan atau keadaan mendesak, hubungi petugas keamanan kampus secara langsung.
              </p>
            </div>
          </div>

          {/* Right Column: Complaint Form */}
          <div className="form-col">
            <div className="form-card">
              <div className="form-card-header">
                <h2 className="form-card-title">Detail pengaduan</h2>
                <span className="form-mandatory-note">Kolom bertanda * wajib diisi.</span>
              </div>

              {errorMsg && (
                <div className="form-alert-box">
                  <AlertTriangle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="complaint-form">
                <div className="form-group">
                  <label className="form-label">
                    Judul pengaduan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Proyektor tidak menyala"
                    required
                  />
                </div>

                <div className="form-grid-2">
                  {/* Custom Category Dropdown */}
                  <div className="form-group" ref={categoryRef} style={{ position: 'relative' }}>
                    <label className="form-label">
                      Kategori <span className="text-red-500">*</span>
                    </label>
                    
                    <button
                      type="button"
                      className={`form-input custom-dropdown-btn ${isCategoryOpen ? 'custom-dropdown-btn--open' : ''} ${!category ? 'custom-dropdown-placeholder' : ''}`}
                      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                      aria-haspopup="listbox"
                      aria-expanded={isCategoryOpen}
                    >
                      <span className="truncate">
                        {category ? category : 'Pilih kategori fasilitas'}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`dropdown-chevron-icon ${isCategoryOpen ? 'dropdown-chevron-icon--rotate' : ''}`}
                      />
                    </button>

                    {isCategoryOpen && (
                      <div className="custom-dropdown-menu" role="listbox">
                        {CATEGORIES.map(cat => (
                          <button
                            key={cat}
                            type="button"
                            className={`custom-dropdown-item ${category === cat ? 'custom-dropdown-item--active' : ''}`}
                            onClick={() => handleSelectCategory(cat)}
                            role="option"
                            aria-selected={category === cat}
                          >
                            <span>{cat}</span>
                            {category === cat && <Check size={14} className="text-blue-600" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Lokasi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Contoh: Gedung A, ruang 301"
                      required
                    />
                  </div>
                </div>

                {/* Conditional Input for "Lainnya" */}
                {category === 'Lainnya' && (
                  <div className="form-group animate-fadeIn" style={{ marginTop: '-4px' }}>
                    <label className="form-label">
                      Sebutkan kategori <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Contoh: Pintu kelas rusak / Kunci toilet patah"
                      maxLength={50}
                      required
                      autoFocus
                    />
                    <div className="flex-between mt-1">
                      <span className="form-help-text">Jelaskan jenis kategori fasilitas yang dimaksud secara ringkas.</span>
                      <span className="form-help-text" style={{ fontSize: '11px', color: '#94a3b8' }}>
                        {customCategory.length}/50
                      </span>
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">
                    Deskripsi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="form-input form-textarea"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Jelaskan kondisi fasilitas, kapan kendala terjadi, dan dampaknya."
                    required
                  />
                  <span className="form-help-text">
                    Tulis keterangan yang jelas agar petugas mudah menindaklanjuti.
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Foto pendukung (opsional)</label>
                  <ImageDropzone
                    onImageSelect={handleImageSelect}
                    previewUrl={photoUrl}
                    onImageRemove={handleImageRemove}
                  />
                </div>

                <div className="form-actions-bar">
                  <div className="form-assurance-note">
                    <CheckCircle size={15} className="assurance-icon" />
                    <span>Pengaduan akan dikirim ke tim Sarpras. Progresnya bisa kamu pantau di dashboard.</span>
                  </div>

                  <div className="form-buttons-group">
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => navigate('/user')}
                      disabled={isSubmitting}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="btn-submit-complaint"
                      disabled={isSubmitting}
                    >
                      <span>{isSubmitting ? 'Mengirim...' : 'Kirim pengaduan'}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="toast-notification">
          <CheckCircle size={20} className="toast-icon text-green-500" />
          <div className="toast-text">
            <strong>Pengaduan Berhasil Dikirim!</strong>
            <p>Mengarahkan ke rincian pengaduan...</p>
          </div>
        </div>
      )}
    </div>
  )
}
