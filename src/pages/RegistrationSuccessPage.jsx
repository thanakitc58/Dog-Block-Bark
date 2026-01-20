import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar'
import { useScrollToTop } from '../hooks/useScrollToTop'

/**
 * RegistrationSuccessPage Component
 * Success page after successful login/registration
 * Route: /success
 */
function RegistrationSuccessPage() {
  const navigate = useNavigate()

  // Scroll to top when component mounts
  useScrollToTop()

  const handleContinue = () => {
    // Navigate to home page
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      <NavBar />
      <div className="pt-[100px] lg:pt-[120px] flex items-start justify-center min-h-[calc(100vh-48px)] lg:min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-[375px] lg:max-w-[500px] bg-[#EFEEEB] rounded-2xl p-6 lg:p-8 flex flex-col items-center gap-6">
          {/* Success Icon */}
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-500 rounded-full flex items-center justify-center">
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="lg:w-10 lg:h-10"
            >
              <path 
                d="M20 6L9 17L4 12" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="font-poppins font-semibold text-[28px] lg:text-[32px] leading-[36px] lg:leading-[40px] tracking-[0%] text-brown-600 text-center">
            Registration success
          </h1>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-auto px-8 h-12 bg-brown-600 text-white font-poppins font-medium text-[16px] leading-[24px] tracking-[0%] rounded-full hover:bg-brown-500 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegistrationSuccessPage

