import React, { useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../footer/footer'

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
        <NavBar onLogoClick={onBack} />
      </div>
      
      {/* Article Detail Container */}
      <article className="flex-1 w-full px-4 lg:px-[120px]">
        {/* Main Image - Mobile: 375x184px, top 48px */}
        <div className="w-full mt-[48px] lg:mt-[100px] mb-6">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-[184px] lg:h-[60vh] lg:max-h-[500px] object-cover rounded-lg"
          />
        </div>

        {/* Content Layout - Mobile: width 375px, top 232px, padding 24px top, 16px left/right, 40px bottom, gap 24px */}
        <div className="w-full lg:w-full lg:mt-0 pt-0 lg:pt-0 pb-10 lg:pb-16 flex flex-col gap-6 lg:gap-4">
          {/* Category and Date */}
          <div className="flex items-center gap-4">
            <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600">
              {article.category}
            </span>
            <span className="text-brown-400 text-sm">
              {article.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-brown-600 font-bold text-3xl lg:text-4xl leading-tight">
            {article.title}
          </h1>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* Parse and render content */}
            {article.content && (
              <div className="text-brown-600 leading-relaxed flex flex-col gap-6">
                {article.content.split('\n\n').map((paragraph, index) => {
                  // Check if paragraph is a heading (starts with ##)
                  if (paragraph.startsWith('## ')) {
                    const headingText = paragraph.replace('## ', '')
                    return (
                      <h2 key={index} className="text-brown-600 font-bold text-2xl mt-0 lg:mt-8 mb-0 lg:mb-4">
                        {headingText}
                      </h2>
                    )
                  }
                  // Regular paragraph
                  return (
                    <p key={index} className="mb-0 lg:mb-4 text-brown-600">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            )}
          </div>

          {/* Author Info */}
          <div className="flex items-center mt-0 lg:mt-8 pt-0 lg:pt-8 border-t-0 lg:border-t border-brown-300">
            <img 
              className="w-12 h-12 rounded-full mr-4" 
              src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" 
              alt={article.author} 
            />
            <div>
              <p className="font-semibold text-brown-600">{article.author}</p>
              <p className="text-sm text-brown-400">{article.date}</p>
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

