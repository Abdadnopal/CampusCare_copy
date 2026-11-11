import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import UserDashboard from './pages/user/Dashboard'
import CreateComplaint from './pages/user/CreateComplaint'
import MyComplaints from './pages/user/MyComplaints'
import Profile from './pages/user/Profile'
import AdminDashboard from './pages/admin/Dashboard'
import ComplaintDetail from './pages/ComplaintDetail'

export default function App() {
  return (
    <div className="app-layout">
      {/* Main Navigation Bar */}
      <Navbar />

      <main className="app-main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Mahasiswa (User) Protected Routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/create-complaint"
            element={
              <ProtectedRoute requiredRole="user">
                <CreateComplaint />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/my-complaints"
            element={
              <ProtectedRoute requiredRole="user">
                <MyComplaints />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <ProtectedRoute requiredRole="user">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/complaint/:id"
            element={
              <ProtectedRoute requiredRole="user">
                <ComplaintDetail />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          {/* Redirect /admin/complaints directly to /admin */}
          <Route
            path="/admin/complaints"
            element={<Navigate to="/admin" replace />}
          />
          <Route
            path="/admin/complaint/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <ComplaintDetail />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
