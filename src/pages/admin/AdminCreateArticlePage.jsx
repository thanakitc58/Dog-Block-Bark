import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import articlesAPI from '../../api/articles'
import { toast } from 'sonner'

const INTRO_MAX = 120

function AdminCreateArticlePage() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const fileInputRef = useRef(null)

  const [categories, setCategories] = useState([])
  const [statuses, setStatuses] = useState([])
  const [form, setForm] = useState({
    image: '',
    imageFile: null,
    category_id: '',
    authorName: '',
    title: '',
    description: '',
    content: ''
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const isAdmin = user?.role && user.role.toLowerCase() === 'admin'

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login')
      return
    }
    if (!isAdmin) {
      navigate('/')
      return
    }
  }, [isAuthenticated, user, isAdmin, navigate])

  useEffect(() => {
    Promise.all([articlesAPI.getCategories(), articlesAPI.getStatuses()])
      .then(([catRes, statusRes]) => {
        setCategories(catRes.categories || [])
        setStatuses(statusRes.statuses || [])
      })
      .catch(() => {
        toast.error('Failed to load categories and statuses')
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'description' && value.length > INTRO_MAX) return
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setForm((prev) => ({
      ...prev,
      imageFile: file,
      image: URL.createObjectURL(file)
    }))
  }

  const getStatusIdByLabel = (label) => {
    const lower = (label || '').toLowerCase()
    const s = statuses.find((st) => {
      const stLower = (st.status || '').toLowerCase()
      if (lower === 'published') return stLower === 'published' || stLower === 'publish'
      if (lower === 'draft') return stLower === 'draft'
      return stLower === lower
    })
    if (s) return s.id
    if (statuses.length === 0) return null
    if (lower === 'published') return statuses[statuses.length - 1]?.id ?? statuses[0]?.id
    return statuses[0]?.id
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null

  const handleSave = async (publish = false) => {
    const categoryId = form.category_id === '' ? null : Number(form.category_id)
    if (!form.title?.trim()) {
      toast.error('Title is required')
      return
    }
    if (!categoryId) {
      toast.error('Please select a category')
      return
    }
    if (!form.description?.trim()) {
      toast.error('Introduction is required')
      return
    }
    if (!form.content?.trim()) {
      toast.error('Content is required')
      return
    }

    let imageUrl = form.image && !form.imageFile ? form.image : ''

    if (form.imageFile) {
      setUploading(true)
      try {
        const res = await articlesAPI.uploadPostImage(form.imageFile, token)
        imageUrl = res.url || ''
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to upload image')
        setUploading(false)
        return
      }
      setUploading(false)
    }

    if (!imageUrl) {
      toast.error('Please upload a thumbnail image')
      return
    }

    const statusId = publish
      ? getStatusIdByLabel('Published')
      : getStatusIdByLabel('Draft')
    if (statusId == null) {
      toast.error('Status not found. Please try again.')
      return
    }

    setSaving(true)
    try {
      await articlesAPI.createPost(
        {
          title: form.title.trim(),
          image: imageUrl,
          category_id: Number(categoryId),
          description: form.description.trim().slice(0, INTRO_MAX),
          content: form.content.trim(),
          status_id: Number(statusId)
        },
        token
      )
      toast.success(publish ? 'Article published' : 'Article saved as draft')
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || err.response?.data?.error || 'Failed to create article')
    } finally {
      setSaving(false)
    }
  }

  if (!user || !isAdmin) return null

  return (
    <>
      <div className="lg:hidden min-h-screen bg-[#F9F8F6] flex items-center justify-center p-4">
        <p className="text-brown-600">Please use a larger screen to create articles.</p>
      </div>
    <div className="min-h-screen bg-[#F9F8F6] hidden lg:flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader title="Create article" />
        <div className="flex-1 overflow-auto">
          <div className="w-[1160px] ml-[100px] px-[60px] pt-10 pb-[120px] flex flex-col gap-8">
            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => handleSave(false)}
                disabled={saving || uploading}
                className="px-6 py-2.5 rounded-lg border border-brown-600 text-brown-600 bg-white font-medium hover:bg-brown-50 disabled:opacity-50"
              >
                Save as draft
              </button>
              <button
                type="button"
                onClick={() => handleSave(true)}
                disabled={saving || uploading}
                className="px-6 py-2.5 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-900 disabled:opacity-50"
              >
                Save and publish
              </button>
            </div>

            {/* Thumbnail */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-brown-700">Thumbnail image</label>
              <div className="w-full max-w-[400px] aspect-video rounded-lg border border-brown-300 bg-brown-100 flex items-center justify-center overflow-hidden">
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-brown-400">No image</span>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageChange}
                className="hidden"
                aria-label="Upload thumbnail"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-fit px-4 py-2 rounded-lg border border-brown-300 bg-white text-brown-600 font-medium hover:bg-brown-50"
              >
                Upload thumbnail image
              </button>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-sm font-medium text-brown-700">
                Category
              </label>
              <select
                id="category"
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="w-full max-w-[400px] h-12 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 focus:outline-none focus:ring-2 focus:ring-brown-600"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Author name (display only) */}
            <div className="flex flex-col gap-2">
              <label htmlFor="authorName" className="text-sm font-medium text-brown-700">
                Author name
              </label>
              <input
                id="authorName"
                name="authorName"
                type="text"
                value={form.authorName || user?.name || ''}
                onChange={handleChange}
                placeholder="Thompson P."
                className="w-full max-w-[400px] h-12 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600"
              />
            </div>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-brown-700">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Article title"
                className="w-full h-12 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600"
              />
            </div>

            {/* Introduction */}
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-sm font-medium text-brown-700">
                Introduction (max {INTRO_MAX} letters)
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Introduction"
                rows={3}
                maxLength={INTRO_MAX}
                className="w-full px-4 py-3 rounded-lg border border-brown-300 bg-white text-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600 resize-none"
              />
              <span className="text-brown-400 text-sm">
                {form.description.length}/{INTRO_MAX}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              <label htmlFor="content" className="text-sm font-medium text-brown-700">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Content"
                rows={12}
                className="w-full px-4 py-3 rounded-lg border border-brown-300 bg-white text-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600 resize-y"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminCreateArticlePage
