import { useState } from 'react'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'

/**
 * CategoryManagement Component
 * Category management with search and CRUD operations
 */
function CategoryManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Mock data - replace with API call
  const categories = [
    { id: 1, name: 'Cat' },
    { id: 2, name: 'General' },
    { id: 3, name: 'Inspiration' }
  ]

  const handleCreate = () => {
    console.log('Create category')
    // TODO: Open create modal or navigate to create page
  }

  const handleEdit = (id) => {
    console.log('Edit category:', id)
    // TODO: Open edit modal or navigate to edit page
  }

  const handleDelete = (id) => {
    console.log('Delete category:', id)
    // TODO: Show confirmation and delete
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-[1160px] min-h-[656px] px-[60px] pt-10 pb-[120px] flex flex-col gap-10">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-brown-900">Category management</h2>
        <button
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
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-brown-900 mb-4">Category</h3>
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
                  onClick={() => handleEdit(category.id)}
                  className="w-8 h-8 flex items-center justify-center text-brown-600 hover:text-brown-800 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
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
      </div>
    </div>
  )
}

export default CategoryManagement

