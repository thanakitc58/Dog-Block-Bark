import { useEffect } from 'react'
import NavBar from '../components/NavBar/NavBar'
import HeroSection from '../components/HeroSection/HeroSection'
import Footer from '../components/footer/footer'
import Article from '../components/article/index'

/**
 * HomePage Component
 * Landing page with hero section and article list
 */
function HomePage() {
  // Scroll to top when component mounts (when navigating to home)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      <NavBar />
      <HeroSection />
      <Article />
      <Footer />
    </>
  )
}

export default HomePage

