import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ArrowRight, Check, Clock, Bell, CheckCircle2 } from 'lucide-react'
import logoKnot from '../assets/logo-knot.png'
import campusBuilding from '../assets/campus-paramadina.jpg'
import { useAuth } from '../context/AuthContext'

export default function Landing() {
  const { isAuthenticated, isAdmin } = useAuth()

  // Protect route: Redirect Admin directly to Dashboard Admin
  if (isAuthenticated && isAdmin) {
    return <Navigate to="/admin" replace />
  }

  const destination = !isAuthenticated
    ? '/login'
    : isAdmin
      ? '/admin'
      : '/user/create-complaint'

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          {/* Left Column: Hero Copy */}
          <div className="hero-content">
            <div className="hero-pill-badge">
              <Check size={14} className="pill-check-icon" />
              <span>Kampus nyaman, mulai dari kita</span>
            </div>

            <h1 className="hero-title">
              Suaramu berarti, untuk kampus nyaman
            </h1>

            <p className="hero-description">
              Ada fasilitas yang bermasalah?
              Ada pengaduan yang terkait dengan kampus?
              Laporkan dengan mudah, pantau progresnya, dan bantu wujudkan kampus yang
              lebih nyaman.
            </p>

            <div className="hero-actions">
              <Link to={destination} className="btn-primary-blue">
                <span>Mulai laporkan</span>
                <ArrowRight size={16} />
              </Link>
              {!isAuthenticated && (
                <Link to="/login" className="btn-secondary-pill">
                  Sudah punya akun? Masuk
                </Link>
              )}
            </div>

            <div className="hero-subheading">
              <h2>Lapor lebih mudah.</h2>
              <h2>Tindak lanjut lebih jelas.</h2>
            </div>
          </div>

          {/* Right Column: Floating Interactive Preview Card */}
          <div className="hero-visual">
            <div className="hero-card-glow-bg">
              <div className="hero-preview-card">
                <div className="preview-card-header">
                  <img src={logoKnot} alt="CampusCare" className="preview-logo-icon" />
                  <span className="preview-label">Contoh Laporan Kalian</span>
                </div>

                <h3 className="preview-complaint-title">
                  AC kelas tidak dingin
                </h3>
                <p className="preview-complaint-location">
                  Gedung D · Lantai 1 · Ruang d1-5 · dekat kantin
                </p>

                <div className="preview-badges-row">
                  <span className="status-badge status-badge--diproses">
                    <Check size={13} />
                    <span>Sedang diproses</span>
                  </span>
                  <span className="status-badge status-badge--selesai">
                    <Check size={13} />
                    <span>Laporan diterima</span>
                  </span>
                </div>

                <div className="preview-divider"></div>

                <div className="preview-steps-list">
                  <div className="preview-step-item">
                    <div className="step-icon-circle blue">
                      <Clock size={14} />
                    </div>
                    <div className="step-text-wrap">
                      <span className="step-heading">Petugas ditugaskan</span>
                      <span className="step-subheading">Tim teknis meninjau fasilitas</span>
                    </div>
                  </div>

                  <div className="preview-step-item">
                    <div className="step-icon-circle neutral">
                      <Bell size={14} />
                    </div>
                    <div className="step-text-wrap">
                      <span className="step-heading">Fasilitas kembali nyaman</span>
                      <span className="step-subheading">Kamu akan mendapat notifikasi</span>
                    </div>
                  </div>
                </div>

                <div className="preview-footer-note">
                  <CheckCircle2 size={15} className="check-note-icon" />
                  <span>Satu laporan. Progres selalu terlihat.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature & Benefits Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-tagline-row">
            <span className="feature-category-tag">DIPERUNTUKAN UNTUK SEMUA MAHASISWA</span>
            <div className="feature-verified-tag">
              <CheckCircle2 size={15} />
              <span>Terhubung langsung dengan tim Gercep kampus.</span>
            </div>
          </div>

          <div className="features-grid">
            <div className="features-cards-col">
              <div className="feature-benefit-card">
                <h3>Lapor Tanpa Ribet</h3>
                <p>
                  Ceritakan kendala, tambahkan lokasi dan foto. Semua dalam satu tempat.
                </p>
              </div>

              <div className="feature-benefit-card">
                <h3>Pantau Setiap Progres</h3>
                <p>
                  Dari diterima hingga selesai, ketahui apa yang sedang dikerjakan.
                </p>
              </div>

              <div className="feature-benefit-card">
                <h3>Langsung Ke Tim Gercep</h3>
                <p>
                  Laporan terpusat membantu admin menentukan prioritas penanganan.
                </p>
              </div>
            </div>

            {/* Campus Photo Card */}
            <div className="features-image-col">
              <div className="campus-image-wrapper">
                <img
                  src={campusBuilding}
                  alt="Kampus Universitas Paramadina"
                  className="campus-building-photo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <span className="footer-brand">CampusCare</span>
          <span className="footer-copy">© 2026 Campus Care. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}

