import React from 'react'

export default function StatCard({ icon: Icon, title, value, subtitle, colorScheme = 'default' }) {
  return (
    <div className={`stat-card stat-card--${colorScheme}`}>
      <div className="stat-card-header">
        {Icon && <Icon className="stat-card-icon" size={20} />}
        <span className="stat-card-title">{title}</span>
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-subtitle">{subtitle}</div>
    </div>
  )
}

