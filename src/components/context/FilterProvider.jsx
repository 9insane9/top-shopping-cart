import { createContext, useContext, useState } from "react"
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

  function resetFilters() {
    setSearchTerm("")
    setSelectedGenres(initialGenres)
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
        setIsQuery,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  return useContext(FilterContext)
}
