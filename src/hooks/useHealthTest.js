import { useState, useCallback } from 'react'
import healthAPI from '../api/health'

/**
 * Custom Hook: useHealthTest
 * จัดการ state และ logic การทดสอบ API แยกจาก UI
 * - High cohesion: เรื่อง health test อยู่ที่เดียว
 * - Low coupling: ไม่รู้ว่า UI แสดงผลอย่างไร
 */
export function useHealthTest() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  const testHealth = useCallback(async () => {
    setResult(null)
    setError(null)
    setLoading(true)

    try {
      const data = await healthAPI.fetchPosts()
      setResult(data)
    } catch (err) {
      setError({
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      })
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    result,
    error,
    loading,
    testHealth,
    reset
  }
}
