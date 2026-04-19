import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Bell, ChevronDown, User, LogOut, RotateCcw } from 'lucide-react'
import articlesAPI from '../../api/articles'

function formatNotificationTime(isoDate) {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minutes ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

/**
 * UserMenu Component
 * Displays user avatar, notifications, and dropdown menu
 * Works for both desktop and mobile
 */
function UserMenu({ onCloseMenu }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [loadingNotifications, setLoadingNotifications] = useState(false)
  const dropdownRef = useRef(null)
  const notificationRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleBellClick = () => {
    setIsNotificationOpen((prev) => {
      if (!prev) {
        setLoadingNotifications(true)
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
        articlesAPI
          .getMyNotifications(token)
          .then((list) => setNotifications(Array.isArray(list) ? list : []))
          .catch(() => setNotifications([]))
          .finally(() => setLoadingNotifications(false))
      }
      return !prev
    })
    setIsDropdownOpen(false)
  }

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
          {/* Notifications Bell + Panel */}
          <div className="relative" ref={notificationRef}>
            <button
              type="button"
              onClick={handleBellClick}
              className="relative w-10 h-10 flex items-center justify-center text-brown-600 hover:text-brown-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-[320px] max-h-[400px] overflow-auto bg-white rounded-xl shadow-lg border border-brown-200 py-2 z-50">
                {loadingNotifications ? (
                  <p className="px-4 py-6 text-brown-500 text-sm">Loading...</p>
                ) : notifications.length === 0 ? (
                  <p className="px-4 py-6 text-brown-500 text-sm">No notifications.</p>
                ) : (
                  <ul className="divide-y divide-brown-100">
                    {notifications.map((n) => (
                      <li key={n.id}>
                        <Link
                          to={`/article/${n.postId}`}
                          onClick={() => { setIsNotificationOpen(false); onCloseMenu?.(); }}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-brown-50 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-brown-200 flex items-center justify-center overflow-hidden shrink-0">
                            {n.user?.avatar ? (
                              <img src={n.user.avatar} alt={n.user.name || ''} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-brown-600 font-medium text-sm">{n.user?.name?.charAt(0) || 'A'}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-brown-900">
                              <span className="font-semibold">{n.user?.name || 'Admin'}</span>{' '}
                              {n.type === 'new_article' ? 'Published new article.' : 'Comment on the article you have commented on.'}
                            </p>
                            <p className="text-xs text-orange-600 mt-0.5">{formatNotificationTime(n.createdAt)}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
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
      {/* Notifications Bell + Panel */}
      <div className="relative" ref={notificationRef}>
        <button
          type="button"
          onClick={handleBellClick}
          className="relative w-10 h-10 flex items-center justify-center text-brown-600 hover:text-brown-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
        </button>
        {isNotificationOpen && (
          <div className="absolute right-0 mt-2 w-[320px] max-h-[400px] overflow-auto bg-white rounded-xl shadow-lg border border-brown-200 py-2 z-50">
            {loadingNotifications ? (
              <p className="px-4 py-6 text-brown-500 text-sm">Loading...</p>
            ) : notifications.length === 0 ? (
              <p className="px-4 py-6 text-brown-500 text-sm">No notifications.</p>
            ) : (
              <ul className="divide-y divide-brown-100">
                {notifications.map((n) => (
                  <li key={n.id}>
                    <Link
                      to={`/article/${n.postId}`}
                      onClick={() => setIsNotificationOpen(false)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-brown-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-brown-200 flex items-center justify-center overflow-hidden shrink-0">
                        {n.user?.avatar ? (
                          <img src={n.user.avatar} alt={n.user.name || ''} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-brown-600 font-medium text-sm">{n.user?.name?.charAt(0) || 'A'}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-brown-900">
                          <span className="font-semibold">{n.user?.name || 'Admin'}</span>{' '}
                          {n.type === 'new_article' ? 'Published new article.' : 'Comment on the article you have commented on.'}
                        </p>
                        <p className="text-xs text-orange-600 mt-0.5">{formatNotificationTime(n.createdAt)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

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
                <span>Admin panel</span>
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

