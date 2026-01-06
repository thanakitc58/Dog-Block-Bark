import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import HeroSection from './components/HeroSection/HeroSection'
import Footer from './components/footer/footer'
import Article from './components/article/index'
import ArticleDetail from './components/article/ArticleDetail'
import blogPosts from './data/blogPosts'

function App() {
  const [selectedArticleId, setSelectedArticleId] = useState(null)

  const handleArticleClick = (articleId) => {
    setSelectedArticleId(articleId)
    // Scroll to top when navigating to article detail
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToHome = () => {
    setSelectedArticleId(null)
    // Scroll to top when going back to home
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Find selected article
  const selectedArticle = selectedArticleId 
    ? blogPosts.find(post => post.id === selectedArticleId)
    : null

  return (
    <div>
      {selectedArticle ? (
        // Show Article Detail Page
        <ArticleDetail article={selectedArticle} onBack={handleBackToHome} />
      ) : (
        // Show Home Page
        <>
          <NavBar onLogoClick={handleBackToHome} />
          <HeroSection />
          <Article onArticleClick={handleArticleClick} />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
