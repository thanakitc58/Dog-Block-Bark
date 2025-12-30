import React from 'react'
import BlogCard from './BlogCard'
import blogPosts from '../../data/blogPosts'

function ArticleSection() {
  return (
    <section className="w-full flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-[1200px] min-[1024px]:px-[120px] min-[1440px]:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {blogPosts.map((post) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default ArticleSection

