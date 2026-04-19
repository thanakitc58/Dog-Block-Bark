import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/footer/footer'
import { useAuth } from '../context/AuthContext'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { useNotification } from '../hooks/useNotification'
import SuccessNotification from '../components/profile/SuccessNotification'
import { User, RotateCcw } from 'lucide-react'
import { API_BASE_URL } from '../constants/api'

/**
 * ProfilePage Component
 * แก้ไขและอัปเดตรูปได้ (กด Save ถึงเปลี่ยน), Email แก้ไขไม่ได้, บันทึกได้แบบไม่กรอกทุกช่อง
 */
function ProfilePage() {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
  })
  const [isSaving, setIsSaving] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const { notification, showNotification, hideNotification } = useNotification()

  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

  useScrollToTop()

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || ''
      })
    }
  }, [user])

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
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    const token = localStorage.getItem('access_token')
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    try {
      let updatedUser = null

      if (imageFile) {
        const form = new FormData()
        form.append('avatar', imageFile)
        const uploadRes = await axios.put(`${API_BASE_URL}/auth/profile`, form, {
          headers: { 'Content-Type': 'multipart/form-data', ...headers }
        })
        updatedUser = uploadRes.data?.user ?? uploadRes.data
        if (updatedUser) updateUser(updatedUser)
        setImageFile(null)
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview)
          setImagePreview(null)
        }
      }

      const patchRes = await axios.patch(
        `${API_BASE_URL}/auth/profile`,
        { name: formData.name, username: formData.username },
        { headers: { 'Content-Type': 'application/json', ...headers } }
      )
      const patchedUser = patchRes.data?.user ?? patchRes.data
      if (patchedUser) updateUser(patchedUser)
      else if (updatedUser) updateUser({ ...updatedUser, name: formData.name, username: formData.username })

      showNotification('Saved profile', 'Your profile has been successfully updated')
    } catch (error) {
      console.error('Error saving profile:', error)
      const msg = error.response?.data?.error || error.response?.data?.message || 'Failed to save. Please try again.'
      showNotification('Save failed', msg)
    } finally {
      setIsSaving(false)
    }
  }

  const handleResetPassword = () => {
    navigate('/reset-password')
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      showNotification('Invalid file', 'Please upload a valid image (JPEG, PNG, GIF, WebP).')
      return
    }
    if (file.size > MAX_IMAGE_SIZE) {
      showNotification('File too large', 'Please upload an image smaller than 5MB.')
      return
    }
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    e.target.value = ''
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }


  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col">
      <NavBar />
      
      <div className="flex-1 pt-[48px] lg:pt-[50px] pb-10">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Choose profile picture"
        />
        {/* Mobile Layout */}
        <div className="lg:hidden w-full px-4">
          {/* Tabs */}
          <div className="flex items-center gap-4 mb-6 border-b border-brown-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'profile'
                  ? 'border-blue-600 text-brown-600 font-semibold'
                  : 'border-transparent text-brown-400'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="font-sans text-[16px] font-medium">Profile</span>
            </button>
            <button
              onClick={handleResetPassword}
              className="flex items-center gap-2 px-4 py-3 border-b-2 border-transparent text-brown-400 hover:text-brown-600 transition-colors"
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
            <span className="font-sans text-[16px] font-semibold text-brown-600">Profile</span>
          </div>

          {/* Profile Content */}
          <div className="bg-white rounded-2xl p-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden mb-4">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'User'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-brown-600 font-medium text-2xl">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleUploadClick}
                disabled={isSaving}
                className="px-6 py-2 bg-white border border-brown-600 text-brown-600 rounded-full font-sans text-[14px] font-medium hover:bg-brown-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload profile picture
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-sans text-[14px] font-medium text-brown-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 font-sans text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              {/* Username Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="font-sans text-[14px] font-medium text-brown-400">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 font-sans text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>

              {/* Email Field - ไม่สามารถแก้ไขได้ */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-sans text-[14px] font-medium text-brown-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  aria-label="Email (cannot be edited)"
                  className="w-full h-12 px-0 border-0 bg-transparent text-brown-400 font-sans text-[16px] leading-[24px] cursor-not-allowed"
                  placeholder="Enter your email"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={isSaving}
                className="w-[100px] h-12 bg-black text-white rounded-lg font-sans text-[16px] font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>
        </div>

        {/* Desktop Layout (lg+) */}
        <div className="hidden lg:flex w-full max-w-[1200px] mx-auto px-[120px] gap-8">
          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <nav className="flex flex-col gap-0  rounded-lg p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                  activeTab === 'profile'
                    ? 'bg-white text-brown-600 font-semibold border-r-2 border-gray-300'
                    : 'text-brown-400 hover:bg-gray-50'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-sans text-[16px] font-medium">Profile</span>
              </button>
              <button
                onClick={handleResetPassword}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-brown-400 hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span className="font-sans text-[16px] font-medium">Reset password</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-2xl p-8">
            {/* Profile Picture Section */}
            <div className="flex items-start gap-6 mb-8">
              <div className="w-32 h-32 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'User'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-brown-600 font-medium text-2xl">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleUploadClick}
                disabled={isSaving}
                className="px-6 py-2 bg-white border border-brown-600 text-brown-600 rounded-full font-sans text-[14px] font-medium hover:bg-brown-50 transition-colors self-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload profile picture
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-brown-200 mb-6"></div>

            {/* Form */}
            <form onSubmit={handleSave} className="flex flex-col gap-6">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name-desktop" className="font-sans text-[14px] font-medium text-brown-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name-desktop"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 font-sans text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              {/* Username Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="username-desktop" className="font-sans text-[14px] font-medium text-brown-400">
                  Username
                </label>
                <input
                  type="text"
                  id="username-desktop"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 font-sans text-[16px] leading-[24px] placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>

              {/* Email Field - ไม่สามารถแก้ไขได้ */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email-desktop" className="font-sans text-[14px] font-medium text-brown-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email-desktop"
                  name="email"
                  value={formData.email}
                  readOnly
                  aria-label="Email (cannot be edited)"
                  className="w-full h-12 px-0 border-0 bg-transparent text-brown-400 font-sans text-[16px] leading-[24px] cursor-not-allowed"
                  placeholder="Enter your email"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={isSaving}
                className="w-[100px] h-12 bg-black text-white rounded-lg font-sans text-[16px] font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />

      {/* Success Notification */}
      <SuccessNotification
        isVisible={notification.isVisible}
        title={notification.title}
        message={notification.message}
        onClose={hideNotification}
      />
    </div>
  )
}

export default ProfilePage

