import { format, toDate, fromUnixTime } from "date-fns"

export function truncateString(str: string, maxLength: number) {
  // Check if the length of the string is greater than the maximum length
  if (str.length > maxLength) {
    // Truncate the string to the maximum length and add "..."
    return str.substring(0, maxLength) + '...'
  } else {
    // If the string is equal to or shorter than the maximum length, return the same string
    return str
  }
}

export function formatDate(value: number | string | Date) {
  let date
  if (typeof value === 'number') date = fromUnixTime(value)
  else date = toDate(value)
  return format(date, 'dd/MM/yyyy')
}

export function copyObject<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj)) as T
}
