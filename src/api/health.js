import axios from 'axios'
import { API_BASE_URL } from '../constants/api'

/**
 * Health API – รับผิดชอบเฉพาะการเรียก test endpoints (health test page)
 */
export const healthAPI = {
  /**
   * ทดสอบดึงข้อมูล posts (สำหรับ health test page)
   * @param {string} [baseUrl=API_BASE_URL]
   * @returns {Promise<Object>} response data
   */
  async fetchPosts(baseUrl = API_BASE_URL) {
    const url = `${baseUrl.replace(/\/$/, '')}/posts`
    const { data } = await axios.get(url, { timeout: 10000 })
    return data
  }
}

export default healthAPI
