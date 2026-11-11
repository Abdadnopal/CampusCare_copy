// Helper methods for complaints and media handling

export function generateComplaintCode(existingCount = 0) {
  const codeNum = 260 + existingCount
  return `#CC-${String(codeNum).padStart(4, '0')}`
}

export function validateImageFile(file, maxSizeMb = 2) {
  if (!file) return { valid: true }

  const validTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Format foto harus berupa JPG, PNG, atau WebP.'
    }
  }

  const maxSizeBytes = maxSizeMb * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `Ukuran foto melebihi batas maksimum (${maxSizeMb} MB).`
    }
  }

  return { valid: true }
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

