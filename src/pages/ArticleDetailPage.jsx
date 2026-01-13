import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ArticleDetail from '../components/article/ArticleDetail'
import blogPosts from '../data/blogPosts'

/**
 * ArticleDetailPage Component
 * Displays article detail page based on URL parameter
 * Route: /article/:id
 */
function ArticleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Find article by ID
  const article = blogPosts.find(post => post.id === parseInt(id))

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  // Redirect to home if article not found
  useEffect(() => {
    if (!article) {
      navigate('/')
    }
  }, [article, navigate])

  // Handle back navigation
  const handleBack = () => {
    navigate('/')
  }

  // Show nothing while redirecting
  if (!article) {
    return null
  }

  return (
    <ArticleDetail article={article} onBack={handleBack} />
  )
}

export default ArticleDetailPage

