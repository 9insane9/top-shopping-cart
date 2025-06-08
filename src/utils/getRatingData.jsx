import icons from "./icons"

export function getRatingData(rating, ratingCount, classes) {
  const clampedRating = Math.max(0.01, Math.min(rating, 5.0))
  const percent = Math.round((clampedRating / 5) * 100)

  let title = ""
  let status = ""

  if (percent >= 70) {
    title =
      percent >= 95
        ? "Overwhelmingly Positive"
        : percent >= 80
        ? "Very Positive"
        : "Mostly Positive"
    status = "positive"
  } else if (percent >= 40) {
    title = "Mixed"
    status = "mixed"
  } else {
    title = percent >= 20 ? "Mostly Negative" : "Very Negative"
    status = "negative"
  }

  const string = `${percent}% of the ${ratingCount} reviews for this game are positive`

  function getIcon(baseClassName) {
    const combinedClassName = `${baseClassName} ${classes[status]}`

    switch (status) {
      case "positive":
        return icons.thumbUp({ className: combinedClassName })
      case "mixed":
        return icons.mixed({ className: combinedClassName })
      case "negative":
        return icons.thumbDown({ className: combinedClassName })
      default:
        return null
    }
  }

  return { title, string, status, getIcon }
}
