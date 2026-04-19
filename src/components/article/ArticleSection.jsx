import React from 'react'
import BlogCard from './BlogCard'
import { useArticles } from '../../hooks/useArticles'

function ArticleSection({ category, searchQuery }) {
  const {
    posts,
    loading,
    isLoadingMore,
    error,
    hasMore,
    loadMore
  } = useArticles(category, 6)

  // ฟังก์ชันเพิ่มหน้า
  const handleLoadMore = () => {
    loadMore()
  }

  // Filter posts by search query (client-side filtering)
  const filteredPosts = posts.filter((post) => {
    // Search filter (case-insensitive: ไม่สนใจตัวพิมพ์ใหญ่-เล็ก)
    // ค้นหาใน title และ description
    const matchesSearch = searchQuery === "" 
      ? true 
      : post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  })

  // Loading state
  if (loading) {
    return (
      <section className="w-full flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-[1200px] min-[1024px]:px-[120px] min-[1440px]:px-0">
          <div className="text-center py-8">
            <p className="text-brown-400">Loading</p>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="w-full flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-[1200px] min-[1024px]:px-[120px] min-[1440px]:px-0">
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-[1200px] min-[1024px]:px-[120px] min-[1440px]:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                image={post.image}
                category={post.category}
                title={post.title}
                description={post.description}
                author={post.author}
                date={post.date}
              />
            ))
          ) : (
            !loading && (
              <div className="col-span-2 text-center py-8">
                <p className="text-brown-400">Posts not found.</p>
              </div>
            )
          )}
        </div>

        {/* ปุ่ม "View More" - ซ่อนเมื่อไม่มีข้อมูลแล้ว */}
        {hasMore && !loading && filteredPosts.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="hover:text-muted-foreground font-medium underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? 'Loading...' : 'View more'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ArticleSection

