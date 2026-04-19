import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import articlesAPI from '../../api/articles'
import { toast } from 'sonner'
import { Trash2, X } from 'lucide-react'

const INTRO_MAX = 120

function AdminEditArticlePage() {
  const navigate = useNavigate()
  const { id } = useParams()
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
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)

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
    if (!id) return
    Promise.all([
      articlesAPI.getCategories(),
      articlesAPI.getStatuses(),
      articlesAPI.getPostById(id)
    ])
      .then(([catRes, statusRes, post]) => {
        setCategories(catRes.categories || [])
        setStatuses(statusRes.statuses || [])
        if (post) {
          setForm({
            image: post.image || '',
            imageFile: null,
            category_id: post.category_id ?? '',
            authorName: user?.name || '',
            title: post.title || '',
            description: post.description || '',
            content: post.content || ''
          })
        } else {
          toast.error('Article not found')
          navigate('/admin/dashboard')
        }
      })
      .catch(() => {
        toast.error('Failed to load article')
        navigate('/admin/dashboard')
      })
      .finally(() => setLoading(false))
  }, [id, user?.name, navigate])

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

    const statusId = publish ? getStatusIdByLabel('Published') : getStatusIdByLabel('Draft')
    if (statusId == null) {
      toast.error('Status not found. Please try again.')
      return
    }

    setSaving(true)
    try {
      await articlesAPI.updatePost(
        id,
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
      toast.success(publish ? 'Article updated and published' : 'Article saved as draft')
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || err.response?.data?.error || 'Failed to update article')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteConfirm = async () => {
    setDeleting(true)
    try {
      await articlesAPI.deletePost(id, token)
      toast.success('Article deleted')
      setShowDeleteModal(false)
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || err.response?.data?.error || 'Failed to delete article')
    } finally {
      setDeleting(false)
    }
  }

  if (!user || !isAdmin) return null
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] hidden lg:flex">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-brown-500">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="lg:hidden min-h-screen bg-[#F9F8F6] flex items-center justify-center p-4">
        <p className="text-brown-600">Please use a larger screen to edit articles.</p>
      </div>
      <div className="min-h-screen bg-[#F9F8F6] hidden lg:flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader title="Edit article" />
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
                  Save
                </button>
              </div>

              {/* Thumbnail */}
              <section className="flex flex-col gap-2">
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
              </section>

              {/* Category */}
              <section className="flex flex-col gap-2">
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
              </section>

              {/* Author name */}
              <section className="flex flex-col gap-2">
                <label htmlFor="authorName" className="text-sm font-medium text-brown-700">
                  Author name
                </label>
                <input
                  id="authorName"
                  name="authorName"
                  type="text"
                  value={form.authorName || ''}
                  onChange={handleChange}
                  placeholder="Author name"
                  className="w-full max-w-[400px] h-12 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600"
                />
              </section>

              {/* Title */}
              <section className="flex flex-col gap-2">
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
              </section>

              {/* Introduction */}
              <section className="flex flex-col gap-2">
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
              </section>

              {/* Content */}
              <section className="flex flex-col gap-2">
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
              </section>

              {/* Delete article */}
              <section className="pt-4 border-t border-brown-200">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-300 text-red-600 bg-white font-medium hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete article
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
        >
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 id="delete-modal-title" className="text-lg font-semibold text-brown-900">
                Delete article
              </h2>
              <button
                type="button"
                onClick={() => !deleting && setShowDeleteModal(false)}
                disabled={deleting}
                className="p-1 rounded text-brown-500 hover:bg-brown-100 disabled:opacity-50"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-brown-600 mb-6">Do you want to delete this article?</p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => !deleting && setShowDeleteModal(false)}
                disabled={deleting}
                className="px-4 py-2 rounded-lg border border-brown-600 text-brown-600 bg-white font-medium hover:bg-brown-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-900 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminEditArticlePage
