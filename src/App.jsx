import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

/**
 * App Component
 * Main application component with routing setup
 * 
 * Routes:
 * - / : Home page with article list
 * - /article/:id : Article detail page
 * - /signup : Sign up page
 * - /login : Login page
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<HomePage />} />
        
        {/* Article Detail Page Route */}
        <Route path="/article/:id" element={<ArticleDetailPage />} />
        
        {/* Sign Up Page Route */}
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Login Page Route */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
