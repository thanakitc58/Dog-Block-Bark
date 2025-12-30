import './App.css'
import NavBar from './components/NavBar/NavBar'
import HeroSection from './components/HeroSection/HeroSection'
import Footer from './components/footer/footer'
import Article from './components/article/index'  
function App() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <Article />
      <Footer />
    </div>
  )
}

export default App
