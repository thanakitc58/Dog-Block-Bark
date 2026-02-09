import { Link } from 'react-router-dom'

/**
 * NotificationManagement Component
 * Notification list for admin panel
 */
function NotificationManagement() {
  // Mock data - replace with API call
  const notifications = [
    {
      id: 1,
      user: {
        name: 'Jacob Lash',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      type: 'comment',
      articleTitle: 'The Fascinating World of Cats: Why We Love Our Furry Friends',
      comment: 'I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.',
      timestamp: '4 hours ago',
      articleId: 1
    },
    {
      id: 2,
      user: {
        name: 'Jacob Lash',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      type: 'like',
      articleTitle: 'The Fascinating World of Cats: Why We Love Our Furry Friends',
      timestamp: '4 hours ago',
      articleId: 1
    }
  ]

  const getNotificationText = (notification) => {
    if (notification.type === 'comment') {
      return `Commented on your article: ${notification.articleTitle}`
    } else if (notification.type === 'like') {
      return `liked your article: ${notification.articleTitle}`
    }
    return ''
  }

  return (
    <div className="w-[1160px] min-h-[656px] px-[60px] pt-10 pb-[120px] flex flex-col gap-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-brown-900">Notification</h2>

      {/* Notification List */}
      <div className="flex flex-col divide-y divide-brown-100">
        {notifications.map((notification) => (
          <div key={notification.id} className="py-6 flex items-start gap-4">
            {/* Profile Picture */}
            <div className="w-12 h-12 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
              {notification.user.avatar ? (
                <img
                  src={notification.user.avatar}
                  alt={notification.user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-brown-600 font-medium text-sm">
                  {notification.user.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              )}
            </div>

            {/* Notification Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-base text-brown-900 mb-1">
                    <span className="font-semibold">{notification.user.name}</span>{' '}
                    <span>{getNotificationText(notification)}</span>
                  </p>
                  
                  {notification.comment && (
                    <p className="text-base text-brown-600 italic mb-2 mt-2">
                      "{notification.comment}"
                    </p>
                  )}
                  
                  <p className="text-sm text-orange-600">{notification.timestamp}</p>
                </div>

                {/* View Link */}
                <Link
                  to={`/article/${notification.articleId}`}
                  className="text-base text-brown-900 font-medium hover:text-brown-600 transition-colors shrink-0"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationManagement

