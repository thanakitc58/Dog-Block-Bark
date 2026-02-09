import { X } from 'lucide-react'

/**
 * ResetPasswordConfirmModal Component
 * Confirmation modal dialog before resetting password
 * 
 * Props:
 * @param {boolean} isOpen - Whether modal is open
 * @param {Function} onClose - Function to close modal
 * @param {Function} onConfirm - Function to confirm reset password
 */
function ResetPasswordConfirmModal({ isOpen, onClose, onConfirm }) {
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
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] lg:w-auto lg:min-w-[400px] bg-white rounded-2xl shadow-lg flex flex-col z-[20001] p-4 lg:p-6">
        {/* Close Button */}
        <div className="absolute top-3 right-3 lg:top-4 lg:right-4">
          <button
            onClick={onClose}
            className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center text-brown-600 hover:text-brown-800 transition-colors"
            aria-label="Close"
          >
            <X size={18} className="lg:w-5 lg:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6 rounded-lg">
          {/* Title */}
          <h2 className="font-poppins font-bold text-xl lg:text-2xl text-center text-black mb-3 lg:mb-4">
            Reset password
          </h2>

          {/* Question */}
          <p className="font-poppins font-normal text-sm lg:text-base text-center text-gray-600 mb-4 lg:mb-6">
            Do you want to reset your password?
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 lg:gap-4">
            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="px-4 py-2 lg:px-6 lg:py-2 rounded-lg border border-black bg-white text-black font-sans text-[14px] lg:text-[16px] font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            {/* Reset Button */}
            <button
              onClick={onConfirm}
              className="px-4 py-2 lg:px-6 lg:py-2 rounded-lg bg-black text-white font-sans text-[14px] lg:text-[16px] font-medium hover:bg-gray-900 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPasswordConfirmModal

