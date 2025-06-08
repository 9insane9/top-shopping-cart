import { createContext, useContext, useState, useEffect } from "react"
import { GENRES } from "../../utils/genres"

const FilterContext = createContext()

const initialGenres = GENRES.reduce((accumulator, { slug }) => {
  accumulator[slug] = false
  return accumulator
}, {})

export function FilterProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenres, setSelectedGenres] = useState(initialGenres)
  const [isQuery, setIsQuery] = useState(false)

  const hasSelectedGenres = Object.values(selectedGenres).some(Boolean)

  //search mode latch
  useEffect(() => {
    const shouldBeTrue = Boolean(searchTerm) || hasSelectedGenres
    if (shouldBeTrue && !isQuery) {
      setIsQuery(true)
    }
  }, [searchTerm, selectedGenres, hasSelectedGenres, isQuery])

  function resetFilters() {
    setSearchTerm("")
    setSelectedGenres(initialGenres)
  }

  function resetFilterContext() {
    resetFilters()
    setIsQuery(false)
  }

  return (
    <FilterContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedGenres,
        setSelectedGenres,
        hasSelectedGenres,
        isQuery,
        resetFilters,
        resetFilterContext,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  return useContext(FilterContext)
}
