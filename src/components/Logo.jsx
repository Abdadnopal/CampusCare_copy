import React from 'react'
import { Link } from 'react-router-dom'
import logoKnot from '../assets/logo-knot.png'

export default function Logo({ size = 'md', to = '/' }) {
  return (
    <Link to={to} className={`brand-logo brand-logo--${size}`}>
      <div className="brand-logo-icon-wrap">
        <img src={logoKnot} alt="CampusCare Icon" className="brand-logo-img" />
      </div>
      <span className="brand-logo-text">CampusCare</span>
    </Link>
  )
}

