export function formatDate(dateString) {
  const date = new Date(dateString)

  const day = date.getDate()
  const ordinal = (n) => {
    if (n > 3 && n < 21) return "th"
    switch (n % 10) {
      case 1:
        return "st"
      case 2:
        return "nd"
      case 3:
        return "rd"
      default:
        return "th"
    }
  }

  const month = date.toLocaleString("en-US", { month: "short" })

  const year = date.getFullYear()

  return `${day}${ordinal(day)} ${month}, ${year}`
}
