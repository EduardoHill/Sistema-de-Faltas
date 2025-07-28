import { FREQUENCY_THRESHOLDS, VALIDATION_RULES } from '../constants'

/**
 * Get initials from a full name
 * @param {string} nome - Full name
 * @returns {string} - Initials (max 2 characters)
 */
export const getInitials = (nome) => {
  if (!nome) return ''
  return nome
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

/**
 * Get frequency color based on percentage
 * @param {number} percentage - Frequency percentage
 * @returns {string} - CSS class for color
 */
export const getFrequencyColor = (percentage) => {
  if (percentage >= FREQUENCY_THRESHOLDS.GOOD) return 'text-green-600'
  if (percentage >= FREQUENCY_THRESHOLDS.WARNING) return 'text-yellow-600'
  return 'text-red-600'
}

/**
 * Get frequency badge variant based on percentage
 * @param {number} percentage - Frequency percentage
 * @returns {string} - Badge variant
 */
export const getFrequencyBadgeVariant = (percentage) => {
  if (percentage >= FREQUENCY_THRESHOLDS.GOOD) return 'default'
  if (percentage >= FREQUENCY_THRESHOLDS.WARNING) return 'secondary'
  return 'destructive'
}

/**
 * Format date to Brazilian format
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date
 */
export const formatDateToBR = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('pt-BR')
}

/**
 * Format date to ISO string for input
 * @param {Date} date - Date to format
 * @returns {string} - ISO date string
 */
export const formatDateToInput = (date = new Date()) => {
  return date.toISOString().split('T')[0]
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const isValidEmail = (email) => {
  return VALIDATION_RULES.EMAIL.PATTERN.test(email)
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean} - Is valid password
 */
export const isValidPassword = (password) => {
  return password && password.length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH
}

/**
 * Generate unique ID
 * @returns {string} - Unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * Debounce function to limit calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} - Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Filter array by search term in multiple fields
 * @param {Array} array - Array to filter
 * @param {string} searchTerm - Search term
 * @param {Array} fields - Fields to search in
 * @returns {Array} - Filtered array
 */
export const filterBySearchTerm = (array, searchTerm, fields) => {
  if (!searchTerm) return array

  const term = searchTerm.toLowerCase()
  return array.filter((item) =>
    fields.some((field) => item[field]?.toString().toLowerCase().includes(term))
  )
}

/**
 * Sort array by field
 * @param {Array} array - Array to sort
 * @param {string} field - Field to sort by
 * @param {string} direction - 'asc' or 'desc'
 * @returns {Array} - Sorted array
 */
export const sortByField = (array, field, direction = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[field]
    const bVal = b[field]

    if (direction === 'asc') {
      return aVal > bVal ? 1 : -1
    }
    return aVal < bVal ? 1 : -1
  })
}
