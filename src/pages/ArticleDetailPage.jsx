import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ArticleDetail from '../components/article/ArticleDetail'
import articlesAPI from '../api/articles'
import { formatDate } from '../utils/dateFormatter'

/**
 * ArticleDetailPage Component
 * Displays article detail page based on URL parameter
 * Route: /article/:id
 */
function ArticleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch article from API
  useEffect(() => {
    const fetchArticle = async () => {
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
        setError('Article not found')
        // Redirect to home after a short delay
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchArticle()
    }
  }, [id, navigate])

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  // Handle back navigation
  const handleBack = () => {
    navigate('/')
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <p className="text-brown-400">Loading article...</p>
      </div>
    )
  }

  // Error state
  if (error || !article) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <p className="text-red-500">{error || 'Article not found'}</p>
      </div>
    )
  }

  return (
    <ArticleDetail article={article} onBack={handleBack} />
  )
}

export default ArticleDetailPage

