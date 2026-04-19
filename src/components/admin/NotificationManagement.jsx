import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import articlesAPI from '../../api/articles'

const PER_PAGE = 6

/**
 * แปลง ISO date เป็น "X minutes/hours/days ago"
 */
function formatTimeAgo(isoDate) {
  if (!isoDate) return 'Recently'
  const date = new Date(isoDate)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minutes ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString()
}

/**
 * NotificationManagement Component
 * แจ้งเตือนเมื่อมี like หรือ comment จาก user - ดึงรูป ชื่อ และโครงตามภาพ
 */
function NotificationManagement() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setLoading(true)
    articlesAPI
      .getNotifications(page, PER_PAGE)
      .then((data) => {
        setNotifications(data.notifications || [])
        setTotalPages(data.totalPages || 1)
        setTotal(data.total || 0)
      })
      .catch(() => {
        setNotifications([])
        setTotalPages(1)
        setTotal(0)
      })
      .finally(() => setLoading(false))
  }, [page])

  const getNotificationText = (notification) => {
    if (notification.type === 'comment') {
      return `Commented on your article: ${notification.articleTitle || ''}`
    }
    if (notification.type === 'like') {
      return `liked your article: ${notification.articleTitle || ''}`
    }
    return ''
  }

  if (loading) {
    return (
      <div className="w-[1160px] min-h-[656px] px-[60px] pt-10 pb-[120px] flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-brown-900">Notification</h2>
        <p className="text-brown-500 py-8">Loading...</p>
      </div>
    )
  }

  return (
    <div className="w-[1160px] ml-[100px] min-h-[656px] px-[60px] pt-10 pb-[120px] flex flex-col gap-6">
      <header>
        <h2 className="text-2xl font-semibold text-brown-900">Notification</h2>
      </header>

      <section className="flex flex-col divide-y divide-brown-100">
        {notifications.length === 0 ? (
          <p className="text-brown-500 py-8">No notifications yet.</p>
        ) : (
          notifications.map((notification) => (
            <article key={notification.id} className="py-6 flex items-start gap-4">
              {/* รูปโปรไฟล์ user */}
              <div className="w-12 h-12 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
                {notification.user?.avatar ? (
                  <img
                    src={notification.user.avatar}
                    alt={notification.user.name || 'User'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-brown-600 font-medium text-sm">
                    {notification.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>

              {/* เนื้อหาแจ้งเตือน */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-base text-brown-900 mb-1">
                      <span className="font-semibold">{notification.user?.name || 'Someone'}</span>{' '}
                      <span>{getNotificationText(notification)}</span>
                    </p>

                    {notification.type === 'comment' && notification.comment && (
                      <p className="text-base text-brown-600 italic mb-2 mt-2">
                        &quot;{notification.comment}&quot;
                      </p>
                    )}

                    <p className="text-sm text-orange-600">
                      {formatTimeAgo(notification.createdAt)}
                    </p>
                  </div>

                  <Link
                    to={`/article/${notification.articleId}`}
                    className="text-base text-brown-900 font-medium hover:text-brown-600 transition-colors shrink-0"
                  >
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-brown-200 pt-4 mt-4">
          <p className="text-sm text-brown-500">
            Page {page} of {totalPages} ({total} notifications)
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-brown-300 bg-white text-brown-600 hover:bg-brown-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-brown-300 bg-white text-brown-600 hover:bg-brown-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationManagement
