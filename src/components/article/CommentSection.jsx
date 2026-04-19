import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import articlesAPI from '../../api/articles'

/**
 * CommentSection Component
 * Displays comment input form and list of comments for a post.
 * User or admin must be logged in to send a comment.
 *
 * @param {string|number} postId - Post ID to load and submit comments for
 */
function CommentSection({ postId }) {
  const { user, isAuthenticated } = useAuth()
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null

  const formatCommentDate = (isoDate) => {
    if (!isoDate) return ''
    try {
      const d = new Date(isoDate)
      if (isNaN(d.getTime())) return isoDate
      return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return isoDate
    }
  }

  useEffect(() => {
    if (!postId) {
      setComments([])
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    articlesAPI
      .getComments(postId)
      .then((data) => {
        const list = Array.isArray(data.comments) ? data.comments : []
        setComments(list)
      })
      .catch(() => {
        setComments([])
        setError('Failed to load comments')
      })
      .finally(() => setLoading(false))
  }, [postId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = commentText.trim()
    if (!trimmed) return

    if (!isAuthenticated || !token) {
      setError('Please log in to comment')
      return
    }

    setSending(true)
    setError('')
    try {
      const data = await articlesAPI.createComment(postId, trimmed, token)
      const newComment = data.comment
      if (newComment) {
        setComments((prev) => [
          ...prev,
          {
            id: newComment.id,
            author_name: newComment.author_name || user?.name || 'User',
            author_avatar: newComment.author_avatar || user?.avatar || user?.profilePic,
            created_at: newComment.created_at,
            content: newComment.content
          }
        ])
        setCommentText('')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send comment')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="w-full h-auto min-h-[826px] flex flex-col gap-[44px] lg:rounded-lg">
      {/* Comment Input Section */}
      <div className="w-full h-auto min-h-[190px] flex flex-col gap-3">
        <h3 className="text-brown-400 font-medium text-base leading-6 font-poppins">
          Comment
        </h3>

        <form onSubmit={handleSubmit} className="w-full h-auto min-h-[130px] flex flex-col gap-3">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={isAuthenticated ? 'What are your thoughts?' : 'Log in to leave a comment'}
            disabled={!isAuthenticated}
            className="w-full h-[130px] px-4 py-3 rounded-lg border border-brown-300 bg-white text-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-brown-400 resize-none text-base leading-6 disabled:opacity-60 disabled:cursor-not-allowed"
          />

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={!commentText.trim() || sending || !isAuthenticated}
            className="w-[121px] h-12 flex items-center justify-center gap-1.5 px-10 py-3 rounded-full bg-brown-600 text-white font-medium hover:bg-brown-700 transition-colors text-base leading-6 lg:items-end disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>

      {/* User Comments Section */}
      <div className="w-full h-auto min-h-[528px] flex flex-col gap-6">
        {loading ? (
          <p className="text-brown-400 text-sm">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-brown-400 text-sm">No comments yet. Be the first to comment.</p>
        ) : (
          comments.map((comment, index) => (
            <div
              key={comment.id}
              className={`w-full h-auto min-h-[136px] flex flex-col gap-4 ${index !== comments.length - 1 ? 'border-b border-brown-200 pb-6' : ''}`}
            >
              <div className="w-full max-w-[219px] h-12 flex items-center gap-3">
                {comment.author_avatar ? (
                  <img
                    src={comment.author_avatar}
                    alt={comment.author_name || 'User'}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brown-300 flex items-center justify-center shrink-0">
                    <span className="text-brown-600 font-medium text-sm">
                      {(comment.author_name || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-0">
                  <span className="text-brown-600 font-medium text-[20px] leading-6">
                    {comment.author_name || 'User'}
                  </span>
                  <span className="text-brown-400 text-[12px] leading-5">
                    {formatCommentDate(comment.created_at)}
                  </span>
                </div>
              </div>
              <p className="text-brown-400 text-base leading-6 font-medium tracking-normal">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CommentSection
