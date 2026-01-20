import { useState } from 'react'

/**
 * CommentSection Component
 * Displays comment input form and list of comments
 * 
 * Mobile (375px - 768px):
 * - Container: width 375px, height 826px, gap 44px, padding 24px top, 16px left/right, 40px bottom
 * - Comment input section: width 343px, height 190px, gap 12px
 * - User comments section: width 343px, height 528px, gap 24px
 */
function CommentSection() {
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Jacob Lash',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      date: '12 September 2024 at 18:30',
      text: 'I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.'
    },
    {
      id: 2,
      author: 'Ahri',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      date: '12 September 2024 at 18:30',
      text: 'Such a great read! I\'ve always wondered why my cat slow blinks at me—now I know it\'s her way of showing trust!'
    },
    {
      id: 3,
      author: 'Mimi mama',
      avatar: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100&h=100&fit=crop',
      date: '12 September 2024 at 18:30',
      text: 'This article perfectly captures why cats make such amazing pets. I had no idea their purring could help with healing. Fascinating stuff!'
    }
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (commentText.trim()) {
      // TODO: Add comment to API
      const newComment = {
        id: comments.length + 1,
        author: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
        date: new Date().toLocaleDateString('en-GB', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        text: commentText.trim()
      }
      setComments([...comments, newComment])
      setCommentText('')
    }
  }

  return (
    <div className="w-full h-auto min-h-[826px] flex flex-col gap-[44px]  lg:rounded-lg ">
      {/* Comment Input Section */}
      <div className="w-full h-auto min-h-[190px] flex flex-col gap-3">
        {/* Comment Heading */}
        <h3 className="text-brown-400 font-medium text-base leading-6 font-poppins">
          Comment
        </h3>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="w-full h-auto min-h-[130px] flex flex-col gap-3">
          {/* Text Input */}
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="What are your thoughts?"
            className="w-full h-[130px] px-4 py-3 rounded-lg border border-brown-300 bg-white text-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-brown-400 resize-none text-base leading-6"
          />

          {/* Send Button */}
          <button
            type="submit"
            className="w-[121px] h-12 flex items-center justify-center gap-1.5 px-10 py-3 rounded-full bg-brown-600 text-white font-medium hover:bg-brown-700 transition-colors text-base leading-6 lg:items-end"
          >
            Send
          </button>
        </form>
      </div>

      {/* User Comments Section */}
      <div className="w-full h-auto min-h-[528px] flex flex-col gap-6">
        {comments.map((comment, index) => (
          <div 
            key={comment.id} 
            className={`w-full h-auto min-h-[136px] flex flex-col gap-4 ${index !== comments.length - 1 ? 'border-b border-brown-200 pb-6' : ''}`}
          >
            {/* User Info */}
            <div className="w-full max-w-[219px] h-12 flex items-center gap-3">
              {/* Avatar */}
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              {/* Name and Date */}
              <div className="flex flex-col gap-0">
                <span className="text-brown-600 font-medium text-[20px] leading-6">
                  {comment.author}
                </span>
                <span className="text-brown-400 text-[12px] leading-5">
                  {comment.date}
                </span>
              </div>
            </div>

            {/* Comment Text */}
            <p className="text-brown-400 text-base leading-6 font-medium tracking-normal">
              {comment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentSection

