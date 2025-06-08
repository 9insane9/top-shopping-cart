import { GENRES } from "../../utils/genres"
import { useDrawer } from "../context/DrawerProvider"
import { useFilters } from "../context/FilterProvider"
import { useNavigate } from "react-router-dom"
import icons from "../../utils/icons"
import classes from "./Filters.module.css"

export default function Filters({ drawerVariant = false }) {
  const { closeDrawer } = useDrawer()
  const {
    searchTerm,
    setSearchTerm,
    selectedGenres,
    setSelectedGenres,
    resetFilters,
  } = useFilters()

  const navigate = useNavigate()

  function handleGenreChange(e) {
    const { name, checked } = e.target
    setSelectedGenres((prev) => ({ ...prev, [name]: checked }))
    navigate("/shop") /* navigate to results page */
  }

  function handleSubmit(e) {
    const term = e.target.elements["search"].value.trim()
    e.preventDefault()

    setSearchTerm(term)
    closeDrawer()
  }

  function handleReset(e) {
    e.preventDefault()
    resetFilters()
  }

  return (
    <form className={classes.filtersContainer} onSubmit={handleSubmit}>
      {drawerVariant ? (
        <div className={classes.drawerExtras}>
          <button onClick={handleReset} className={classes.resetBtn}>
            Reset Filters
          </button>
          <div className={classes.searchContainer}>
            <input
              className={classes.searchInput}
              type="search"
              name="search"
              id="search"
              defaultValue={searchTerm}
              placeholder="Search games..."
            />
            <button type="submit" className={classes.searchBtn}>
              {icons.search({ className: `${classes.search}` })}
            </button>
          </div>
        </div>
      ) : null}

      <div className={classes.allGenresContainer}>
        <h2 className={classes.genresTitle}>Narrow by genre</h2>
        {GENRES.map(({ name, slug }) => (
          <div
            className={`${classes.genre} ${
              selectedGenres[slug] ? classes.selected : ""
            }`}
            key={slug}
          >
            <label className={classes.customCheckbox}>
              <input
                type="checkbox"
                name={slug}
                id={slug}
                checked={selectedGenres[slug]}
                onChange={handleGenreChange}
              />
              <span className={classes.checkmark}></span>
              {name}
            </label>
          </div>
        ))}
      </div>
    </form>
  )
}
