export function generateFakePrice(rating, released) {
  const priceTiers = [5.99, 9.99, 14.99, 19.99, 29.99, 39.99, 49.99, 59.99]
  const ratingScore = rating
    ? Math.min(Math.floor(rating * 2), priceTiers.length - 1)
    : 2
  const yearScore = released
    ? Math.max(
        0,
        priceTiers.length -
          1 -
          (new Date().getFullYear() - new Date(released).getFullYear())
      )
    : priceTiers.length - 3
  const baseIndex = Math.floor((ratingScore + yearScore) / 2)
  const randomShift = Math.floor(Math.random() * 3) - 1
  const finalIndex = Math.min(
    priceTiers.length - 1,
    Math.max(0, baseIndex + randomShift)
  )
  return priceTiers[finalIndex]
}

export function processGame(game) {
  if (
    !game.id ||
    !game.name ||
    !game.background_image ||
    !game.short_screenshots?.length ||
    !game.rating ||
    !game.ratings ||
    !game.released ||
    !game.genres?.length
  ) {
    console.log("invalid product found")
    return null
  }

  const processedGame = {
    id: game.id,
    name: game.name,
    imgSrc: game.background_image,
    screenShots: game.short_screenshots.slice(1).map((s) => s.image),
    price: generateFakePrice(game.rating, game.released),
    rating: game.rating,
    ratingCount: game.ratings.reduce(
      (total, rating) => total + rating.count,
      0
    ),

    released: game.released,
    genres: game.genres?.map((g) => g.name),
  }

  // console.log(processedGame)
  return processedGame
}
