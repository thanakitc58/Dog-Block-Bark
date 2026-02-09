import { useState, useCallback } from 'react'

/**
 * Custom hook for managing notification state
 * @returns {Object} Notification state and functions
 */
export function useNotification() {
  const [notification, setNotification] = useState({
    isVisible: false,
    title: '',
    message: ''
  })

  /**
   * Show notification
   * @param {string} title - Notification title
   * @param {string} message - Notification message
   */
  const showNotification = useCallback((title, message) => {
    setNotification({
      isVisible: true,
      title,
      message
    })
  }, [])

  /**
   * Hide notification
   */
  const hideNotification = useCallback(() => {
    setNotification({
      isVisible: false,
      title: '',
      message: ''
    })
  }, [])

  return {
    notification,
    showNotification,
    hideNotification
  }
}

