import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { toast } from 'sonner'
import articlesAPI from '../../api/articles'

const PER_PAGE = 7

/**
 * ArticleManagement Component
 * Article management table with data from API, search/filters, and pagination (7 per page, newest first)
 */
function ArticleManagement() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [categories, setCategories] = useState([])
  const [statuses, setStatuses] = useState([])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)
  const [deleteModalPostId, setDeleteModalPostId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchCategories = () => {
    articlesAPI
      .getCategories()
      .then((res) => setCategories(res.categories || []))
      .catch(() => setCategories([]))
  }

  const fetchStatuses = () => {
    articlesAPI
      .getStatuses()
      .then((res) => setStatuses(res.statuses || []))
      .catch(() => setStatuses([]))
  }

  const fetchArticles = () => {
    setLoading(true)
    articlesAPI
      .getPostsForAdmin(
        page,
        PER_PAGE,
        categoryFilter || '',
        searchQuery.trim() || '',
        statusFilter || ''
      )
      .then((data) => {
        setArticles(data.posts || [])
        setTotalPages(data.totalPages || 1)
        setTotalPosts(data.totalPosts || 0)
      })
      .catch(() => {
        setArticles([])
        setTotalPages(1)
        setTotalPosts(0)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchCategories()
    fetchStatuses()
  }, [])

  useEffect(() => {
    fetchArticles()
  }, [page, categoryFilter, statusFilter])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    setLoading(true)
    articlesAPI
      .getPostsForAdmin(1, PER_PAGE, categoryFilter || '', searchQuery.trim() || '', statusFilter || '')
      .then((data) => {
        setArticles(data.posts || [])
        setTotalPages(data.totalPages || 1)
        setTotalPosts(data.totalPosts || 0)
      })
      .catch(() => {
        setArticles([])
        setTotalPages(1)
        setTotalPosts(0)
      })
      .finally(() => setLoading(false))
  }

  const handleFilterChange = (name, value) => {
    if (name === 'category') setCategoryFilter(value)
    if (name === 'status') setStatusFilter(value)
    setPage(1)
  }

  const handleEdit = (id) => {
    navigate(`/admin/dashboard/edit/${id}`)
  }

  const openDeleteModal = (id) => {
    setDeleteModalPostId(id)
  }

  const closeDeleteModal = () => {
    if (!deleting) setDeleteModalPostId(null)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteModalPostId) return
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    setDeleting(true)
    try {
      await articlesAPI.deletePost(deleteModalPostId, token)
      toast.success('Article deleted')
      setDeleteModalPostId(null)
      fetchArticles()
    } catch (err) {
      toast.error(err.response?.data?.message || err.response?.data?.error || 'Failed to delete article')
    } finally {
      setDeleting(false)
    }
  }

  const titleDisplay = (title) => {
    if (!title) return ''
    return title.length > 55 ? `${title.slice(0, 55)}...` : title
  }

  const isPublishedStatus = (status) => {
    const s = (status || '').toLowerCase()
    return s === 'published' || s === 'publish'
  }

  return (
    <div className="w-[1160px] min-h-[656px] ml-[100px] px-[60px] pt-10 pb-[120px] flex flex-col gap-10">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-brown-900">Article management</h2>
        <button
          type="button"
          onClick={() => navigate('/admin/dashboard/create')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create article</span>
        </button>
      </div>

      {/* Search and Filters */}
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-brown-300 bg-white text-brown-600 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="select-arrow-inset h-10 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
        >
          <option value="">Status</option>
          {statuses.map((st) => (
            <option key={st.id} value={st.status}>
              {st.status}
            </option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="select-arrow-inset h-10 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
        >
          <option value="">Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-10 px-4 rounded-lg bg-brown-600 text-white font-medium hover:bg-brown-700"
        >
          Search
        </button>
      </form>

      {/* Article Table */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <p className="text-brown-500 py-8">Loading...</p>
        ) : articles.length === 0 ? (
          <p className="text-brown-500 py-8">No articles found.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-brown-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Article title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-brown-900">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-brown-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr
                  key={article.id}
                  className={`border-b border-brown-100 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="py-3 px-4 text-sm text-brown-600">
                    {titleDisplay(article.title)}
                  </td>
                  <td className="py-3 px-4 text-sm text-brown-600">{article.category}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isPublishedStatus(article.status) ? 'bg-green-500' : 'bg-brown-400'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isPublishedStatus(article.status) ? 'text-green-600' : 'text-brown-600'
                        }`}
                      >
                        {article.status}
                      </span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleEdit(article.id)}
                        className="w-8 h-8 flex items-center justify-center text-brown-600 hover:text-brown-800 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(article.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteModalPostId != null && (
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
                onClick={closeDeleteModal}
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
                onClick={closeDeleteModal}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-brown-200 pt-4">
          <p className="text-sm text-brown-500">
            Page {page} of {totalPages} ({totalPosts} articles)
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-brown-300 bg-white text-brown-600 hover:bg-brown-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-brown-300 bg-white text-brown-600 hover:bg-brown-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArticleManagement
