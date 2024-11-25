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
