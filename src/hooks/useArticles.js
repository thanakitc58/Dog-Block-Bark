import { useState, useEffect, useRef } from 'react'
import articlesAPI from '../api/articles'
import { formatDate, formatArticlesDates } from '../utils/dateFormatter'

/**
 * Custom hook for fetching articles with pagination
 * @param {string} category - Category filter (null for all)
 * @param {number} limit - Number of articles per page (default: 6)
 * @returns {Object} Articles state and functions
 */
export function useArticles(category = null, limit = 6) {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const isLoadingRef = useRef(false)

  // Reset posts when category changes
  useEffect(() => {
    setPosts([])
    setPage(1)
    setHasMore(true)
    setLoading(true)
    isLoadingRef.current = false
  }, [category])

  // Fetch articles when page or category changes
  useEffect(() => {
    const fetchPosts = async () => {
      // Prevent duplicate calls
      if (isLoadingRef.current) return

      isLoadingRef.current = true
      setIsLoadingMore(true)
      
      try {
        setError(null)
        
        // Fetch articles with pagination
        const categoryParam = category === "highlight" ? null : category
        const response = await articlesAPI.getArticles(categoryParam, page, limit)
        
        // Format dates from ISO 8601 to readable format
        const formattedPosts = formatArticlesDates(response.posts)
        
        // Check if there's data
        if (!formattedPosts || formattedPosts.length === 0) {
          setHasMore(false)
          return
        }
        
        // Remove duplicates within the new posts array itself
        const seenIds = new Set()
        const uniqueFormattedPosts = formattedPosts.filter(post => {
          if (seenIds.has(post.id)) {
            return false
          }
          seenIds.add(post.id)
          return true
        })
        
        // Append new posts to existing posts, filtering out duplicates by id
        setPosts((prevPosts) => {
          const existingIds = new Set(prevPosts.map(post => post.id))
          const uniqueNewPosts = uniqueFormattedPosts.filter(post => !existingIds.has(post.id))
          return [...prevPosts, ...uniqueNewPosts]
        })
        
        // Check if reached last page
        if (response.currentPage >= response.totalPages || formattedPosts.length < limit) {
          setHasMore(false)
        }
      } catch (err) {
        console.error('Error fetching articles:', err)
        setError('Failed to load articles')
      } finally {
        isLoadingRef.current = false
        setIsLoadingMore(false)
        setLoading(false)
      }
    }

    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category])

  /**
   * Load more articles (increment page)
   */
  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  /**
   * Refresh articles (reset and fetch from page 1)
   */
  const refresh = () => {
    setPosts([])
    setPage(1)
    setHasMore(true)
    setLoading(true)
    isLoadingRef.current = false
  }

  return {
    posts,
    loading,
    isLoadingMore,
    error,
    hasMore,
    page,
    loadMore,
    refresh
  }
}

/**
 * Custom hook for fetching a single article by ID
 * @param {string|number} id - Article ID
 * @returns {Object} Article state and loading/error states
 */
export function useArticle(id) {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        const fetchedArticle = await articlesAPI.getArticleById(id)
        
        // Format date from ISO 8601 to readable format
        const formattedArticle = {
          ...fetchedArticle,
          date: formatDate(fetchedArticle.date)
        }
        
        setArticle(formattedArticle)
      } catch (err) {
        console.error('Error fetching article:', err)
        setError(err.message || 'Article not found')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  /**
   * Refresh article data
   */
  const refresh = async () => {
    if (!id) return

    try {
      setLoading(true)
      setError(null)
      
      const fetchedArticle = await articlesAPI.getArticleById(id)
      
      const formattedArticle = {
        ...fetchedArticle,
        date: formatDate(fetchedArticle.date)
      }
      
      setArticle(formattedArticle)
    } catch (err) {
      console.error('Error refreshing article:', err)
      setError(err.message || 'Article not found')
    } finally {
      setLoading(false)
    }
  }

  return {
    article,
    loading,
    error,
    refresh
  }
}

/**
 * Custom hook for searching articles
 * @param {string} query - Search query string
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 300)
 * @returns {Object} Search results and loading state
 */
export function useArticleSearch(query, debounceMs = 300) {
  const [suggestions, setSuggestions] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Reset if query is empty
    if (!query || query.trim() === '') {
      setSuggestions([])
      setIsSearching(false)
      setError(null)
      return
    }

    // Set loading state
    setIsSearching(true)
    setError(null)

    // Debounce search
    timeoutRef.current = setTimeout(async () => {
      try {
        const results = await articlesAPI.searchArticles(query.trim())
        setSuggestions(results)
      } catch (err) {
        console.error('Error searching articles:', err)
        setError('Failed to search articles')
        setSuggestions([])
      } finally {
        setIsSearching(false)
      }
    }, debounceMs)

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [query, debounceMs])

  /**
   * Clear search results
   */
  const clearSearch = () => {
    setSuggestions([])
    setIsSearching(false)
    setError(null)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  return {
    suggestions,
    isSearching,
    error,
    clearSearch
  }
}
