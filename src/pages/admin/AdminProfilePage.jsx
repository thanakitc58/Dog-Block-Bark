import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import { useAuth } from '../../context/AuthContext'
import { Upload } from 'lucide-react'

/**
 * AdminProfilePage Component
 * Admin profile editing page
 */
function AdminProfilePage() {
  const navigate = useNavigate()
  const { user, login, isAuthenticated } = useAuth()
  const isAdmin = user?.role && user.role.toLowerCase() === 'admin'
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    bio: ''
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // ยังไม่รู้สถานะ auth → ยังไม่ redirect
    if (!isAuthenticated) {
      return
    }

    // ถ้าไม่ล็อกอิน → ไปหน้า login ปกติ
    if (!user) {
      navigate('/login')
      return
    }

    // ถ้าไม่ใช่ admin → กลับหน้าแรก
    if (!isAdmin) {
      navigate('/')
      return
    }

    // Load user data สำหรับ admin
    setFormData({
      name: user.name || 'Thompson P.',
      username: user.username || 'thompson',
      email: user.email || 'thompson.p@gmail.com',
      bio: user.bio || 'I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness. When I\'m not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.'
    })
  }, [user, isAdmin, isAuthenticated, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Limit bio to 120 characters
    if (name === 'bio' && value.length > 120) {
      return
    }
    
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // TODO: Call API to save profile
      const updatedUser = {
        ...user,
        ...formData
      }
      
      login(updatedUser)
      
      console.log('Profile saved successfully')
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleUploadPicture = () => {
    console.log('Upload profile picture')
    // TODO: Implement file upload
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
          <AdminHeader title="Profile" />

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="w-[1160px] min-h-[656px] px-[60px] pt-10 pb-[120px] flex flex-col gap-10">
              {/* Top Bar with Save Button */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-brown-900">Profile</h2>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>

              {/* Profile Picture Section */}
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || 'Admin'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-brown-600 font-medium text-2xl">
                      {user.name?.charAt(0)?.toUpperCase() || 'A'}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleUploadPicture}
                  className="px-6 py-2 bg-white border border-brown-600 text-brown-600 rounded-lg font-medium hover:bg-brown-50 transition-colors flex items-center gap-2 self-center"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload profile picture</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="flex flex-col gap-6">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-sans text-sm font-medium text-brown-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 font-sans text-base leading-6 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Username Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="username" className="font-sans text-sm font-medium text-brown-600">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 font-sans text-base leading-6 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
                    placeholder="Enter your username"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-sans text-sm font-medium text-brown-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 font-sans text-base leading-6 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Bio Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="bio" className="font-sans text-sm font-medium text-brown-600">
                    Bio (max 120 letters)
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={6}
                    maxLength={120}
                    className="w-full px-4 py-3 rounded-lg border border-brown-300 bg-white text-brown-600 font-sans text-base leading-6 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent resize-y"
                    placeholder="Enter your bio"
                  />
                  <p className="text-xs text-brown-400">
                    {formData.bio.length}/120 characters
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProfilePage

