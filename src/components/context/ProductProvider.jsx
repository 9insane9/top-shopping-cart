import { useState, createContext, useContext, useEffect } from "react"
import { fetchInitialGames, fetchNextPage } from "../../api/rawgApi"
import { processGame } from "../../utils/processGameData"
import { useFilters } from "./FilterProvider"
import { GENRES } from "../../utils/genres"

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const { selectedGenres, searchTerm } = useFilters()
  const genre = Object.entries(selectedGenres)
    .filter(([, isChecked]) => isChecked)
    .map(([slug]) => slug)
    .join(",")

  const [pages, setPages] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const [carouselData, setCarouselData] = useState([])
  const [productCache, setProductCache] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadingCarouselData, setLoadingCarouselData] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // load carousel data on mount
  useEffect(() => {
    const loadCarousels = async () => {
      setLoadingCarouselData(true)
      try {
        const genreData = await Promise.all(
          GENRES.map(async ({ name, slug }) => {
            const { results } = await fetchInitialGames({ genre: slug })
            const processed = results.map(processGame).filter(Boolean)
            addToCache(processed)
            return { genre: name, games: processed }
          })
        )
        setCarouselData(genreData)
      } catch (err) {
        console.error("❌ Failed to load carousel data:", err)
      } finally {
        setLoadingCarouselData(false)
      }
    }

    loadCarousels()
  }, [])

  // load search products
  useEffect(() => {
    if (!searchTerm && !genre) return

    const loadProducts = async () => {
      setLoading(true)
      try {
        const { results, next } = await fetchInitialGames({
          query: searchTerm,
          genre,
          page: 1,
        })
        const processed = results.map(processGame).filter(Boolean)
        addToCache(processed)
        setPages([processed])
        setNextUrl(next)
        setError(null)
      } catch (err) {
        console.error("❌ Failed to fetch products:", err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [searchTerm, genre])

  function addToCache(products) {
    setProductCache((prev) => {
      const newCache = { ...prev }
      products.forEach((product) => {
        newCache[product.id] = product
      })
      return newCache
    })
  }

  const loadMore = async () => {
    if (!nextUrl) return
    setLoadingMore(true)
    try {
      await delay(700)
      const { results, next } = await fetchNextPage(nextUrl)
      // console.log("Fetched next page, next URL:", next)
      const moreProcessed = results.map(processGame).filter(Boolean)
      addToCache(moreProcessed)
      setPages((prevPages) => [...prevPages, moreProcessed])
      setNextUrl(next)
    } catch (err) {
      console.error("❌ Failed to fetch more products:", err)
      setError(err)
    } finally {
      setTimeout(() => {
        setLoadingMore(false)
      }, 1000)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products: pages.flat(),
        pages,
        carouselData,
        productCache,
        loading,
        loadingMore,
        loadingCarouselData,
        error,
        loadMore,
        hasMore: !!nextUrl,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductContext)
}
