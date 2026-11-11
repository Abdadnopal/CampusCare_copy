import React from 'react'

export default function LoadingState({ message = 'Memuat data...' }) {
  return (
    <div className="loading-state-container">
      <div className="loading-spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  )
}

