import { useState, useCallback } from 'react'

/**
 * Custom hook for managing notifications/alerts
 * @returns {Object} - Notification state and handlers
 */
export const useNotification = () => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((notification) => {
    const id = Date.now().toString()
    const newNotification = {
      id,
      type: 'info', // info, success, warning, error
      autoHide: true,
      duration: 5000,
      ...notification,
    }

    setNotifications((prev) => [...prev, newNotification])

    // Auto-hide notification
    if (newNotification.autoHide) {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id))
      }, newNotification.duration)
    }

    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  // Convenience methods
  const success = useCallback(
    (message, options = {}) => {
      return addNotification({ type: 'success', message, ...options })
    },
    [addNotification]
  )

  const error = useCallback(
    (message, options = {}) => {
      return addNotification({
        type: 'error',
        message,
        autoHide: false,
        ...options,
      })
    },
    [addNotification]
  )

  const warning = useCallback(
    (message, options = {}) => {
      return addNotification({ type: 'warning', message, ...options })
    },
    [addNotification]
  )

  const info = useCallback(
    (message, options = {}) => {
      return addNotification({ type: 'info', message, ...options })
    },
    [addNotification]
  )

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
  }
}
