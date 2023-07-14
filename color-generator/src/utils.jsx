export function getContrastTextColor(hexColor) {
  // Convert hex color to RGB
  const rgbColor = hexToRgb(hexColor)

  const luma =
    (0.299 * rgbColor.r + 0.587 * rgbColor.g + 0.114 * rgbColor.b) / 255

  if (luma <= 0.5) {
    return '#ffffff' // Use white text color for dark background
  } else {
    return '#000000' // Use black text color for light background
  }
}

// Function to convert hex color to RGB
function hexToRgb(hexColor) {
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  return { r, g, b }
}
