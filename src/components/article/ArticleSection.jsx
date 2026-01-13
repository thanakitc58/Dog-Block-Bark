import React from 'react'
import BlogCard from './BlogCard'
import blogPosts from '../../data/blogPosts'

function ArticleSection({ category, searchQuery }) {
  // Filter blog posts based on selected category AND search query
  const filteredPosts = blogPosts.filter((post) => {
    // Category filter (case-insensitive)
    const matchesCategory = category === "highlight" 
      ? true 
      : post.category.toLowerCase() === category.toLowerCase()
    
    // Search filter (case-insensitive: ไม่สนใจตัวพิมพ์ใหญ่-เล็ก)
    // ค้นหาใน title และ description
    const matchesSearch = searchQuery === "" 
      ? true 
      : post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

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
            <div className="col-span-2 text-center py-8">
              <p className="text-brown-400">No articles found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ArticleSection

