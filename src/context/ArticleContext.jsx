import { createContext, useContext, useState, useCallback } from 'react'
import articlesAPI from '../api/articles'
import { formatDate, formatArticlesDates } from '../utils/dateFormatter'

/**
 * ArticleContext
 * Global state management for articles
 */
const ArticleContext = createContext(null)

/**
 * ArticleProvider Component
 * Provides article state and functions to children
 */
export function ArticleProvider({ children }) {
  const [articles, setArticles] = useState([])
  const [currentArticle, setCurrentArticle] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Fetch articles with pagination
   */
  const fetchArticles = useCallback(async (category = null, page = 1, limit = 6) => {
    try {
      setLoading(true)
      setError(null)
      
      const categoryParam = category === "highlight" ? null : category
      const response = await articlesAPI.getArticles(categoryParam, page, limit)
      const formattedPosts = formatArticlesDates(response.posts)
      
      return {
        posts: formattedPosts,
        currentPage: response.currentPage,
        totalPages: response.totalPages
      }
    } catch (err) {
      console.error('Error fetching articles:', err)
      setError(err.message || 'Failed to load articles')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Fetch a single article by ID
   */
  const fetchArticleById = useCallback(async (id) => {
    try {
      setLoading(true)
      setError(null)
      
      const fetchedArticle = await articlesAPI.getArticleById(id)
      const formattedArticle = {
        ...fetchedArticle,
        date: formatDate(fetchedArticle.date)
      }
      
      setCurrentArticle(formattedArticle)
      return formattedArticle
    } catch (err) {
      console.error('Error fetching article:', err)
      setError(err.message || 'Article not found')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Search articles
   */
  const searchArticles = useCallback(async (query) => {
    try {
      setLoading(true)
      setError(null)
      
      const results = await articlesAPI.searchArticles(query)
      return results
    } catch (err) {
      console.error('Error searching articles:', err)
      setError(err.message || 'Failed to search articles')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Clear current article
   */
  const clearCurrentArticle = useCallback(() => {
    setCurrentArticle(null)
  }, [])

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value = {
    articles,
    currentArticle,
    loading,
    error,
    fetchArticles,
    fetchArticleById,
    searchArticles,
    clearCurrentArticle,
    clearError,
    setArticles,
    setCurrentArticle
  }

  return (
    <ArticleContext.Provider value={value}>
      {children}
    </ArticleContext.Provider>
  )
}

/**
 * useArticleContext Hook
 * Access article context
 */
export function useArticleContext() {
  const context = useContext(ArticleContext)
  if (!context) {
    throw new Error('useArticleContext must be used within ArticleProvider')
  }
  return context
}

