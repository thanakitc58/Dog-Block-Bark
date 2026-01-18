import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import NavBar from '../NavBar/NavBar'
import Footer from '../footer/footer'
import AuthorBio from '../HeroSection/AuthorBio'
import ShareSection from './ShareSection'

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
        <div className="w-full mt-[48px] lg:mt-[100px] mb-6">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-[184px] lg:h-[60vh] lg:max-h-[500px] object-cover object-center rounded-lg"
          />
        </div>

        {/* Content Layout - Mobile: width 375px, top 232px, padding 24px top, 16px left/right, 40px bottom, gap 24px */}
        {/* Desktop (lg+): Grid layout with main content on left and AuthorBio sidebar on right */}
        <div className="w-full lg:w-full lg:mt-0 pt-0 lg:pt-0 pb-10 lg:pb-16">
          {/* Grid Layout for lg+ screens: Category/Date + AuthorBio on same row */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-4 xl:gap-8 lg:items-start">
            {/* Left Column - Main Content (9 columns - expanded) */}
            <div className="lg:col-span-9">
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
                {/* Render Markdown content using ReactMarkdown */}
                {article.content && (
                  <div className="text-brown-600 leading-normal">
                    <ReactMarkdown
                      components={{
                        h2: ({ node, ...props }) => (
                          <h2 className="text-brown-600 font-bold text-xl lg:text-2xl mt-0 lg:mt-5 mb-1 lg:mb-2 leading-tight" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="mb-0 lg:mb-3 text-brown-600 text-base lg:text-base leading-normal" {...props} />
                        ),
                      }}
                    >
                      {article.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Share Section - Like, Copy Link, Social Media */}
              {/* Same width as content (col-span-9) for lg+ */}
              <div className="mt-6 lg:mt-8">
                <ShareSection initialLikes={article.likes || 0} />
              </div>
            </div>

            {/* Right Column - Author Bio Sidebar (3 columns - reduced) - Same level as Category/Date */}
            <div className="lg:col-span-3 lg:sticky lg:top-[120px] lg:self-start lg:h-fit mt-8 lg:mt-0">
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

