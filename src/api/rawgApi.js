const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const BASE_URL = "https://api.rawg.io/api/games"

export async function fetchInitialGames({ query = "", genre = "", page = 1 }) {
  const url = new URL(BASE_URL)
  url.searchParams.append("key", API_KEY)
  url.searchParams.append("stores", "1")
  url.searchParams.append("page", page)

  if (query) url.searchParams.append("search", query)
  if (genre) url.searchParams.append("genres", genre)

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error("Failed to fetch games")
  const data = await res.json()
  return {
    results: data.results,
    next: data.next,
  }
}

export async function fetchNextPage(nextUrl) {
  const res = await fetch(nextUrl)
  if (!res.ok) throw new Error("Failed to fetch next page")
  const data = await res.json()
  return {
    results: data.results,
    next: data.next,
  }
}
