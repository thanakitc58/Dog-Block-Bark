import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import ProfilePage from './pages/ProfilePage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import RegistrationSuccessPage from './pages/RegistrationSuccessPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProfilePage from './pages/admin/AdminProfilePage'
import AdminResetPasswordPage from './pages/admin/AdminResetPasswordPage'
import HealthTestPage from './pages/HealthTestPage'
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
    <AuthProvider>
      <Router>
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<HomePage />} />
          
          {/* Article List Page Route */}
          <Route path="/article" element={<HomePage />} />
          
          {/* Article Detail Page Route */}
          <Route path="/article/:id" element={<ArticleDetailPage />} />
          
          {/* Profile Page Route */}
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Reset Password Page Route */}
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* Sign Up Page Route */}
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* Login Page Route */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Registration Success Page Route */}
          <Route path="/success" element={<RegistrationSuccessPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/categories" element={<AdminDashboard />} />
          <Route path="/admin/notifications" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
          <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />
          <Route path="/test-health" element={<HealthTestPage />} />
          {/* Catch all - redirect to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Toaster position="bottom-right" richColors />
      </Router>
    </AuthProvider>
  )
}

export default App
