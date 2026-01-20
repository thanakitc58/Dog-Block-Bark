import NavBar from '../components/NavBar/NavBar'
import LoginForm from '../components/auth/LoginForm'
import { useScrollToTop } from '../hooks/useScrollToTop'

/**
 * LoginPage Component
 * Login page with form
 * Route: /login
 */
function LoginPage() {
  // Scroll to top when component mounts
  useScrollToTop()

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      <NavBar />
      <div className="pt-[48px] lg:pt-[120px] flex items-center justify-center min-h-[calc(100vh-48px)] lg:min-h-[calc(100vh-80px)] px-4 py-8">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage

