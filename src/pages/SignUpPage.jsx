import NavBar from '../components/NavBar/NavBar'
import SignUpForm from '../components/auth/SignUpForm'
import { useScrollToTop } from '../hooks/useScrollToTop'

/**
 * SignUpPage Component
 * Sign up page with form
 * Route: /signup
 */
function SignUpPage() {
  // Scroll to top when component mounts
  useScrollToTop()

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      <NavBar />
      <div className="pt-[48px] lg:pt-[120px] flex items-center justify-center min-h-[calc(100vh-48px)] lg:min-h-[calc(100vh-80px)] px-4 py-8">
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUpPage

