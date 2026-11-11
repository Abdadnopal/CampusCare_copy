import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import logoKnot from '../assets/logo-knot.png'
import bgLogin from '../assets/login-bg.jpg'

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('Laki-Laki')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!fullName || !email || !password) {
      setErrorMsg('Harap lengkapi semua kolom yang wajib diisi.')
      return
    }

    if (password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter.')
      return
    }

    setIsLoading(true)
    const result = await register({
      fullName,
      email,
      gender,
      phone,
      password
    })
    setIsLoading(false)

    if (result.success) {
      navigate('/user')
    } else {
      setErrorMsg(result.error || 'Pendaftaran gagal. Silakan coba kembali.')
    }
  }

  return (
    <div
      className="auth-page-container"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      <div className="auth-backdrop-overlay"></div>

      <div className="auth-card auth-card--register">
        {/* Card Header */}
        <div className="auth-card-header">
          <h2 className="auth-card-title">Daftar Akun CampusCare</h2>
          <div className="auth-univ-brand">
            <img src={logoKnot} alt="Universitas Paramadina" className="univ-knot-img" />
            <div className="univ-brand-labels">
              <span className="univ-small">universitas</span>
              <span className="univ-bold">paramadina</span>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="auth-alert-box">
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Nama Lengkap</label>
            <input
              type="text"
              className="form-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masukkan Nama Lengkap Anda"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Students</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@paramadina.ac.id"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Jenis Kelamin</label>
            <select
              className="form-input form-select"
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
              placeholder="Masukkan Nomor Telepon Anda"
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
                placeholder="Masukkan kata sandi (min. 6 karakter)"
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

          <button
            type="submit"
            className="btn-auth-submit"
            disabled={isLoading}
          >
            <span>{isLoading ? 'Mendaftarkan...' : 'Daftar Akun'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-card-footer">
          <span>Sudah memiliki akun? </span>
          <Link to="/login" className="auth-footer-link">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  )
}

