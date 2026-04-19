import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, X } from 'lucide-react'
import { toast } from 'sonner'
import articlesAPI from '../../api/articles'

/**
 * CategoryManagement Component
 * จัดการ category: ดึงจาก API, ค้นหา, สร้าง category ใหม่ (ไปโชว์ใน dropdown บทความด้วย)
 */
function CategoryManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [creating, setCreating] = useState(false)

  const fetchCategories = () => {
    setLoading(true)
    articlesAPI
      .getCategories()
      .then((res) => setCategories(res.categories || []))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleCreate = () => {
    setNewCategoryName('')
    setShowCreateModal(true)
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    const name = newCategoryName.trim()
    if (!name) {
      toast.error('Please enter a category name')
      return
    }
    setCreating(true)
    try {
      await articlesAPI.createCategory(name)
      toast.success('Category created')
      setShowCreateModal(false)
      setNewCategoryName('')
      fetchCategories()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create category')
    } finally {
      setCreating(false)
    }
  }

  const handleEdit = (id) => {
    console.log('Edit category:', id)
    // TODO: modal แก้ไขชื่อ
  }

  const handleDelete = (id) => {
    console.log('Delete category:', id)
    // TODO: ยืนยันแล้วลบ (ต้องเช็คว่ามี post ใช้ category นี้หรือไม่)
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-[1160px] ml-[100px] min-h-[656px] px-[60px] pt-10 pb-[120px] flex flex-col gap-10">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-brown-900">Category management</h2>
        <button
          type="button"
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create category</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full h-10 pl-10 pr-4 rounded-lg border border-brown-300 bg-white text-brown-600 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
        />
      </div>

      {/* Category List */}
      <section className="flex flex-col">
        <h3 className="text-sm font-semibold text-brown-900 mb-4">Category</h3>
        {loading ? (
          <p className="text-brown-500 py-4">Loading...</p>
        ) : (
          <div className="space-y-0">
            {filteredCategories.map((category, index) => (
              <div
                key={category.id}
                className={`flex items-center justify-between py-3 px-4 border-b border-brown-100 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <span className="text-sm text-brown-600">{category.name}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleEdit(category.id)}
                    className="w-8 h-8 flex items-center justify-center text-brown-600 hover:text-brown-800 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(category.id)}
                    className="w-8 h-8 flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && filteredCategories.length === 0 && searchQuery && (
          <p className="text-brown-500 py-4">No categories match your search.</p>
        )}
      </section>

      {/* Create Category Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-category-title"
        >
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 id="create-category-title" className="text-lg font-semibold text-brown-900">
                Create category
              </h2>
              <button
                type="button"
                onClick={() => !creating && setShowCreateModal(false)}
                disabled={creating}
                className="p-1 rounded text-brown-500 hover:bg-brown-100 disabled:opacity-50"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit}>
              <label htmlFor="category-name" className="block text-sm font-medium text-brown-700 mb-2">
                Category name
              </label>
              <input
                id="category-name"
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. General"
                disabled={creating}
                className="w-full h-10 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-600 mb-6"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => !creating && setShowCreateModal(false)}
                  disabled={creating}
                  className="px-4 py-2 rounded-lg border border-brown-600 text-brown-600 bg-white font-medium hover:bg-brown-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || !newCategoryName.trim()}
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-900 disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryManagement
