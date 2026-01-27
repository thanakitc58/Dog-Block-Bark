import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/footer/footer'
import { useAuth } from '../context/AuthContext'
import { useScrollToTop } from '../hooks/useScrollToTop'
import ResetPasswordConfirmModal from '../components/profile/ResetPasswordConfirmModal'
import SuccessModal from '../components/profile/SuccessModal'
import { User, RotateCcw, Eye, EyeOff } from 'lucide-react'

/**
 * ResetPasswordPage Component
 * Reset password page with current password, new password, and confirm password fields
 */
function ResetPasswordPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('reset-password')
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isResetting, setIsResetting] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  useScrollToTop()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    // Current password validation
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required'
      isValid = false
    }

    // New password validation
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required'
      isValid = false
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters'
      isValid = false
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your new password'
      isValid = false
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Show confirmation modal instead of directly resetting
    setShowConfirmModal(true)
  }

  const handleConfirmReset = async () => {
    setShowConfirmModal(false)
    setIsResetting(true)

    try {
      // TODO: Call API to reset password
      console.log('Reset password:', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      })
      
      // Show success modal
      setShowSuccessModal(true)
      
      // Clear form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      console.error('Error resetting password:', error)
    } finally {
      setIsResetting(false)
    }
  }

  const handleProfile = () => {
    navigate('/profile')
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col">
      <NavBar />
      
      <div className="flex-1 pt-[48px] lg:pt-[50px] pb-10">
        {/* Mobile Layout */}
        <div className="lg:hidden w-full px-4">
          {/* Tabs */}
          <div className="flex items-center gap-4 mb-6 border-b border-brown-200">
            <button
              onClick={handleProfile}
              className="flex items-center gap-2 px-4 py-3 border-b-2 border-transparent text-brown-400 hover:text-brown-600 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="font-sans text-[16px] font-medium">Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('reset-password')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'reset-password'
                  ? ' text-brown-600 font-semibold'
                  : 'border-transparent text-brown-400'
              }`}
            >
              <RotateCcw className="w-5 h-5" />
              <span className="font-sans text-[16px] font-medium">Reset password</span>
            </button>
          </div>

          {/* Profile Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || 'User'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-brown-600 font-medium text-sm">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <span className="font-sans text-[16px] font-medium text-brown-600">
              {user.name || 'User'}
            </span>
            <span className="text-brown-400">|</span>
            <span className="font-sans text-[16px] font-semibold text-brown-600">Reset password</span>
          </div>

          {/* Reset Password Form */}
          <div className="bg-white rounded-2xl p-6">
            <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
              {/* Current Password Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="current-password" className="font-sans text-[14px] font-medium text-brown-400">
                  Current password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    id="current-password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white text-brown-600 font-sans text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 ${
                      errors.currentPassword
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-brown-300 focus:ring-brown-600 focus:border-transparent'
                    }`}
                    placeholder="Current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brown-600 rounded p-1"
                    aria-label={showPasswords.current ? 'Hide password' : 'Show password'}
                  >
                    {showPasswords.current ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="font-sans text-[14px] leading-[20px] text-red-600">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="new-password" className="font-sans text-[14px] font-medium text-brown-400">
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    id="new-password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white text-brown-600 font-sans text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 ${
                      errors.newPassword
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-brown-300 focus:ring-brown-600 focus:border-transparent'
                    }`}
                    placeholder="New password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brown-600 rounded p-1"
                    aria-label={showPasswords.new ? 'Hide password' : 'Show password'}
                  >
                    {showPasswords.new ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="font-sans text-[14px] leading-[20px] text-red-600">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm New Password Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="confirm-password" className="font-sans text-[14px] font-medium text-brown-400">
                  Confirm new password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    id="confirm-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white text-brown-600 font-sans text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 ${
                      errors.confirmPassword
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-brown-300 focus:ring-brown-600 focus:border-transparent'
                    }`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brown-600 rounded p-1"
                    aria-label={showPasswords.confirm ? 'Hide password' : 'Show password'}
                  >
                    {showPasswords.confirm ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="font-sans text-[14px] leading-[20px] text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Reset Password Button */}
              <button
                type="submit"
                disabled={isResetting}
                className="w-full lg:w-[100px] h-12 bg-black text-white rounded-lg font-sans text-[16px] font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4 whitespace-nowrap"
              >
                {isResetting ? 'Resetting...' : 'Reset password'}
              </button>
            </form>
          </div>
        </div>

        {/* Desktop Layout (lg+) */}
        <div className="hidden lg:flex w-full max-w-[1200px] mx-auto px-[120px] gap-8">
          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <nav className="flex flex-col gap-0 rounded-lg p-2">
              <button
                onClick={handleProfile}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-brown-400 hover:bg-gray-50 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="font-sans text-[16px] font-medium">Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('reset-password')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                  activeTab === 'reset-password'
                    ? 'bg-white text-brown-600 font-semibold border-r-2 border-gray-300'
                    : 'text-brown-400 hover:bg-gray-50'
                }`}
              >
                <RotateCcw className="w-5 h-5" />
                <span className="font-sans text-[16px] font-medium">Reset password</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-2xl p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <span className="font-sans text-[16px] font-medium text-brown-600">
                {user.name || 'User'}
              </span>
              <span className="text-brown-400">|</span>
              <span className="font-sans text-[16px] font-semibold text-brown-600">Reset password</span>
            </div>

            {/* Reset Password Form */}
            <form onSubmit={handleResetPassword} className="flex flex-col gap-6">
              {/* Current Password Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="current-password-desktop" className="font-sans text-[14px] font-medium text-brown-400">
                  Current password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    id="current-password-desktop"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white text-brown-600 font-sans text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 ${
                      errors.currentPassword
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-brown-300 focus:ring-brown-600 focus:border-transparent'
                    }`}
                    placeholder="Current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brown-600 rounded p-1"
                    aria-label={showPasswords.current ? 'Hide password' : 'Show password'}
                  >
                    {showPasswords.current ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="font-sans text-[14px] leading-[20px] text-red-600">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="new-password-desktop" className="font-sans text-[14px] font-medium text-brown-400">
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    id="new-password-desktop"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white text-brown-600 font-sans text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 ${
                      errors.newPassword
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-brown-300 focus:ring-brown-600 focus:border-transparent'
                    }`}
                    placeholder="New password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brown-600 rounded p-1"
                    aria-label={showPasswords.new ? 'Hide password' : 'Show password'}
                  >
                    {showPasswords.new ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="font-sans text-[14px] leading-[20px] text-red-600">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm New Password Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="confirm-password-desktop" className="font-sans text-[14px] font-medium text-brown-400">
                  Confirm new password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    id="confirm-password-desktop"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white text-brown-600 font-sans text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 ${
                      errors.confirmPassword
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-brown-300 focus:ring-brown-600 focus:border-transparent'
                    }`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brown-600 rounded p-1"
                    aria-label={showPasswords.confirm ? 'Hide password' : 'Show password'}
                  >
                    {showPasswords.confirm ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="font-sans text-[14px] leading-[20px] text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Reset Password Button */}
              <button
                type="submit"
                disabled={isResetting}
                className="w-[10px] lg:w-[150px] h-12 bg-black text-white rounded-lg font-sans text-[16px] font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 whitespace-nowrap"
              >
                {isResetting ? 'Resetting...' : 'Reset password'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />

      {/* Confirmation Modal */}
      <ResetPasswordConfirmModal 
        isOpen={showConfirmModal} 
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmReset}
      />

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => {
          setShowSuccessModal(false)
          navigate('/profile')
        }} 
      />
    </div>
  )
}

export default ResetPasswordPage

