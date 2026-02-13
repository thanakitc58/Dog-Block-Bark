import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import ArticleManagement from '../../components/admin/ArticleManagement'
import CategoryManagement from '../../components/admin/CategoryManagement'
import NotificationManagement from '../../components/admin/NotificationManagement'
import { useAuth } from '../../context/AuthContext'
     
/**
 * AdminDashboard Component
 * Main admin dashboard page
 */
function AdminDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated } = useAuth()
  const isAdmin = user?.role && user.role.toLowerCase() === 'admin'

  useEffect(() => {
    // ยังไม่รู้สถานะ auth (กำลังเช็ก token อยู่) → อย่าเพิ่ง redirect
    if (!isAuthenticated) {
      return
    }

    // เช็กแล้วว่าไม่ล็อกอิน → ไปหน้า login ปกติ
    if (!user) {
      console.log('No user, redirecting to login', { user })
      navigate('/login')
      return
    }

    // ถ้าเช็กแล้วว่าไม่ใช่ admin → กลับหน้าแรก
    if (!isAdmin) {
      console.log('User is not admin, redirecting to home', { user })
      navigate('/')
      return
    }

    console.log('User is admin, showing dashboard', { user })
  }, [user, isAdmin, isAuthenticated, navigate])

  // Determine which component to show based on route
  const getContentComponent = () => {
    if (location.pathname === '/admin/categories') {
      return <CategoryManagement />
    }
    if (location.pathname === '/admin/notifications') {
      return <NotificationManagement />
    }
    return <ArticleManagement />
  }

  const getHeaderTitle = () => {
    if (location.pathname === '/admin/categories') {
      return 'Category management'
    }
    if (location.pathname === '/admin/notifications') {
      return 'Notification'
    }
    return 'Article management'
  }

  if (!user || !isAdmin) {
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
          <AdminHeader title={getHeaderTitle()} />

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            {getContentComponent()}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard

