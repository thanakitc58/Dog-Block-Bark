import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import { useAuth } from '../../context/AuthContext'

/**
 * AdminResetPasswordPage Component
 * Reset password page for admin panel
 */
function AdminResetPasswordPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isAdmin = user?.role && user.role.toLowerCase() === 'admin'
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isResetting, setIsResetting] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  useEffect(() => {
    // Check if user is admin
    if (!user || !isAdmin) {
      console.log('No user, redirecting to login', { user })
      navigate('/admin/login')
      return
    }
  }, [user, isAdmin, navigate])

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

    setIsResetting(true)

    try {
      // TODO: Call API to reset password
      console.log('Reset password:', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      })
      
      // Show success message (optional)
      console.log('Password reset successfully')
      
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

  if (!user || !isAdmin) {
    console.log('No user or not admin, returning null', { user, isAdmin })
    return null
  }

  return (
    <>
      {/* Mobile Message */}
      <div className="lg:hidden min-h-screen bg-[#F9F8F6] flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brown-600 mb-2">Admin Panel</h1>
          <p className="text-brown-600">Please use a larger screen (lg and above) to access the admin panel.</p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="min-h-screen bg-[#F9F8F6] hidden lg:flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <AdminHeader title="Reset password" />

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="w-[1160px] ml-[100px] min-h-[656px] px-[60px] pt-10 pb-[120px] flex flex-col gap-10">
              {/* Top Bar with Reset Button */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-brown-900">Reset password</h2>
              </div>

              {/* Form */}
              <form onSubmit={handleResetPassword} className="flex flex-col gap-6 max-w-md">
                {/* Reset Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isResetting}
                    className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isResetting ? 'Resetting...' : 'Reset password'}
                  </button>
                </div>
                {/* Current Password Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="current-password" className="font-sans text-sm font-medium text-brown-600">
                    Current password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      id="current-password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white text-brown-600 font-sans text-base leading-6 placeholder-brown-400 focus:outline-none focus:ring-2 ${
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
                    <p className="font-sans text-sm leading-5 text-red-600">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                {/* New Password Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="new-password" className="font-sans text-sm font-medium text-brown-600">
                    New password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      id="new-password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white text-brown-600 font-sans text-base leading-6 placeholder-brown-400 focus:outline-none focus:ring-2 ${
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
                    <p className="font-sans text-sm leading-5 text-red-600">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm New Password Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="confirm-password" className="font-sans text-sm font-medium text-brown-600">
                    Confirm new password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      id="confirm-password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full h-12 px-4 pr-12 rounded-lg border bg-white text-brown-600 font-sans text-base leading-6 placeholder-brown-400 focus:outline-none focus:ring-2 ${
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
                    <p className="font-sans text-sm leading-5 text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminResetPasswordPage

