import { useState } from 'react'

/**
 * LikeButton Component
 * Displays like count with interactive like button
 * 
 * Props:
 * @param {number} initialLikes - Initial number of likes
 * 
 * Features:
 * - Clickable like button with state management
 * - Shows like count with smiley icon
 * - Toggle like/unlike functionality
 */
function LikeButton({ initialLikes = 0 }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(initialLikes)

  const handleLike = () => {
    if (isLiked) {
      // Unlike: decrease count
      setLikesCount(prev => prev - 1)
      setIsLiked(false)
    } else {
      // Like: increase count
      setLikesCount(prev => prev + 1)
      setIsLiked(true)
    }
  }

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
        isLiked
          ? 'bg-brown-100 border-brown-600 text-brown-600'
          : 'bg-white border-brown-300 text-brown-600 hover:bg-brown-50'
      }`}
      aria-label={isLiked ? 'Unlike' : 'Like'}
    >
      {/* Smiley Icon */}
      <span className="text-xl">{isLiked ? '😊' : '🙂'}</span>
      
      {/* Like Count */}
      <span className="font-sans font-medium text-[16px] leading-[24px]">
        {likesCount}
      </span>
    </button>
  )
}

export default LikeButton

