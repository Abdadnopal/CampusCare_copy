import React, { useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Clock, Wrench, Send, AlertCircle, FileText, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useComplaints } from '../context/ComplaintContext'
import StatusBadge from '../components/StatusBadge'
import { formatDate } from '../lib/formatDate'

export default function ComplaintDetail() {
  const { id } = useParams()
  const { user, isAdmin } = useAuth()
  const { getComplaintById, updateComplaintStatus, addAdminResponse } = useComplaints()
  const navigate = useNavigate()
  const location = useLocation()

  const complaint = getComplaintById(id)

  const [responseText, setResponseText] = useState('')
  const [isEditingResponse, setIsEditingResponse] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  if (!complaint) {
    return (
      <div className="page-wrapper">
        <div className="page-container text-center py-16">
          <AlertCircle size={48} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Pengaduan Tidak Ditemukan</h2>
          <p className="text-gray-500 mb-6">
            Pengaduan dengan ID tersebut tidak ada atau sudah dihapus.
          </p>
          <Link
            to={isAdmin ? '/admin' : '/user'}
            className="btn-primary-blue inline-flex"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const handleUpdateStatus = (newStatus) => {
    updateComplaintStatus(complaint.id, newStatus)
    setSuccessMsg(`Status pengaduan berhasil diubah menjadi "${newStatus}".`)
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  const handleSendResponse = (e) => {
    e.preventDefault()
    if (!responseText.trim()) return

    addAdminResponse(complaint.id, responseText.trim(), user)
    setResponseText('')
    setIsEditingResponse(false)
    setSuccessMsg('Tanggapan berhasil disimpan dan dikirimkan kepada pelapor.')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  const backLink = isAdmin ? '/admin' : '/user/my-complaints'
  const backLabel = isAdmin ? 'Kembali ke dashboard admin' : 'Kembali ke pengaduan saya'

  return (
    <div className="page-wrapper">
      <div className="page-container">
        {/* Back Link */}
        <Link to={backLink} className="link-back-dashboard">
          <ArrowLeft size={16} />
          <span>{backLabel}</span>
        </Link>

        {/* Header */}
        <div className="detail-header-section">
          <h1 className="page-heading">Detail Pengaduan</h1>
          <p className="page-subheading">
            {complaint.complaint_code} · Dilaporkan {formatDate(complaint.created_at, true)}
          </p>
        </div>

        {successMsg && (
          <div className="detail-success-banner">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Complaint Photo Banner (if available) */}
        {complaint.photo_url && (
          <div className="complaint-photo-wrapper">
            <img
              src={complaint.photo_url}
              alt={complaint.title}
              className="complaint-banner-img"
            />
            <div className="photo-caption-bar">
              <span>Foto terlampir · {complaint.location}</span>
            </div>
          </div>
        )}

        {/* Detail Content Grid */}
        <div className="complaint-detail-grid">
          {/* Left Column: Complaint Details & Admin Response */}
          <div className="detail-main-col">
            <div className="detail-title-card">
              <div className="detail-status-pill-wrap">
                <StatusBadge status={complaint.status} />
              </div>
              <h2 className="detail-complaint-title">{complaint.title}</h2>
              <p className="detail-complaint-loc">{complaint.location}</p>
            </div>

            {/* Description Card */}
            <div className="detail-content-card">
              <h3 className="card-section-title">Deskripsi pengaduan</h3>
              <div className="complaint-desc-body">
                {complaint.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="desc-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Admin Sarpras Response Card */}
            <div className="detail-content-card response-card">
              <div className="card-header-with-action">
                <h3 className="card-section-title">Tanggapan Admin Sarpras</h3>
                {isAdmin && complaint.admin_response && !isEditingResponse && (
                  <button
                    type="button"
                    className="btn-edit-response"
                    onClick={() => {
                      setResponseText(complaint.admin_response.message)
                      setIsEditingResponse(true)
                    }}
                  >
                    Edit Tanggapan
                  </button>
                )}
              </div>

              {complaint.admin_response && !isEditingResponse ? (
                <div className="admin-response-box">
                  <div className="response-author-meta">
                    <span className="response-author-name">
                      {complaint.admin_response.author}
                    </span>
                    <span className="meta-separator">·</span>
                    <span className="response-date">
                      {complaint.admin_response.date}
                    </span>
                  </div>
                  <p className="response-message-text">
                    {complaint.admin_response.message}
                  </p>
                </div>
              ) : isAdmin || isEditingResponse ? (
                <form onSubmit={handleSendResponse} className="admin-response-form">
                  <textarea
                    rows={4}
                    className="form-input form-textarea"
                    placeholder="Tulis tanggapan atau instruksi tindak lanjut dari tim Sarpras..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    required
                  />
                  <div className="response-form-actions">
                    {isEditingResponse && (
                      <button
                        type="button"
                        className="btn-cancel-sm"
                        onClick={() => setIsEditingResponse(false)}
                      >
                        Batal
                      </button>
                    )}
                    <button type="submit" className="btn-send-response">
                      <Send size={14} />
                      <span>Simpan Tanggapan</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="empty-response-notice">
                  <Clock size={18} className="text-amber-500" />
                  <p>
                    Laporan sedang dalam antrean penanganan. Tim Sarpras akan memberikan
                    tanggapan resmi sesegera mungkin.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Metadata & Progress Timeline */}
          <div className="detail-sidebar-col">
            {/* Admin Status Quick Action (if Admin) */}
            {isAdmin && (
              <div className="detail-sidebar-card admin-action-card">
                <h3 className="sidebar-card-title">Perbarui Status</h3>
                <div className="admin-status-buttons">
                  <button
                    type="button"
                    className={`btn-status-choice status-choice--menunggu ${
                      complaint.status === 'menunggu' ? 'active' : ''
                    }`}
                    onClick={() => handleUpdateStatus('menunggu')}
                  >
                    <Clock size={15} />
                    <span>Menunggu</span>
                    {complaint.status === 'menunggu' && <Check size={14} className="ml-auto" />}
                  </button>

                  <button
                    type="button"
                    className={`btn-status-choice status-choice--diproses ${
                      complaint.status === 'diproses' ? 'active' : ''
                    }`}
                    onClick={() => handleUpdateStatus('diproses')}
                  >
                    <Wrench size={15} />
                    <span>Diproses</span>
                    {complaint.status === 'diproses' && <Check size={14} className="ml-auto" />}
                  </button>

                  <button
                    type="button"
                    className={`btn-status-choice status-choice--selesai ${
                      complaint.status === 'selesai' ? 'active' : ''
                    }`}
                    onClick={() => handleUpdateStatus('selesai')}
                  >
                    <CheckCircle2 size={15} />
                    <span>Selesai</span>
                    {complaint.status === 'selesai' && <Check size={14} className="ml-auto" />}
                  </button>
                </div>
              </div>
            )}

            {/* Complaint Info Card */}
            <div className="detail-sidebar-card">
              <h3 className="sidebar-card-title">Informasi pengaduan</h3>
              <div className="sidebar-meta-list">
                <div className="meta-item">
                  <span className="meta-label">Kategori</span>
                  <span className="meta-value font-medium">{complaint.category}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Dikirim</span>
                  <span className="meta-value">{formatDate(complaint.created_at, true)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Pelapor</span>
                  <span className="meta-value font-medium">
                    {complaint.reporter_name} · {complaint.reporter_role || 'Mahasiswa'}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Terakhir diperbarui</span>
                  <span className="meta-value">
                    {complaint.updated_at
                      ? formatDate(complaint.updated_at, true)
                      : formatDate(complaint.created_at, true)}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Timeline Card */}
            <div className="detail-sidebar-card">
              <h3 className="sidebar-card-title">Progres penanganan</h3>
              <div className="timeline-steps-list">
                {/* Step 1 */}
                <div
                  className={`timeline-step ${
                    complaint.status_step >= 1 ? 'timeline-step--active' : ''
                  }`}
                >
                  <div className="step-indicator">
                    <span className="step-number">01</span>
                    <div className="step-line"></div>
                  </div>
                  <div className="step-details">
                    <div className="step-title-row">
                      <span className="step-name">Laporan diterima</span>
                    </div>
                    <span className="step-meta">
                      {formatDate(complaint.created_at)} · Menunggu tinjauan
                    </span>
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  className={`timeline-step ${
                    complaint.status_step >= 2 ? 'timeline-step--active' : ''
                  }`}
                >
                  <div className="step-indicator">
                    <span className="step-number">02</span>
                    <div className="step-line"></div>
                  </div>
                  <div className="step-details">
                    <div className="step-title-row">
                      <span className="step-name">Dalam penanganan</span>
                    </div>
                    <span className="step-meta">
                      {complaint.status_step >= 2
                        ? `${formatDate(complaint.updated_at)} · Tim teknis ditugaskan`
                        : 'Menunggu penugasan tim Sarpras'}
                    </span>
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  className={`timeline-step ${
                    complaint.status_step >= 3 ? 'timeline-step--active' : ''
                  }`}
                >
                  <div className="step-indicator">
                    <span className="step-number">03</span>
                  </div>
                  <div className="step-details">
                    <div className="step-title-row">
                      <span className="step-name">Selesai</span>
                    </div>
                    <span className="step-meta">
                      {complaint.status_step >= 3
                        ? `${formatDate(complaint.updated_at)} · Perbaikan selesai dilakukan`
                        : 'Menunggu hasil perbaikan'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Return Button */}
            <Link
              to={isAdmin ? '/admin' : '/user'}
              className="btn-return-dashboard"
            >
              Kembali ke dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

