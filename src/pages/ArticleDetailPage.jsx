import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ArticleDetail from '../components/article/ArticleDetail'
import { useArticle } from '../hooks/useArticles'
import { useScrollToTop } from '../hooks/useScrollToTop'

/**
 * ArticleDetailPage Component
 * Displays article detail page based on URL parameter
 * Route: /article/:id
 */
function ArticleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { article, loading, error } = useArticle(id)

  // Scroll to top when id changes
  useScrollToTop(true, 'smooth', [id])

  // Redirect to home on error
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [error, navigate])

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

