import React, { createContext, useContext, useState, useEffect } from 'react'
import { INITIAL_COMPLAINTS } from '../lib/mockData'
import { generateComplaintCode } from '../lib/complaints'

const ComplaintContext = createContext(null)

export function ComplaintProvider({ children }) {
  // Store complaints in localStorage, initialized with static INITIAL_COMPLAINTS
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('campuscare_complaints')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Error parsing stored complaints', e)
      }
    }
    return INITIAL_COMPLAINTS
  })

  const [loading, setLoading] = useState(false)

  // Persist complaints to localStorage
  useEffect(() => {
    localStorage.setItem('campuscare_complaints', JSON.stringify(complaints))
  }, [complaints])

  // Create new complaint (Pure Front-End JavaScript)
  const addComplaint = async (data, user) => {
    const newCode = generateComplaintCode(complaints.length)
    const newId = `comp-${Date.now()}`
    const nowIso = new Date().toISOString()
    const nowFormatted = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })

    const newComplaint = {
      id: newId,
      complaint_code: newCode,
      user_id: user?.id || 'guest',
      reporter_name: user?.full_name || 'Mahasiswa',
      reporter_role: 'Mahasiswa',
      title: data.title,
      category: data.category,
      custom_category: data.custom_category || null,
      location: data.location,
      description: data.description,
      photo_url: data.photo_url || '',
      status: 'menunggu',
      status_step: 1,
      timeline: [
        { step: '01', title: 'Laporan diterima', date: nowFormatted, note: 'Menunggu tinjauan Sarpras' },
        { step: '02', title: 'Dalam penanganan', date: null, note: 'Petugas ditugaskan' },
        { step: '03', title: 'Selesai', date: null, note: 'Fasilitas kembali nyaman' }
      ],
      admin_response: null,
      created_at: nowIso,
      updated_at: nowIso
    }

    setComplaints(prev => [newComplaint, ...prev])
    return newComplaint
  }

  // Update Status (Pure Front-End JavaScript)
  const updateComplaintStatus = (complaintId, newStatus) => {
    const stepNumber = newStatus === 'selesai' ? 3 : newStatus === 'diproses' ? 2 : 1
    const today = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })

    setComplaints(prev => prev.map(comp => {
      if (comp.id === complaintId) {
        const updatedTimeline = comp.timeline ? [...comp.timeline] : [
          { step: '01', title: 'Laporan diterima', date: null, note: '' },
          { step: '02', title: 'Dalam penanganan', date: null, note: '' },
          { step: '03', title: 'Selesai', date: null, note: '' }
        ]

        if (newStatus === 'diproses' && !updatedTimeline[1].date) {
          updatedTimeline[1].date = today
          updatedTimeline[1].note = 'Tim teknis ditugaskan meninjau fasilitas'
        } else if (newStatus === 'selesai') {
          if (!updatedTimeline[1].date) updatedTimeline[1].date = today
          updatedTimeline[2].date = today
          updatedTimeline[2].note = 'Fasilitas selesai diperbaiki dan siap digunakan'
        }

        return {
          ...comp,
          status: newStatus,
          status_step: stepNumber,
          timeline: updatedTimeline,
          updated_at: new Date().toISOString()
        }
      }
      return comp
    }))
  }

  // Add Admin response / feedback (Pure Front-End JavaScript)
  const addAdminResponse = (complaintId, responseText, adminUser) => {
    const now = new Date()
    const dateFormatted = `${now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })}, ${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`

    const responseObj = {
      author: adminUser?.full_name || 'Admin Sarpras',
      date: dateFormatted,
      message: responseText
    }

    setComplaints(prev => prev.map(comp => {
      if (comp.id === complaintId) {
        return {
          ...comp,
          admin_response: responseObj,
          updated_at: new Date().toISOString()
        }
      }
      return comp
    }))
  }

  // Find complaint by id
  const getComplaintById = (id) => {
    return complaints.find(c => c.id === id || c.complaint_code === id)
  }

  // Reset to default static seed data
  const resetDemoData = () => {
    setComplaints(INITIAL_COMPLAINTS)
    localStorage.setItem('campuscare_complaints', JSON.stringify(INITIAL_COMPLAINTS))
  }

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        loading,
        addComplaint,
        updateComplaintStatus,
        addAdminResponse,
        getComplaintById,
        resetDemoData
      }}
    >
      {children}
    </ComplaintContext.Provider>
  )
}

export function useComplaints() {
  const context = useContext(ComplaintContext)
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintProvider')
  }
  return context
}
