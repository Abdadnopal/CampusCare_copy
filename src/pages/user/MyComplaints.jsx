import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, Bell, Check, ChevronRight, Plus, FileText } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useComplaints } from '../../context/ComplaintContext'

export default function MyComplaints() {
  const { user } = useAuth()
  const { complaints } = useComplaints()

  // Filter complaints ONLY for current logged in user
  const userComplaints = complaints.filter(c => c.user_id === user?.id)

  const firstName = user?.full_name ? user.full_name.split(' ')[0] : 'Mahasiswa'

  return (
    <div className="page-wrapper">
      <div className="page-container" style={{ maxWidth: '960px' }}>
        {/* Header */}
        <div className="dashboard-title-area mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="greeting-pill">{`Hallo selamat datang, ${firstName}`}</span>
            <h1 className="page-heading">Pengaduan Saya</h1>
            <p className="page-subheading" style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '6px' }}>
              Daftar seluruh laporan fasilitas kampus yang diajukan oleh akun Anda ({userComplaints.length} laporan).
            </p>
          </div>

          <Link to="/user/create-complaint" className="btn-create-complaint" style={{ flexShrink: 0 }}>
            <Plus size={18} />
            <span>Buat pengaduan</span>
          </Link>
        </div>

        {/* 1-Column Full Width Complaints List */}
        <div className="complaints-full-column" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {userComplaints.length > 0 ? (
            userComplaints.map(comp => (
              <div key={comp.id} className="detailed-complaint-box">
                <div className="box-header-row">
                  <div>
                    <span className="complaint-code" style={{ fontSize: '13px', color: 'var(--primary-blue)', fontWeight: 600 }}>
                      {comp.complaint_code} · {comp.category}
                    </span>
                    <h2 className="box-complaint-title" style={{ marginTop: '4px' }}>
                      <Link to={`/user/complaint/${comp.id}`} className="hover:underline">
                        {comp.title}
                      </Link>
                    </h2>
                    <p className="box-complaint-location">{comp.location}</p>
                  </div>

                  <Link to={`/user/complaint/${comp.id}`} className="btn-box-detail">
                    <span>Detail</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>

                <div className="box-badges-row">
                  {comp.status === 'diproses' && (
                    <span className="status-badge status-badge--diproses">
                      <Check size={13} />
                      <span>Sedang diproses</span>
                    </span>
                  )}
                  {comp.status === 'selesai' && (
                    <span className="status-badge status-badge--selesai">
                      <Check size={13} />
                      <span>Selesai ditangani</span>
                    </span>
                  )}
                  {comp.status === 'menunggu' && (
                    <span className="status-badge status-badge--menunggu">
                      <Check size={13} />
                      <span>Menunggu untuk diproses</span>
                    </span>
                  )}
                </div>

                <div className="box-timeline-steps">
                  <div className="box-step-item">
                    <div className="box-step-icon">
                      <Clock size={16} />
                    </div>
                    <div className="box-step-info">
                      <span className="box-step-title">Petugas ditugaskan</span>
                      <span className="box-step-desc">Tim teknis meninjau fasilitas</span>
                    </div>
                  </div>

                  <div className="box-step-item">
                    <div className="box-step-icon">
                      <Bell size={16} />
                    </div>
                    <div className="box-step-info">
                      <span className="box-step-title">Fasilitas kembali nyaman</span>
                      <span className="box-step-desc">Kamu akan mendapat notifikasi</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state-card" style={{ padding: '60px 24px', textAlign: 'center' }}>
              <FileText size={48} className="empty-state-icon" style={{ margin: '0 auto 16px', color: '#94a3b8' }} />
              <h3>Belum ada pengaduan aktif</h3>
              <p>Anda belum pernah mengajukan pengaduan fasilitas kampus.</p>
              <Link to="/user/create-complaint" className="btn-primary-blue mt-4" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={16} />
                <span>Buat Pengaduan Sekarang</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
