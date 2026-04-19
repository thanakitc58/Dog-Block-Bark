import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FileText, Folder, User, Bell, Lock, ExternalLink, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

/**
 * AdminSidebar Component
 * Left sidebar navigation for admin panel
 */
function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const menuItems = [
    { path: '/admin/dashboard', label: 'Article management', icon: FileText },
    { path: '/admin/categories', label: 'Category management', icon: Folder },
    { path: '/admin/profile', label: 'Profile', icon: User },
    { path: '/admin/notifications', label: 'Notification', icon: Bell },
    { path: '/admin/reset-password', label: 'Reset password', icon: Lock }
  ]

  return (
    <div className="hidden lg:flex w-[280px] h-screen bg-[#EFEEEB] border-r border-[#DAD6D1] flex-col py-4">
      {/* Branding */}
      <div className="px-4 mb-8">
        <h1 className="text-2xl font-bold text-green-700 mb-1">hh.</h1>
        <p className="text-sm text-orange-600">Admin panel</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-300 text-brown-900 font-medium'
                      : 'text-brown-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Links */}
      <div className="px-4 space-y-2 border-t border-[#DAD6D1] pt-4">
        <a
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-brown-600 hover:bg-gray-200 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
          <span className="text-sm">hh. website</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-brown-600 hover:bg-gray-200 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Log out</span>
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar

