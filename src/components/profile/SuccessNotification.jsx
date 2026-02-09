import { X } from 'lucide-react'

/**
 * SuccessNotification Component
 * Success notification banner for profile save
 * 
 * Props:
 * @param {boolean} isVisible - Whether notification is visible
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {Function} onClose - Function to close notification
 */
function SuccessNotification({ isVisible, title, message, onClose }) {
  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:bottom-6 lg:right-6 lg:left-auto lg:w-auto z-[20002] px-3 pb-3 lg:px-0 lg:pb-0">
      <div className="bg-green-600 rounded-lg p-3 lg:p-5 shadow-lg flex items-start justify-between gap-3 lg:gap-4 w-full lg:max-w-sm">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-poppins font-semibold text-sm lg:text-lg text-white mb-0.5 lg:mb-1">
            {title}
          </h3>
          <p className="font-poppins font-normal text-xs lg:text-base text-white/90 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-4 h-4 lg:w-6 lg:h-6 flex items-center justify-center text-white hover:text-white/80 transition-colors shrink-0 mt-0.5"
          aria-label="Close"
        >
          <X size={16} className="lg:w-5 lg:h-5" />
        </button>
      </div>
    </div>
  )
}

export default SuccessNotification

