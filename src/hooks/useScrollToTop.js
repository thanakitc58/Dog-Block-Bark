import { useEffect } from 'react'

/**
 * Custom hook to scroll to top when component mounts or dependencies change
 * @param {boolean} enabled - Whether to enable scroll to top (default: true)
 * @param {string} behavior - Scroll behavior: 'smooth' | 'auto' (default: 'smooth')
 * @param {Array} dependencies - Optional dependency array (default: [])
 */
export function useScrollToTop(enabled = true, behavior = 'smooth', dependencies = []) {
  useEffect(() => {
    if (enabled) {
      window.scrollTo({ top: 0, behavior })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, behavior, ...dependencies])
}

