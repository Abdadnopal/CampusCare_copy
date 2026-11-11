import React, { createContext, useContext, useState, useEffect } from 'react'
import { DEFAULT_USERS } from '../lib/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Store registered/active users in localStorage or default to DEFAULT_USERS
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('campuscare_users')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Error parsing stored users', e)
      }
    }
    return DEFAULT_USERS
  })

  // Active user session: starts as null (guest) or restores from localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campuscare_auth_user')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Error parsing stored user', e)
      }
    }
    return null
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Keep active user in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('campuscare_auth_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('campuscare_auth_user')
    }
  }, [user])

  // Keep users list in localStorage
  useEffect(() => {
    localStorage.setItem('campuscare_users', JSON.stringify(users))
  }, [users])

  // Login handler (Pure Front-End JavaScript)
  const login = async (email, password, requiredRole = null) => {
    setLoading(true)
    setError(null)
    try {
      const normalizedEmail = email.trim().toLowerCase()

      // Check admin login specifically
      if (requiredRole === 'admin' || normalizedEmail.includes('admin')) {
        const adminUser = users.find(u => u.role === 'admin') || DEFAULT_USERS.find(u => u.role === 'admin')
        setUser(adminUser)
        return { success: true, user: adminUser }
      }

      // Mahasiswa login: check by email in registered/default users
      const matched = users.find(u => u.email.toLowerCase() === normalizedEmail)
      const loggedUser = matched || {
        id: `user-${Date.now()}`,
        email: normalizedEmail,
        full_name: normalizedEmail.split('@')[0].replace('.', ' '),
        role: 'user',
        gender: 'Laki-Laki',
        phone: '0812345678',
        avatar: '',
        password
      }

      setUser(loggedUser)
      return { success: true, user: loggedUser }
    } catch (err) {
      setError(err.message || 'Login gagal')
      return { success: false, error: err.message || 'Login gagal' }
    } finally {
      setLoading(false)
    }
  }

  // Register handler (Pure Front-End JavaScript)
  const register = async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const newUser = {
        id: `user-${Date.now()}`,
        email: formData.email.trim().toLowerCase(),
        full_name: formData.fullName.trim(),
        role: 'user',
        gender: formData.gender || 'Laki-Laki',
        phone: formData.phone || '',
        avatar: '',
        password: formData.password
      }

      setUsers(prev => [...prev, newUser])
      setUser(newUser)
      return { success: true, user: newUser }
    } catch (err) {
      setError(err.message || 'Pendaftaran gagal')
      return { success: false, error: err.message || 'Pendaftaran gagal' }
    } finally {
      setLoading(false)
    }
  }

  // Logout handler
  const logout = () => {
    setUser(null)
    localStorage.removeItem('campuscare_auth_user')
  }

  // Switch demo account conveniently
  const switchDemoUser = (targetId) => {
    const found = users.find(u => u.id === targetId) || DEFAULT_USERS.find(u => u.id === targetId)
    if (found) {
      setUser(found)
    }
  }

  // Update profile
  const updateProfile = (data) => {
    setUser(prev => {
      const updated = { ...prev, ...data }
      localStorage.setItem('campuscare_auth_user', JSON.stringify(updated))
      return updated
    })

    setUsers(prev => prev.map(u => u.id === user?.id ? { ...u, ...data } : u))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        switchDemoUser,
        updateProfile,
        isAuthenticated: Boolean(user),
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
