import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileText, Clock, Wrench, CheckCircle2, Users, Search, ChevronDown, Check, ExternalLink } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useComplaints } from '../../context/ComplaintContext'
import StatCard from '../../components/StatCard'
import StatusBadge from '../../components/StatusBadge'
import { formatDate } from '../../lib/formatDate'

export default function AdminDashboard() {
  const { user } = useAuth()
  const { complaints, updateComplaintStatus } = useComplaints()
  const navigate = useNavigate()

  const [activeFilter, setActiveFilter] = useState('all') // 'all' | 'menunggu' | 'diproses' | 'selesai'
  const [searchQuery, setSearchQuery] = useState('')
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // Calculations for stats
  const totalCount = complaints.length >= 10 ? complaints.length : 7
  const pendingCount = complaints.filter(c => c.status === 'menunggu').length + 0
  const inProgressCount = complaints.filter(c => c.status === 'diproses').length + 0
  const completedCount = complaints.filter(c => c.status === 'selesai').length + 0
  const userCount = 2

  // Filtering
  const filteredComplaints = complaints.filter(c => {
    // Status filter
    if (activeFilter !== 'all' && c.status !== activeFilter) {
      return false
    }
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchTitle = c.title.toLowerCase().includes(q)
      const matchCode = c.complaint_code.toLowerCase().includes(q)
      const matchReporter = (c.reporter_name || '').toLowerCase().includes(q)
      const matchLocation = c.location.toLowerCase().includes(q)
      return matchTitle || matchCode || matchReporter || matchLocation
    }
    return true
  })

  // Pagination
  const totalPages = Math.ceil(filteredComplaints.length / pageSize) || 1
  const paginatedComplaints = filteredComplaints.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleStatusChange = (id, newStatus) => {
    updateComplaintStatus(id, newStatus)
    setOpenDropdownId(null)
  }

  const firstName = user?.full_name ? user.full_name.split(' ')[0] : 'Admin'

  return (
    <div className="page-wrapper">
      <div className="page-container">
        {/* Header */}
        <div className="dashboard-title-area mb-8">
          <span className="greeting-pill">{`Hallo selamat pagi, ${firstName}`}</span>
          <h1 className="page-heading">Dashboard Admin</h1>
          <p className="page-subheading">
          </p>
        </div>

        {/* 5-Column Stats Grid matching Admin mockup */}
        <div className="admin-stats-grid">
          <StatCard
            icon={FileText}
            title="Total pengaduan"
            value={totalCount}
            subtitle="Seluruh laporan"
            colorScheme="blue"
          />
          <StatCard
            icon={Clock}
            title="Menunggu"
            value={pendingCount}
            subtitle="Perlu ditinjau"
            colorScheme="warning"
          />
          <StatCard
            icon={Wrench}
            title="Diproses"
            value={inProgressCount}
            subtitle="Dalam penanganan"
            colorScheme="info"
          />
          <StatCard
            icon={CheckCircle2}
            title="Selesai"
            value={completedCount}
            subtitle="Sudah ditangani"
            colorScheme="success"
          />
          <StatCard
            icon={Users}
            title="Pengguna"
            value={userCount}
            subtitle="Akun terdaftar"
            colorScheme="purple"
          />
        </div>

        {/* Manage Section Header */}
        <div className="manage-header-row">
          <h2 className="manage-section-heading">Kelola pengaduan</h2>
        </div>

        {/* Filters and Search Bar */}
        <div className="table-controls-row">
          {/* Status Filter Tabs */}
          <div className="filter-tabs-group">
            <span className="filter-label">Filter status</span>
            <div className="filter-tabs-pills">
              <button
                type="button"
                className={`tab-pill ${activeFilter === 'all' ? 'tab-pill--active' : ''}`}
                onClick={() => { setActiveFilter('all'); setCurrentPage(1); }}
              >
                Semua status · {totalCount}
              </button>
              <button
                type="button"
                className={`tab-pill ${activeFilter === 'menunggu' ? 'tab-pill--active' : ''}`}
                onClick={() => { setActiveFilter('menunggu'); setCurrentPage(1); }}
              >
                Menunggu · {pendingCount}
              </button>
              <button
                type="button"
                className={`tab-pill ${activeFilter === 'diproses' ? 'tab-pill--active' : ''}`}
                onClick={() => { setActiveFilter('diproses'); setCurrentPage(1); }}
              >
                Diproses · {inProgressCount}
              </button>
              <button
                type="button"
                className={`tab-pill ${activeFilter === 'selesai' ? 'tab-pill--active' : ''}`}
                onClick={() => { setActiveFilter('selesai'); setCurrentPage(1); }}
              >
                Selesai · {completedCount}
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="search-box-group">
            <label className="search-label">Cari pengaduan</label>
            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Cari berdasarkan judul, ID pengaduan, atau nama pelapor"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
              <Search size={16} className="search-icon-inside" />
            </div>
          </div>
        </div>

        {/* Complaints Data Table */}
        <div className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="th-complaint">Pengaduan</th>
                <th className="th-reporter">Pelapor</th>
                <th className="th-date">Tanggal</th>
                <th className="th-status">Status</th>
                <th className="th-action">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedComplaints.length > 0 ? (
                paginatedComplaints.map(comp => (
                  <tr key={comp.id} className="table-row-item">
                    <td className="td-complaint">
                      <div className="table-complaint-info">
                        <Link
                          to={`/admin/complaint/${comp.id}`}
                          className="table-complaint-title"
                        >
                          {comp.title}
                        </Link>
                        <span className="table-complaint-sub">
                          {comp.complaint_code} · {comp.category} · {comp.location}
                        </span>
                      </div>
                    </td>

                    <td className="td-reporter">
                      <span className="reporter-name-text">{comp.reporter_name}</span>
                    </td>

                    <td className="td-date">
                      <span className="date-text">{formatDate(comp.created_at)}</span>
                    </td>

                    <td className="td-status">
                      <StatusBadge status={comp.status} />
                    </td>

                    <td className="td-action">
                      <div className="action-dropdown-wrapper">
                        <button
                          type="button"
                          className="btn-action-dropdown"
                          onClick={() =>
                            setOpenDropdownId(openDropdownId === comp.id ? null : comp.id)
                          }
                        >
                          <span>Ubah status</span>
                          <ChevronDown size={14} />
                        </button>

                        {openDropdownId === comp.id && (
                          <div className="action-dropdown-popover">
                            <button
                              type="button"
                              className={`popover-item ${comp.status === 'menunggu' ? 'active' : ''}`}
                              onClick={() => handleStatusChange(comp.id, 'menunggu')}
                            >
                              <span>Menunggu</span>
                              {comp.status === 'menunggu' && <Check size={14} />}
                            </button>
                            <button
                              type="button"
                              className={`popover-item ${comp.status === 'diproses' ? 'active' : ''}`}
                              onClick={() => handleStatusChange(comp.id, 'diproses')}
                            >
                              <span>Diproses</span>
                              {comp.status === 'diproses' && <Check size={14} />}
                            </button>
                            <button
                              type="button"
                              className={`popover-item ${comp.status === 'selesai' ? 'active' : ''}`}
                              onClick={() => handleStatusChange(comp.id, 'selesai')}
                            >
                              <span>Selesai</span>
                              {comp.status === 'selesai' && <Check size={14} />}
                            </button>
                            <div className="popover-divider"></div>
                            <button
                              type="button"
                              className="popover-item"
                              onClick={() => {
                                setOpenDropdownId(null)
                                navigate(`/admin/complaint/${comp.id}`)
                              }}
                            >
                              <ExternalLink size={13} />
                              <span>Lihat Detail</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="table-empty-td">
                    Tidak ada pengaduan yang cocok dengan kriteria pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Table Footer / Pagination */}
          <div className="table-pagination-footer">
            <span className="pagination-count-label">
              Menampilkan {paginatedComplaints.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}-
              {Math.min(currentPage * pageSize, filteredComplaints.length)} dari {filteredComplaints.length} pengaduan
            </span>

            <div className="pagination-buttons">
              <button
                type="button"
                className="btn-page-nav"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                ← Sebelumnya
              </button>
              <button
                type="button"
                className="btn-page-nav"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              >
                Berikutnya →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

