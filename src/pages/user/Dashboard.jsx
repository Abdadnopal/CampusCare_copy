import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, FileText, Clock, Wrench, CheckCircle2, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useComplaints } from '../../context/ComplaintContext'
import StatCard from '../../components/StatCard'
import ComplaintCard from '../../components/ComplaintCard'

export default function UserDashboard() {
  const { user } = useAuth()
  const { complaints } = useComplaints()
  const [showAll, setShowAll] = useState(false)

  // Sort complaints from ALL students descending by created_at
  const sortedComplaints = useMemo(() => {
    return [...complaints].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  }, [complaints])

  // Stats calculation based on ALL complaints
  const total = sortedComplaints.length
  const pending = sortedComplaints.filter(c => c.status === 'menunggu').length
  const inProgress = sortedComplaints.filter(c => c.status === 'diproses').length
  const completed = sortedComplaints.filter(c => c.status === 'selesai').length

  // Display list: recent 5 or all if toggled
  const displayComplaints = showAll ? sortedComplaints : sortedComplaints.slice(0, 5)

  // Time-based greeting in Indonesian
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 11) return 'Hallo selamat pagi'
    if (hour < 15) return 'Hallo selamat siang'
    if (hour < 18) return 'Hallo selamat sore'
    return 'Hallo selamat malam'
  }

  const firstName = user?.full_name ? user.full_name.split(' ')[0] : 'Mahasiswa'

  return (
    <div className="page-wrapper">
      <div className="page-container">
        {/* Top Header Section */}
        <div className="dashboard-header-row">
          <div className="dashboard-title-area">
            <span className="greeting-pill">{`${getGreeting()}, ${firstName}`}</span>
            <h1 className="page-heading">Dashboard Mahasiswa</h1>
            <p className="page-subheading">
            </p>
          </div>

          <div className="dashboard-actions">
            <Link to="/user/create-complaint" className="btn-create-complaint">
              <Plus size={18} />
              <span>Buat pengaduan</span>
            </Link>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="stats-grid">
          <StatCard
            icon={FileText}
            title="Total pengaduan"
            value={total}
            subtitle="Semua laporan"
            colorScheme="blue"
          />
          <StatCard
            icon={Clock}
            title="Menunggu"
            value={pending}
            subtitle="Menunggu tinjauan"
            colorScheme="warning"
          />
          <StatCard
            icon={Wrench}
            title="Diproses"
            value={inProgress}
            subtitle="Dalam penanganan"
            colorScheme="info"
          />
          <StatCard
            icon={CheckCircle2}
            title="Selesai"
            value={completed}
            subtitle="Sudah ditangani"
            colorScheme="success"
          />
        </div>

        <div className="section-divider"></div>

        {/* Recent Complaints Section */}
        <div className="recent-section-header">
          <div>
            <h2 className="section-title">Pengaduan terbaru</h2>
            <p className="section-subtitle">
              {displayComplaints.length} dari {total} pengaduan · Diurutkan dari yang terbaru
            </p>
          </div>

          {total > 5 ? (
            <button
              type="button"
              className="link-view-all"
              onClick={() => setShowAll(!showAll)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}
            >
              <span>{showAll ? 'Tampilkan lebih sedikit' : 'Lihat semua'}</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <Link to="/user/my-complaints" className="link-view-all">
              <span>Pengaduan saya</span>
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {/* Complaints List */}
        <div className="complaints-list">
          {displayComplaints.length > 0 ? (
            displayComplaints.map(comp => (
              <ComplaintCard
                key={comp.id}
                complaint={comp}
                linkPrefix="/user/complaint"
              />
            ))
          ) : (
            <div className="empty-state-card">
              <FileText size={48} className="empty-state-icon" />
              <h3>Belum ada pengaduan</h3>
              <p>Belum ada laporan pengaduan fasilitas kampus.</p>
              <Link to="/user/create-complaint" className="btn-primary-blue mt-4">
                Buat Pengaduan Sekarang
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
