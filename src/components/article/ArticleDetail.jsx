import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import NavBar from '../NavBar/NavBar'
import Footer from '../footer/footer'
import AuthorBio from '../HeroSection/AuthorBio'
import ShareSection from './ShareSection'
import CommentSection from './CommentSection'

function ArticleDetail({ article, onBack }) {
  // Scroll to top when component mounts or article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [article])

  if (!article) {
    return <div>Article not found</div>
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col">
      {/* NavBar - Sticky for mobile */}
      <div className="lg:static">
        <NavBar />
      </div>
      
      {/* Article Detail Container */}
      <article className="flex-1 w-full px-4 lg:px-[120px]">
        {/* Main Image - Mobile: 375x184px, top 48px */}
        <div className="w-full mt-[48px] lg:mt-[40px] mb-6">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-[184px] lg:h-[60vh] lg:max-h-[500px] object-cover object-center rounded-lg"
          />
        </div>

        {/* Content Layout - Mobile: width 375px, top 232px, padding 24px top, 16px left/right, 40px bottom, gap 24px */}
        {/* Desktop (lg+): Grid layout with main content on left and AuthorBio sidebar on right */}
        {/* Container for content and bio: width 1200px, gap 80px for 1440px */}
        <div className="w-full lg:w-full lg:mt-0 pt-0 lg:pt-0 pb-10 lg:pb-4 lg:overflow-visible">
          {/* Grid Layout for lg+ screens: width 1200px, gap 80px for 1440px */}
          <div className="lg:flex lg:justify-between lg:items-start lg:relative">
            {/* Left Column - Main Content: width 815px, gap 48px for 1440px */}
            <div className="lg:w-[815px] lg:flex lg:flex-col">
              {/* Category and Date */}
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600">
                  {article.category}
                </span>
                <span className="text-brown-400 text-sm">
                  {article.date}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-brown-600 font-bold text-2xl lg:text-3xl leading-tight mb-3 lg:mb-4">
                {article.title}
              </h1>

              {/* Introduction/Description */}
              {article.description && (
                <p className="text-brown-600 text-base lg:text-lg leading-normal mb-4 lg:mb-5">
                  {article.description}
                </p>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {/* Render Markdown: ## ต้องมี space หลังถึงจะไม่โชว์บน UI จึง normalize ##1. เป็น ## 1. */}
                {article.content && (
                  <div className="text-brown-600">
                    <ReactMarkdown
                      components={{
                        h2: ({ node, ...props }) => (
                          <h2 className="text-brown-600 font-semibold text-xl lg:text-[20px] mt-0 lg:mt-0 mb-3 lg:mb-3 leading-[28px] font-poppins" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="mb-5 lg:mb-5 text-brown-600 text-base lg:text-base leading-[24px] font-medium font-poppins" {...props} />
                        ),
                      }}
                    >
                      {(article.content || '').replace(/(^|\n)(##)(?=[^\s#])/g, '$1$2 ')}
                    </ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Author Bio - Mobile only, above Share Section */}
              <div className="mt-6 lg:hidden">
                <AuthorBio />
              </div>

              {/* Share Section - Below content for lg, below AuthorBio for mobile */}
              <div className="mt-6 lg:mt-8">
                <ShareSection
                postId={article.id}
                initialLikes={article.likes_count ?? article.likes ?? 0}
              />
              </div>

              {/* Comment Section - Below Share Section for lg, same width as content */}
              <div className="mt-6 lg:mt-8">
                <CommentSection postId={article.id} />
              </div>
            </div>

            {/* Right Column - Author Bio Sidebar: width 305px, height 400px, gap 20px, border-radius 16px, padding 24px for 1440px */}
            {/* Sticky position for lg - follows scroll */}
            <div className="hidden lg:block lg:w-[305px] lg:sticky lg:top-[20px] lg:self-start lg:h-fit lg:z-10 mt-8 lg:mt-0">
              <AuthorBio />
            </div>
          </div>
        </div>
      </article>

      {/* Footer - Sticky for mobile */}
      <div className="lg:static mt-auto">
        <Footer />
      </div>
    </div>
  )
}

export default ArticleDetail

