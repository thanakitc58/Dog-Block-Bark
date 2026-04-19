import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '../../context/AuthContext'
import articlesAPI from '../../api/articles'
import LoginModal from './LoginModal'

/**
 * ShareSection Component
 * Displays like button, copy link, and social media share buttons
 *
 * Props:
 * @param {string|number} postId - Post ID for like API
 * @param {number} initialLikes - Initial like count (from article)
 *
 * Features:
 * - Like button: logged-in users can like once per post; unauthenticated see login modal
 * - Copy link and social share
 * - Responsive design
 */
function ShareSection({ postId, initialLikes = 0 }) {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(initialLikes)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)

  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null

  useEffect(() => {
    if (!postId || !isAuthenticated || !token) {
      setLikesCount((c) => (c === 0 && initialLikes > 0 ? initialLikes : c))
      return
    }
    articlesAPI
      .getLikeStatus(postId, token)
      .then(({ liked, count }) => {
        setIsLiked(Boolean(liked))
        setLikesCount(typeof count === 'number' ? count : initialLikes)
      })
      .catch(() => {
        setLikesCount(initialLikes)
      })
  }, [postId, isAuthenticated, token, initialLikes])

  useEffect(() => {
    if (!isAuthenticated) setLikesCount(initialLikes)
  }, [initialLikes, isAuthenticated])

  const handleLike = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true)
      return
    }
    if (!postId || likeLoading) return
    setLikeLoading(true)
    try {
      if (isLiked) {
        const res = await articlesAPI.unlikePost(postId, token)
        setIsLiked(res.liked === undefined ? false : Boolean(res.liked))
        setLikesCount((prev) => (typeof res.count === 'number' ? res.count : prev - 1))
      } else {
        const res = await articlesAPI.likePost(postId, token)
        setIsLiked(res.liked === undefined ? true : Boolean(res.liked))
        setLikesCount((prev) => (typeof res.count === 'number' ? res.count : prev + 1))
      }
    } catch (err) {
      toast.error('Failed to update like')
    } finally {
      setLikeLoading(false)
    }
  }

  const handleCreateAccount = () => {
    setShowLoginModal(false)
    navigate('/signup')
  }

  const handleLogin = () => {
    setShowLoginModal(false)
    navigate('/login')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Copied!', {
        description: 'This article has been copied to your clipboard.',
        duration: 3000,
      })
    } catch (err) {
      console.error('Failed to copy link:', err)
      toast.error('Failed to copy link', {
        description: 'Please try again.',
        duration: 3000,
      })
    }
  }

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href)
    
    let shareUrl = ''
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/share.php?u=${url}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case 'twitter':
        shareUrl = `https://www.twitter.com/share?&url=${url}`
        break
      default:
        return
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  return (
    <div className="w-full lg:max-w-full bg-[#EFEEEB] rounded-none lg:rounded-lg p-4 lg:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-4">
      {/* Like Button - Full width on mobile */}
      <button
        onClick={handleLike}
        disabled={likeLoading}
        type="button"
        className="w-full lg:w-fit h-12 flex items-center justify-center gap-3 px-4 rounded-lg border border-brown-300 bg-white text-brown-600 hover:bg-brown-50 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label={isLiked ? 'Unlike' : 'Like'}
      >
        {/* Smiley Icon - สไตล์เดียวทั้ง liked/unliked (ภาพที่ 2) เปลี่ยนแค่ตัวเลข */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 text-brown-600"
          aria-hidden
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="8" cy="9" r="1.5" fill="currentColor" />
          <circle cx="16" cy="9" r="1.5" fill="currentColor" />
          <path
            d="M8 14c0 2 2 4 4 4s4-2 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-sans font-medium text-[16px] leading-[24px] text-brown-600">
          {likesCount}
        </span>
      </button>

      {/* Copy Link and Social Media - Row layout on mobile */}
      <div className="flex flex-row items-center gap-4 lg:gap-4 w-full lg:w-auto lg:ml-auto">
        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="flex-1 lg:flex-none h-12 flex items-center justify-center gap-3 px-4 rounded-lg border bg-white border-brown-300 text-brown-600 hover:bg-brown-50 transition-colors"
          aria-label="Copy link"
        >
          {/* Copy Icon */}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-brown-600"
          >
            <rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M4 1H1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M1 1L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          
          <span className="font-sans font-medium text-[16px] leading-[24px] whitespace-nowrap">
            Copy link
          </span>
        </button>

        {/* Social Media Icons */}
        <div className="flex items-center gap-3 lg:gap-4 shrink-0">
          {/* Facebook */}
          <button
            onClick={() => handleShare('facebook')}
            className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center hover:bg-[#166FE5] transition-colors"
            aria-label="Share on Facebook"
          >
            <span className="text-white font-bold text-lg">f</span>
          </button>

          {/* LinkedIn */}
          <button
            onClick={() => handleShare('linkedin')}
            className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center hover:bg-[#095992] transition-colors"
            aria-label="Share on LinkedIn"
          >
            <span className="text-white font-semibold text-sm">in</span>
          </button>

          {/* Twitter */}
          <button
            onClick={() => handleShare('twitter')}
            className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center hover:bg-[#1A91DA] transition-colors"
            aria-label="Share on Twitter"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onCreateAccount={handleCreateAccount}
        onLogin={handleLogin}
      />
    </div>
  )
}

export default ShareSection

