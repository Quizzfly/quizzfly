export function formatDateTime(time: string) {
  const date = new Date(time)

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const month = monthNames[date.getMonth()]

  const day = date.getDate()
  let hour = date.getHours()
  const minute = String(date.getMinutes()).padStart(2, '0')

  const period = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12 || 12

  return `${month} ${day} at ${hour}:${minute} ${period}`
}

export function formatCommentDateTime(time: string) {
  const now = new Date() as any
  const date = new Date(time) as any
  const diffInSeconds = Math.floor((now - date) / 1000) + 60

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} day`
  }

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month`
  }

  const diffInYears = Math.floor(diffInDays / 365)
  return `${diffInYears} year`
}

export function isExpiredPlan(dateString: string) {
  const inputDate = new Date(dateString)
  const currentDate = new Date()
  return inputDate < currentDate
}
