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
