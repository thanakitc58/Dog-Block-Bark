import React, { useState, useEffect, useRef } from 'react'
import BlogCard from './BlogCard'
import articlesAPI from '../../api/articles'
import { formatArticlesDates } from '../../utils/dateFormatter'

function ArticleSection({ category, searchQuery }) {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const isLoadingRef = useRef(false)

  // ฟังก์ชันสำหรับโหลดข้อมูล
  const fetchPosts = async () => {
    // ป้องกันการโหลดซ้ำถ้ายังโหลดไม่เสร็จ
    if (isLoadingRef.current) return

    isLoadingRef.current = true
    setIsLoadingMore(true)
    try {
      setError(null)
      
      // Fetch articles with pagination
      const categoryParam = category === "highlight" ? null : category
      const response = await articlesAPI.getArticles(categoryParam, page, 6)
      
      // Format dates from ISO 8601 to readable format
      const formattedPosts = formatArticlesDates(response.posts)
      
      // ตรวจสอบว่ามีข้อมูลหรือไม่
      if (!formattedPosts || formattedPosts.length === 0) {
        setHasMore(false)
        return
      }
      
      // รวมโพสต์ใหม่กับโพสต์เดิม (append ไม่ใช่ replace)
      setPosts((prevPosts) => [...prevPosts, ...formattedPosts])
      
      // ตรวจสอบว่าถึงหน้าสุดท้ายหรือยัง
      if (response.currentPage >= response.totalPages || formattedPosts.length < 6) {
        setHasMore(false)
      }
    } catch (err) {
      console.error('Error fetching articles:', err)
      setError('Failed to load articles')
    } finally {
      isLoadingRef.current = false
      setIsLoadingMore(false)
      setLoading(false)
    }
  }

  // รีเซ็ตโพสต์เมื่อเปลี่ยน category
  useEffect(() => {
    setPosts([])
    setPage(1)
    setHasMore(true)
    setLoading(true)
    isLoadingRef.current = false
  }, [category])

  // โหลดโพสต์ใหม่เมื่อ page หรือ category เปลี่ยน
  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category]) // Re-fetch when page or category changes

  // ฟังก์ชันเพิ่มหน้า
  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      setPage((prevPage) => prevPage + 1)
    }
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

