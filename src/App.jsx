import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ArticleDetailPage from './pages/ArticleDetailPage'

/**
 * App Component
 * Main application component with routing setup
 * 
 * Routes:
 * - / : Home page with article list
 * - /article/:id : Article detail page
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<HomePage />} />
        
        {/* Article Detail Page Route */}
        <Route path="/article/:id" element={<ArticleDetailPage />} />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
