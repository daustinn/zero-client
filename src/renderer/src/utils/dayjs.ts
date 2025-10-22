import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function timeAgo(date: Date | string) {
  return dayjs(date).fromNow()
}

export function format(date: Date | string, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}

export function timeAgoShort(date: Date | string) {
  const now = dayjs()
  const then = dayjs(date)
  const diffInMinutes = now.diff(then, 'minute')
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`
  }
  const diffInHours = now.diff(then, 'hour')
  if (diffInHours < 24) {
    return `${diffInHours}h`
  }
  const diffInDays = now.diff(then, 'day')
  if (diffInDays < 30) {
    return `${diffInDays}d`
  }
  const diffInMonths = now.diff(then, 'month')
  if (diffInMonths < 12) {
    return `${diffInMonths}mo`
  }
  const diffInYears = now.diff(then, 'year')
  return `${diffInYears}y`
}

export function now() {
  return dayjs().toDate()
}
