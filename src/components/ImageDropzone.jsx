import React, { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { validateImageFile, fileToBase64 } from '../lib/complaints'

export default function ImageDropzone({ onImageSelect, previewUrl, onImageRemove }) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFiles = async (file) => {
    setError('')
    if (!file) return

    const validation = validateImageFile(file, 2)
    if (!validation.valid) {
      setError(validation.error)
      return
    }

    try {
      const base64 = await fileToBase64(file)
      onImageSelect(base64, file)
    } catch (err) {
      setError('Gagal membaca file gambar.')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0])
    }
  }

  return (
    <div className="dropzone-wrapper">
      {previewUrl ? (
        <div className="dropzone-preview-container">
          <img src={previewUrl} alt="Preview pengaduan" className="dropzone-preview-img" />
          <div className="dropzone-preview-overlay">
            <button
              type="button"
              className="dropzone-remove-btn"
              onClick={onImageRemove}
              title="Hapus foto"
            >
              <X size={18} />
              <span>Hapus Foto</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`image-dropzone ${isDragging ? 'image-dropzone--active' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleInputChange}
            accept="image/jpeg,image/png,image/webp"
            style={{ display: 'none' }}
          />
          <div className="dropzone-icon-circle">
            <Upload className="dropzone-icon" size={24} />
          </div>
          <p className="dropzone-main-text">
            Tarik foto ke sini atau pilih dari perangkat
          </p>
          <p className="dropzone-sub-text">
            JPG / PNG / WebP · Maks. 2 MB per foto
          </p>
          <button
            type="button"
            className="btn-dropzone-select"
            onClick={(e) => {
              e.stopPropagation()
              fileInputRef.current?.click()
            }}
          >
            Pilih foto
          </button>
        </div>
      )}

      {error && <p className="dropzone-error-msg">{error}</p>}
    </div>
  )
}

