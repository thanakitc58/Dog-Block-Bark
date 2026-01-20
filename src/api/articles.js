import axios from 'axios'

const BASE_URL = 'https://blog-post-project-api.vercel.app'

/**
 * API service for articles
 */
export const articlesAPI = {
  /**
   * Get all articles or filter by category with pagination
   * @param {string} category - Optional category filter (if "highlight", returns all)
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Number of articles per page (default: 6)
   * @returns {Promise<Object>} Object with posts array, currentPage, and totalPages
   */
  async getArticles(category = null, page = 1, limit = 6) {
    try {
      const params = {
        page,
        limit
      }
      
      // If category is provided and not "highlight", add it as query parameter
      if (category && category !== 'highlight') {
        params.category = category
      }
      
      const response = await axios.get(`${BASE_URL}/posts`, { params })
      
      // Handle pagination response structure
      // Expected structure: { posts: [...], currentPage, totalPages }
      if (response.data && response.data.posts) {
        return {
          posts: response.data.posts,
          currentPage: response.data.currentPage || page,
          totalPages: response.data.totalPages || 1
        }
      }
      
      // Fallback: if response.data is an array (backward compatibility)
      if (Array.isArray(response.data)) {
        return {
          posts: response.data,
          currentPage: 1,
          totalPages: 1
        }
      }
      
      // Fallback: if response.data has a data property
      if (response.data && Array.isArray(response.data.data)) {
        return {
          posts: response.data.data,
          currentPage: response.data.currentPage || page,
          totalPages: response.data.totalPages || 1
        }
      }
      
      // Fallback: return empty array if structure is unexpected
      console.warn('Unexpected API response structure:', response.data)
      return {
        posts: [],
        currentPage: 1,
        totalPages: 1
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
      // Return more detailed error information
      if (error.response) {
        // Server responded with error status
        throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`)
      } else if (error.request) {
        // Request made but no response received
        throw new Error('Network Error: Could not reach the API server')
      } else {
        // Something else happened
        throw new Error(`Error: ${error.message}`)
      }
    }
  },

  /**
   * Search articles by title, description, or content
   * @param {string} query - Search query string
   * @returns {Promise<Array>} Array of matching articles
   */
  async searchArticles(query) {
    try {
      if (!query || query.trim() === '') {
        return []
      }

      // Try different API endpoints for search
      let response
      try {
        // Try /posts/search endpoint first
        response = await axios.get(`${BASE_URL}/posts/search`, {
          params: {
            q: query.trim()
          }
        })
      } catch (searchError) {
        // Fallback to /posts with search parameter
        try {
          response = await axios.get(`${BASE_URL}/posts`, {
            params: {
              search: query.trim()
            }
          })
        } catch (postsError) {
          // Try with 'q' parameter
          response = await axios.get(`${BASE_URL}/posts`, {
            params: {
              q: query.trim()
            }
          })
        }
      }

      // Handle different response structures
      if (Array.isArray(response.data)) {
        return response.data
      } else if (response.data && Array.isArray(response.data.posts)) {
        return response.data.posts
      } else if (response.data && Array.isArray(response.data.data)) {
        return response.data.data
      } else if (response.data && response.data.results && Array.isArray(response.data.results)) {
        return response.data.results
      }

      return []
    } catch (error) {
      console.error('Error searching articles:', error)
      // Return empty array on error instead of throwing
      return []
    }
  },

  /**
   * Get a single article by ID
   * @param {number|string} id - Article ID
   * @returns {Promise<Object>} Article object
   */
  async getArticleById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${id}`)
      
      // Handle different response structures
      if (response.data && typeof response.data === 'object') {
        // If response.data is the article object directly
        if (response.data.id || response.data.title) {
          return response.data
        }
        // If response.data has a data property
        if (response.data.data) {
          return response.data.data
        }
        // If response.data has a post property
        if (response.data.post) {
          return response.data.post
        }
      }
      
      throw new Error('Unexpected API response structure')
    } catch (error) {
      console.error('Error fetching article:', error)
      // Return more detailed error information
      if (error.response) {
        // Server responded with error status (e.g., 404)
        if (error.response.status === 404) {
          throw new Error('Article not found')
        }
        throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`)
      } else if (error.request) {
        // Request made but no response received
        throw new Error('Network Error: Could not reach the API server')
      } else {
        // Something else happened
        throw error
      }
    }
  }
}

export default articlesAPI

