import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginModal from './LoginModal'

/**
 * ShareSection Component
 * Displays like button, copy link, and social media share buttons
 * 
 * Props:
 * @param {number} initialLikes - Initial number of likes
 * 
 * Features:
 * - Like button with state management
 * - Copy link functionality
 * - Social media share buttons (Facebook, LinkedIn, Twitter)
 * - Login modal when clicking like without being logged in
 * - Responsive design (375px for mobile, responsive for larger screens)
 */
function ShareSection({ initialLikes = 0 }) {
  const navigate = useNavigate()
  
  // Mock authentication state (replace with actual auth check)
  const [isLoggedIn] = useState(false)
  
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(initialLikes)
  const [isCopied, setIsCopied] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleLike = () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    // If logged in, proceed with like/unlike
    if (isLiked) {
      setLikesCount(prev => prev - 1)
      setIsLiked(false)
    } else {
      setLikesCount(prev => prev + 1)
      setIsLiked(true)
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
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(document.title)
    
    let shareUrl = ''
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        break
      default:
        return
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  return (
    <div className="w-full lg:max-w-full min-h-[152px] lg:min-h-auto bg-[#EFEEEB] rounded-none lg:rounded-lg p-4 lg:p-6 flex flex-col gap-6 lg:gap-6">
      {/* Like Button */}
      <button
        onClick={handleLike}
        className={`w-full lg:max-w-[343px] h-12 flex items-center justify-center gap-3 rounded-full border transition-all duration-200 ${
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

      {/* Copy Link and Social Share */}
      <div className="flex flex-row items-center gap-4 lg:gap-4">
        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className={`flex-1 lg:max-w-[200px] h-12 flex items-center justify-center gap-3 px-4 rounded-lg border bg-white border-brown-300 text-brown-600 hover:bg-brown-50 transition-colors ${
            isCopied ? 'bg-green-50 border-green-300' : ''
          }`}
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
            {isCopied ? 'Copied!' : 'Copy link'}
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

