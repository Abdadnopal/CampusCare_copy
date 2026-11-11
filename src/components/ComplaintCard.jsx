import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ChevronRight } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { formatDate } from '../lib/formatDate'

export default function ComplaintCard({ complaint, linkPrefix = '/user/complaint' }) {
  return (
    <Link to={`${linkPrefix}/${complaint.id}`} className="complaint-card">
      <div className="complaint-card-left">
        <div className="complaint-card-meta">
          <span className="complaint-code">{complaint.complaint_code}</span>
          <span className="meta-separator">·</span>
          <span className="complaint-category">{complaint.category}</span>
          {complaint.reporter_name && (
            <>
              <span className="meta-separator">·</span>
              <span className="complaint-reporter" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                Pelapor: {complaint.reporter_name}
              </span>
            </>
          )}
        </div>
        <h3 className="complaint-card-title">{complaint.title}</h3>
        {complaint.description && (
          <p className="complaint-card-desc">
            {complaint.description.length > 120
              ? `${complaint.description.substring(0, 120)}...`
              : complaint.description}
          </p>
        )}
        <div className="complaint-card-location">
          <MapPin size={14} className="location-icon" />
          <span>{complaint.location}</span>
        </div>
      </div>

      <div className="complaint-card-right">
        <div className="complaint-card-status-row">
          <StatusBadge status={complaint.status} />
          <ChevronRight size={18} className="chevron-icon" />
        </div>
        <span className="complaint-card-date">
          {formatDate(complaint.created_at)}
        </span>
      </div>
    </Link>
  )
}
