import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import ArticleManagement from '../../components/admin/ArticleManagement'
import { useAuth } from '../../context/AuthContext'

/**
 * AdminDashboard Component
 * Main admin dashboard page
 */
function AdminDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    // Check if user is admin
    if (!user || !user.isAdmin) {
      console.log('User not admin, redirecting to login', { user })
      navigate('/admin/login')
    } else {
      console.log('User is admin, showing dashboard', { user })
    }
  }, [user, navigate])

  if (!user || !user.isAdmin) {
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
          <AdminHeader title="Article management" />

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <ArticleManagement />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard

