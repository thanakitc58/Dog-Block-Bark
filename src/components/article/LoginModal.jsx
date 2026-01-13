import { X } from 'lucide-react'

/**
 * LoginModal Component
 * Modal dialog prompting user to create account or login
 * 
 * Props:
 * @param {boolean} isOpen - Whether modal is open
 * @param {Function} onClose - Function to close modal
 * @param {Function} onCreateAccount - Function to handle create account
 * @param {Function} onLogin - Function to handle login
 */
function LoginModal({ isOpen, onClose, onCreateAccount, onLogin }) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop - Semi-transparent overlay */}
      <div 
        className="fixed inset-0 z-[20000]"
        style={{ backgroundColor: '#00000066' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-[270px] left-1/2 -translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 w-[343px] lg:w-auto lg:max-w-[500px] min-h-[272px] lg:min-h-auto bg-[#F9F8F6] rounded-2xl pt-4 pr-4 pb-10 pl-4 lg:p-6 lg:pb-10 flex flex-col items-center justify-center gap-6 lg:gap-6 z-[20001]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-brown-600 hover:text-brown-800 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="w-[311px] lg:w-auto lg:max-w-full mx-auto h-[168px] lg:h-auto lg:min-h-auto flex flex-col items-center justify-center gap-4">
          {/* Title */}
          <h2 className="font-poppins font-semibold text-[24px] leading-[32px] tracking-[0%] text-center text-brown-600">
            Create an account to continue
          </h2>

          {/* Button and Link */}
          <div className="flex flex-col items-center gap-4">
            {/* Create Account Button */}
            <button
              onClick={onCreateAccount}
              className="w-[207px] lg:w-auto lg:min-w-[207px] h-12 pt-3 pr-10 pb-3 pl-10 gap-1.5 bg-brown-600 text-white font-poppins font-medium text-[16px] leading-[24px] tracking-[0%] rounded-full hover:bg-brown-500 transition-colors"
            >
              Create account
            </button>

            {/* Login Link */}
            <div className="flex items-center gap-3">
              <span className="font-poppins font-medium text-[16px] leading-[24px] tracking-[0%] text-brown-600">
                Already have an account?
              </span>
              <button
                onClick={onLogin}
                className="font-poppins font-medium text-[16px] leading-[24px] tracking-[0%] text-brown-600 underline hover:text-brown-800 transition-colors"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginModal

