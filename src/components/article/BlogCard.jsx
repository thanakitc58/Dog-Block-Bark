function BlogCard({ id, image, category, title, description, author, date, onArticleClick }) {
  // สำหรับ id 4 ให้เลื่อนภาพลงเพื่อเห็นแมว
  const imageStyle = id === 4 ? { objectPosition: 'center bottom' } : {};
  
  const handleClick = (e) => {
    e.preventDefault()
    if (onArticleClick) {
      onArticleClick(id)
    }
  }
  
  return (
    <div className="flex flex-col gap-4">
      <button 
        onClick={handleClick}
        className="relative h-[212px] sm:h-[360px] overflow-hidden rounded-md group w-full cursor-pointer"
      >
        <img 
          className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-105" 
          style={imageStyle}
          src={image} 
          alt={title}
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-md"></div>
      </button>
      <div className="flex flex-col">
        <div className="flex">
          <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
            {category}
          </span>
        </div>
        <button onClick={handleClick} className="text-start cursor-pointer">
          <h2 className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline">
            {title}
          </h2>
        </button>
        <p className="text-muted-foreground text-sm mb-4 grow line-clamp-3">
          {description}
        </p>
        <div className="flex items-center text-sm">
          <img 
            className="w-8 h-8 rounded-full mr-2" 
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" 
            alt={author} 
          />
          <span>{author}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard

