import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import { useAuth } from '../../context/AuthContext'
import { Upload } from 'lucide-react'
import { toast } from 'sonner'
import { API_BASE_URL } from '../../constants/api'

const BIO_MAX = 120
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

/**
 * AdminProfilePage
 * แก้ไขและอัปเดตรูปได้ (กด Save ถึงเปลี่ยน), Email แก้ไขไม่ได้, บันทึกได้แบบไม่กรอกทุกช่อง
 */
function AdminProfilePage() {
  const navigate = useNavigate()
  const { user, updateUser, isAuthenticated } = useAuth()
  const isAdmin = user?.role && user.role.toLowerCase() === 'admin'
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    bio: ''
  })
  const [isSaving, setIsSaving] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) return
    if (!user) {
      navigate('/login')
      return
    }
    if (!isAdmin) {
      navigate('/')
      return
    }
    setFormData({
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
      bio: (user.bio || '').slice(0, BIO_MAX)
    })
  }, [user, isAdmin, isAuthenticated, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'bio' && value.length > BIO_MAX) return
    setFormData((prev) => ({ ...prev, [name]: value }))
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

      toast.success('Profile saved successfully')
    } catch (error) {
      const msg = error.response?.data?.error || error.response?.data?.message || 'Failed to save. Please try again.'
      toast.error(msg)
    } finally {
      setIsSaving(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error('Please upload a valid image (JPEG, PNG, GIF, WebP).')
      return
    }
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error('Please upload an image smaller than 5MB.')
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

  if (!user || !isAdmin) {
    return null
  }

  return (
    <>
      <div className="lg:hidden min-h-screen bg-[#F9F8F6] flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brown-600 mb-2">Admin Panel</h1>
          <p className="text-brown-600">Please use a larger screen (lg and above) to access the admin panel.</p>
        </div>
      </div>

      <div className="min-h-screen bg-[#F9F8F6] hidden lg:flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader title="Profile" />
          <div className="flex-1 overflow-auto">
            <div className="w-[1160px] ml-[100px] min-h-[656px] px-[60px] pt-10 pb-[120px] flex flex-col gap-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-brown-900">Profile</h2>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Choose profile picture"
              />

              {/* Profile Picture */}
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : user.avatar ? (
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
                  type="button"
                  onClick={handleUploadClick}
                  disabled={isSaving}
                  className="px-6 py-2 bg-white border border-brown-600 text-brown-600 rounded-lg font-medium hover:bg-brown-50 transition-colors flex items-center gap-2 self-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload profile picture</span>
                </button>
              </div>

              <form onSubmit={handleSave} className="flex flex-col gap-6">
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

                {/* Email - ไม่สามารถแก้ไขได้ */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-sans text-sm font-medium text-brown-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    aria-label="Email (cannot be edited)"
                    className="w-full h-12 px-4 rounded-lg border border-brown-200 bg-brown-50 text-brown-500 font-sans text-base leading-6 cursor-not-allowed"
                    placeholder="Email"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="bio" className="font-sans text-sm font-medium text-brown-600">
                    Bio (max {BIO_MAX} letters)
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={6}
                    maxLength={BIO_MAX}
                    className="w-full px-4 py-3 rounded-lg border border-brown-300 bg-white text-brown-600 font-sans text-base leading-6 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent resize-y"
                    placeholder="Enter your bio"
                  />
                  <p className="text-xs text-brown-400">{formData.bio.length}/{BIO_MAX} characters</p>
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
