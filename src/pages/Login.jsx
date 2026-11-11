import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import logoKnot from '../assets/logo-knot.png'
import bgLogin from '../assets/login-bg.jpg'

export default function Login() {
  const [activeTab, setActiveTab] = useState('mahasiswa') // 'mahasiswa' | 'admin'
  const [email, setEmail] = useState('beruang@paramadina.ac.id')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Handle tab switch
  const handleTabSwitch = (tab) => {
    setActiveTab(tab)
    setErrorMsg('')
    if (tab === 'admin') {
      setEmail('admin@kampus.ac.id')
      setPassword('admin123')
    } else {
      setEmail('beruang@paramadina.ac.id')
      setPassword('password123')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!email || !password) {
      setErrorMsg('Harap isi email dan kata sandi Anda.')
      return
    }

    setIsLoading(true)
    const result = await login(email, password, activeTab)
    setIsLoading(false)

    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin')
      } else {
        const from = location.state?.from?.pathname || '/user'
        navigate(from)
      }
    } else {
      setErrorMsg(result.error || 'Email atau kata sandi tidak cocok.')
    }
  }

  return (
    <div
      className="auth-page-container"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      <div className="auth-backdrop-overlay"></div>

      <div className="auth-card">
        {/* Card Header */}
        <div className="auth-card-header">
          <h2 className="auth-card-title">Masuk ke CampusCare</h2>
          <div className="auth-univ-brand">
            <img src={logoKnot} alt="Universitas Paramadina" className="univ-knot-img" />
            <div className="univ-brand-labels">
              <span className="univ-small">universitas</span>
              <span className="univ-bold">paramadina</span>
            </div>
          </div>
        </div>

        {/* Role Switcher Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'mahasiswa' ? 'auth-tab-btn--active' : ''}`}
            onClick={() => handleTabSwitch('mahasiswa')}
          >
            Mahasiswa
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'admin' ? 'auth-tab-btn--active' : ''}`}
            onClick={() => handleTabSwitch('admin')}
          >
            Admin login
          </button>
        </div>

        {errorMsg && (
          <div className="auth-alert-box">
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">
              {activeTab === 'admin' ? 'Email Admin' : 'Email kampus'}
            </label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={activeTab === 'admin' ? 'admin@kampus.ac.id' : 'nama@kampus.ac.id'}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kata sandi</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                required
              />
              <button
                type="button"
                className="btn-toggle-pwd"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-row-remember">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Ingat saya</span>
            </label>
            <button
              type="button"
              className="link-forgot-pwd"
              onClick={() => alert('Fitur reset kata sandi: Silakan hubungi admin Sarpras atau gunakan akun demo.')}
            >
              Lupa kata sandi?
            </button>
          </div>

          <button
            type="submit"
            className="btn-auth-submit"
            disabled={isLoading}
          >
            <span>{isLoading ? 'Memproses...' : 'Masuk'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {activeTab === 'mahasiswa' ? (
          <div className="auth-card-footer">
            <span>Belum punya akun? </span>
            <Link to="/register" className="auth-footer-link">
              Daftar
            </Link>
          </div>
        ) : (
          <div className="auth-card-footer">
            <span className="admin-hint">
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

