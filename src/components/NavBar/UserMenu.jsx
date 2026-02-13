import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, User, LogOut, RotateCcw } from 'lucide-react'

/**
 * UserMenu Component
 * Displays user avatar, notifications, and dropdown menu
 * Works for both desktop and mobile
 */
function UserMenu({ onCloseMenu }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isAdmin = user?.role && user.role.toLowerCase() === 'admin'

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsDropdownOpen(false)
    if (onCloseMenu) onCloseMenu()
  }

  const handleProfile = () => {
    // Navigate to profile page
    navigate('/profile')
    setIsDropdownOpen(false)
    if (onCloseMenu) onCloseMenu()
  }

  const handleResetPassword = () => {
    // Navigate to reset password page
    navigate('/reset-password')
    setIsDropdownOpen(false)
    if (onCloseMenu) onCloseMenu()
  }

  const handleAdminDashboard = () => {
    navigate('/admin/dashboard')
    setIsDropdownOpen(false)
    if (onCloseMenu) onCloseMenu()
  }

  // Mobile layout: Show user profile section at top, then menu options
  if (onCloseMenu) {
    return (
      <div className="w-full flex flex-col gap-4">
        {/* User Profile Section - Mobile */}
        <div className="w-full flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || 'User'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-brown-600 font-medium text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <span className="font-sans text-[16px] font-medium leading-[24px] text-brown-600">
              {user?.username || user?.name || 'User'}
            </span>
          </div>
          {/* Notifications Bell */}
          <button
            className="relative w-10 h-10 flex items-center justify-center text-brown-600 hover:text-brown-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {/* Notification badge - optional */}
            {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
          </button>
        </div>

        {/* Menu Options - Mobile */}
        <div className="w-full flex flex-col gap-2">
          <button
            onClick={handleProfile}
            className="w-full px-4 py-3 text-left text-brown-600 hover:bg-brown-50 flex items-center gap-3 transition-colors font-sans text-[16px] font-medium"
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
          {isAdmin && (
            <button
              onClick={handleAdminDashboard}
              className="w-full px-4 py-3 text-left text-brown-600 hover:bg-brown-50 flex items-center gap-3 transition-colors font-sans text-[16px] font-medium"
            >
              <User className="w-5 h-5" />
              <span>Admin panel</span>
            </button>
          )}
          <button
            onClick={handleResetPassword}
            className="w-full px-4 py-3 text-left text-brown-600 hover:bg-brown-50 flex items-center gap-3 transition-colors font-sans text-[16px] font-medium"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset password</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors font-sans text-[16px] font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    )
  }

  // Desktop layout: Bell icon + Avatar with dropdown
  return (
    <div className="flex items-center gap-4">
      {/* Notifications Bell */}
      <button
        className="relative w-10 h-10 flex items-center justify-center text-brown-600 hover:text-brown-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {/* Notification badge - optional */}
        {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
      </button>

      {/* User Avatar and Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="User menu"
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || 'User'}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-brown-600 font-medium text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            )}
          </div>
          {/* Username */}
          <span className="font-sans text-[16px] font-medium text-brown-600 hidden sm:inline">
            {user?.username || user?.name || 'User'}
          </span>
          {/* Dropdown Arrow */}
          <ChevronDown
            className={`w-4 h-4 text-brown-600 transition-transform ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-brown-200 py-2 z-50">
            <button
              onClick={handleProfile}
              className="w-full px-4 py-2 text-left text-sm text-brown-600 hover:bg-brown-50 flex items-center gap-2 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
            {isAdmin && (
              <button
                onClick={handleAdminDashboard}
                className="w-full px-4 py-2 text-left text-sm text-brown-600 hover:bg-brown-50 flex items-center gap-2 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            )}
            <button
              onClick={handleResetPassword}
              className="w-full px-4 py-2 text-left text-sm text-brown-600 hover:bg-brown-50 flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset password</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserMenu

