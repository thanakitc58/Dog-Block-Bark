/**
 * Convert ISO 8601 date string to readable format
 * Example: "2024-08-21T00:00:00.000Z" -> "21 August 2024"
 * @param {string} isoDateString - ISO 8601 date string
 * @returns {string} Formatted date string (e.g., "11 September 2024")
 */
export function formatDate(isoDateString) {
  if (!isoDateString) return ''
  
  try {
    const date = new Date(isoDateString)
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return isoDateString // Return original if invalid
    }
    
    // Format: "11 September 2024"
    const day = date.getDate()
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    
    return `${day} ${month} ${year}`
  } catch (error) {
    console.error('Error formatting date:', error)
    return isoDateString // Return original if error
  }
}

/**
 * Format multiple articles' dates
 * @param {Array} articles - Array of article objects
 * @returns {Array} Array of articles with formatted dates
 */
export function formatArticlesDates(articles) {
  if (!Array.isArray(articles)) return articles
  
  return articles.map(article => ({
    ...article,
    date: formatDate(article.date)
  }))
}

