import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Home, LayoutGrid, FileText, Bell, LogOut, User, Menu, X, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
    setMobileMenuOpen(false)
    navigate('/login')
  }

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo - Links to /admin for Admin, / for others */}
        <div className="navbar-left">
          <Logo to={isAdmin ? '/admin' : '/'} />

          {/* Desktop Navigation Links */}
          <nav className="navbar-nav desktop-only">
            {/* Beranda is shown for guests and mahasiswa, HIDDEN for Admin Sarpras */}
            {!isAdmin && (
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-pill ${isActive ? 'nav-pill--active' : ''}`
                }
              >
                <Home size={16} />
                <span>Beranda</span>
              </NavLink>
            )}

            {/* Links for logged-in users */}
            {isAuthenticated && (
              <>
                {!isAdmin ? (
                  <>
                    <NavLink
                      to="/user"
                      end
                      className={({ isActive }) =>
                        `nav-pill ${isActive ? 'nav-pill--active' : ''}`
                      }
                    >
                      <LayoutGrid size={16} />
                      <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                      to="/user/my-complaints"
                      className={({ isActive }) =>
                        `nav-pill ${isActive ? 'nav-pill--active' : ''}`
                      }
                    >
                      <FileText size={16} />
                      <span>Pengaduan saya</span>
                    </NavLink>
                  </>
                ) : (
                  /* Admin Sarpras ONLY has Dashboard Admin */
                  <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                      `nav-pill ${isActive ? 'nav-pill--active' : ''}`
                    }
                  >
                    <LayoutGrid size={16} />
                    <span>Dashboard Admin</span>
                  </NavLink>
                )}
              </>
            )}
          </nav>
        </div>

        {/* Right side controls */}
        <div className="navbar-right">
          {!isAuthenticated ? (
            <div className="auth-nav-buttons desktop-only">
              <Link to="/login" className="btn-nav-login">
                Masuk
              </Link>
              <Link to="/register" className="btn-nav-register">
                Daftar
              </Link>
            </div>
          ) : (
            <div className="user-profile-nav desktop-only">
              <button
                type="button"
                className="btn-notification"
                title="Notifikasi"
                aria-label="Notifikasi"
              >
                <Bell size={18} />
                <span className="notification-dot"></span>
              </button>

              <div className="user-dropdown-wrapper" ref={dropdownRef}>
                <button
                  type="button"
                  className="user-badge-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                  aria-expanded={showDropdown}
                >
                  <div className="user-avatar-circle">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.full_name} />
                    ) : (
                      <span>{user?.full_name?.charAt(0) || 'U'}</span>
                    )}
                  </div>
                  <div className="user-text-info">
                    <span className="user-name">{user?.full_name}</span>
                    <span className="user-role-label">
                      {isAdmin ? 'Admin Sarpras' : 'Mahasiswa'}
                    </span>
                  </div>
                  <ChevronDown size={14} className="chevron-dropdown" />
                </button>

                {showDropdown && (
                  <div className="user-dropdown-menu">
                    <div className="dropdown-user-header">
                      <p className="dropdown-user-name">{user?.full_name}</p>
                      <p className="dropdown-user-email">{user?.email}</p>
                    </div>

                    <div className="dropdown-divider"></div>

                    {!isAdmin ? (
                      <>
                        <Link
                          to="/user/profile"
                          className="dropdown-item"
                          onClick={() => setShowDropdown(false)}
                        >
                          <User size={14} />
                          <span>Profil</span>
                        </Link>

                        <Link
                          to="/user/my-complaints"
                          className="dropdown-item"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FileText size={14} />
                          <span>Pengaduan Saya</span>
                        </Link>

                        <Link
                          to="/user"
                          className="dropdown-item"
                          onClick={() => setShowDropdown(false)}
                        >
                          <LayoutGrid size={14} />
                          <span>Dashboard Mahasiswa</span>
                        </Link>
                      </>
                    ) : (
                      <Link
                        to="/admin"
                        className="dropdown-item"
                        onClick={() => setShowDropdown(false)}
                      >
                        <LayoutGrid size={14} />
                        <span>Dashboard Admin</span>
                      </Link>
                    )}

                    <div className="dropdown-divider"></div>

                    <button
                      type="button"
                      className="dropdown-item dropdown-item--danger"
                      onClick={handleLogout}
                    >
                      <LogOut size={14} />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-content">
            {isAuthenticated ? (
              <>
                <div className="mobile-user-card">
                  <div className="user-avatar-circle">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.full_name} />
                    ) : (
                      <span>{user?.full_name?.charAt(0) || 'U'}</span>
                    )}
                  </div>
                  <div className="user-text-info">
                    <span className="user-name">{user?.full_name}</span>
                    <span className="user-role-label">
                      {isAdmin ? 'Admin Sarpras' : 'Mahasiswa'} • {user?.email}
                    </span>
                  </div>
                </div>

                <div className="mobile-nav-links">
                  {!isAdmin ? (
                    <>
                      <NavLink
                        to="/"
                        end
                        className="mobile-nav-item"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Home size={18} />
                        <span>Beranda</span>
                      </NavLink>
                      <NavLink
                        to="/user"
                        end
                        className="mobile-nav-item"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LayoutGrid size={18} />
                        <span>Dashboard</span>
                      </NavLink>
                      <NavLink
                        to="/user/my-complaints"
                        className="mobile-nav-item"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FileText size={18} />
                        <span>Pengaduan Saya</span>
                      </NavLink>
                      <NavLink
                        to="/user/profile"
                        className="mobile-nav-item"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User size={18} />
                        <span>Profil</span>
                      </NavLink>
                      <NavLink
                        to="/user/create-complaint"
                        className="mobile-nav-item mobile-nav-item--highlight"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>+ Buat Pengaduan</span>
                      </NavLink>
                    </>
                  ) : (
                    /* Admin Sarpras only has Dashboard Admin */
                    <NavLink
                      to="/admin"
                      end
                      className="mobile-nav-item"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LayoutGrid size={18} />
                      <span>Dashboard Admin</span>
                    </NavLink>
                  )}
                </div>

                <button
                  type="button"
                  className="mobile-logout-btn"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Keluar</span>
                </button>
              </>
            ) : (
              <div className="mobile-auth-links">
                <Link
                  to="/"
                  className="mobile-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home size={18} />
                  <span>Beranda</span>
                </Link>
                <Link
                  to="/login"
                  className="mobile-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Masuk ke CampusCare
                </Link>
                <Link
                  to="/register"
                  className="mobile-nav-item mobile-nav-item--highlight"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Daftar Akun Baru
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
