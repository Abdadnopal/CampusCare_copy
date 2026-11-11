import React from 'react'
import { Clock, CheckCircle2, AlertCircle, Wrench } from 'lucide-react'

export default function StatusBadge({ status, textVariant = null, size = 'md' }) {
  const normStatus = (status || '').toLowerCase()

  if (normStatus === 'diproses' || normStatus === 'sedang diproses') {
    return (
      <span className={`status-badge status-badge--diproses ${size === 'sm' ? 'status-badge--sm' : ''}`}>
        <Wrench className="badge-icon" size={size === 'sm' ? 12 : 14} />
        <span>{textVariant || 'Diproses'}</span>
      </span>
    )
  }

  if (normStatus === 'selesai' || normStatus === 'laporan diterima') {
    return (
      <span className={`status-badge status-badge--selesai ${size === 'sm' ? 'status-badge--sm' : ''}`}>
        <CheckCircle2 className="badge-icon" size={size === 'sm' ? 12 : 14} />
        <span>{textVariant || 'Selesai'}</span>
      </span>
    )
  }

  // default / menunggu
  return (
    <span className={`status-badge status-badge--menunggu ${size === 'sm' ? 'status-badge--sm' : ''}`}>
      <Clock className="badge-icon" size={size === 'sm' ? 12 : 14} />
      <span>{textVariant || 'Menunggu'}</span>
    </span>
  )
}

