import { useState } from 'react'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'

/**
 * ArticleManagement Component
 * Article management table with search and filters
 */
function ArticleManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  // Mock data - replace with API call
  const articles = [
    {
      id: 1,
      title: 'Understanding Cat Behavior: Why Your Feline Friend Acts the Way They D...',
      category: 'Cat',
      status: 'Published'
    },
    {
      id: 2,
      title: 'The Fascinating World of Cats: Why We Love Our Furry Friends',
      category: 'Cat',
      status: 'Published'
    },
    {
      id: 3,
      title: 'Finding Motivation: How to Stay Inspired Through Life\'s Challenges',
      category: 'General',
      status: 'Published'
    },
    {
      id: 4,
      title: 'The Science of the Cat\'s Purr: How It Benefits Cats and Humans Alike',
      category: 'Cat',
      status: 'Published'
    },
    {
      id: 5,
      title: 'Top 10 Health Tips to Keep Your Cat Happy and Healthy',
      category: 'Cat',
      status: 'Published'
    },
    {
      id: 6,
      title: 'Unlocking Creativity: Simple Habits to Spark Inspiration Daily',
      category: 'Inspiration',
      status: 'Published'
    }
  ]

  const handleEdit = (id) => {
    console.log('Edit article:', id)
    // TODO: Navigate to edit page
  }

  const handleDelete = (id) => {
    console.log('Delete article:', id)
    // TODO: Show confirmation and delete
  }

  return (
    <div className="w-[1160px] min-h-[656px] px-[60px] pt-10 pb-[120px] flex flex-col gap-10">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-brown-900">Article management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Create article</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        {/* Search */}
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

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
        >
          <option value="">Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 focus:outline-none focus:ring-2 focus:ring-brown-600 focus:border-transparent"
        >
          <option value="">Category</option>
          <option value="cat">Cat</option>
          <option value="general">General</option>
          <option value="inspiration">Inspiration</option>
        </select>
      </div>

      {/* Article Table */}
      <div className="flex-1 overflow-auto">
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
                <td className="py-3 px-4 text-sm text-brown-600">{article.title}</td>
                <td className="py-3 px-4 text-sm text-brown-600">{article.category}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-brown-600">{article.status}</span>
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
                      onClick={() => handleDelete(article.id)}
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
      </div>
    </div>
  )
}

export default ArticleManagement

