import { useState, useCallback, useMemo } from 'react'
import { filterBySearchTerm, sortByField } from '../utils/helpers'

/**
 * Custom hook for managing list data with search, filter, and sort
 * @param {Array} initialData - Initial data array
 * @param {Object} options - Configuration options
 * @returns {Object} - List state and handlers
 */
export const useList = (initialData = [], options = {}) => {
  const {
    searchFields = [],
    defaultSort = null,
    defaultFilter = () => true,
  } = options

  const [data, setData] = useState(initialData)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState(defaultSort)
  const [customFilter, setCustomFilter] = useState(() => defaultFilter)

  // Add item to list
  const addItem = useCallback((item) => {
    setData((prev) => [...prev, item])
  }, [])

  // Update item in list
  const updateItem = useCallback((id, updates) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    )
  }, [])

  // Remove item from list
  const removeItem = useCallback((id) => {
    setData((prev) => prev.filter((item) => item.id !== id))
  }, [])

  // Toggle item selection (for bulk actions)
  const [selectedItems, setSelectedItems] = useState([])

  const toggleSelection = useCallback((id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }, [])

  const selectAll = useCallback(() => {
    const currentFiltered = data.filter(customFilter)
    let filtered = currentFiltered

    if (searchTerm && searchFields.length > 0) {
      filtered = filterBySearchTerm(filtered, searchTerm, searchFields)
    }

    if (sortConfig) {
      filtered = sortByField(filtered, sortConfig.field, sortConfig.direction)
    }

    setSelectedItems(filtered.map((item) => item.id))
  }, [data, customFilter, searchTerm, searchFields, sortConfig])

  const clearSelection = useCallback(() => {
    setSelectedItems([])
  }, [])

  // Handle sorting
  const handleSort = useCallback((field) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev?.field === field && prev?.direction === 'asc' ? 'desc' : 'asc',
    }))
  }, [])

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    let filtered = data

    // Apply custom filter
    filtered = filtered.filter(customFilter)

    // Apply search
    if (searchTerm && searchFields.length > 0) {
      filtered = filterBySearchTerm(filtered, searchTerm, searchFields)
    }

    // Apply sorting
    if (sortConfig) {
      filtered = sortByField(filtered, sortConfig.field, sortConfig.direction)
    }

    return filtered
  }, [data, searchTerm, searchFields, customFilter, sortConfig])

  return {
    // Data
    data,
    filteredData,
    setData,

    // CRUD operations
    addItem,
    updateItem,
    removeItem,

    // Search and filter
    searchTerm,
    setSearchTerm,
    setCustomFilter,

    // Sorting
    sortConfig,
    handleSort,

    // Selection
    selectedItems,
    toggleSelection,
    selectAll,
    clearSelection,
  }
}
