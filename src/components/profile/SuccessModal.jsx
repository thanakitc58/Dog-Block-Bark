import { X } from 'lucide-react'

/**
 * SuccessModal Component
 * Modal dialog showing success message after saving profile
 * 
 * Props:
 * @param {boolean} isOpen - Whether modal is open
 * @param {Function} onClose - Function to close modal
 */
function SuccessModal({ isOpen, onClose }) {
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
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[477px] h-[256px] bg-[#F9F8F6] rounded-[16px] pt-4 pr-6 pb-10 pl-6 flex flex-col z-[20001]">
        {/* Close Button */}
        <div className="absolute top-4 right-6">
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center text-brown-600 hover:text-brown-800 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="w-[429px] h-[152px] mx-auto flex flex-col items-center justify-center gap-6">
          {/* Title */}
          <h2 className="font-poppins font-semibold text-[24px] leading-[32px] tracking-[0%] text-center text-brown-600">
            Password reset successfully
          </h2>

          {/* Button Container */}
          <div className="w-[271px] h-12 flex items-center justify-center gap-2">
            {/* OK Button */}
            <button
              onClick={onClose}
              className="w-[138px] h-12 px-10 py-3 rounded-full border border-brown-600 bg-white text-brown-600 font-sans text-[16px] font-medium hover:bg-brown-50 transition-colors flex items-center justify-center gap-1.5"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuccessModal

