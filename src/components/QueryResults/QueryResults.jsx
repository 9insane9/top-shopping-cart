import { useEffect, useState, useRef } from "react"
import { useProducts } from "../context/ProductProvider"
import { useFilters } from "../context/FilterProvider"
import { PropagateLoader } from "react-spinners"
import { GENRES } from "../../utils/genres"
import Filters from "../Filters/Filters"
import ShopItem from "../ShopItem/ShopItem"
import icons from "../../utils/icons"
import classes from "./QueryResults.module.css"

export default function QueryResults({ handleAddToCart }) {
  const { products, loading, hasMore, loadMore, loadingMore } = useProducts()
  const {
    searchTerm,
    setSearchTerm,
    selectedGenres,
    setSelectedGenres,
    hasSelectedGenres,
    setIsQuery,
    resetFilters,
  } = useFilters()

  const [isListView, setIsListView] = useState(true)

  const isSearchCriteria = searchTerm || hasSelectedGenres
  const sentinelRef = useRef(null)

  useEffect(() => {
    if (!hasMore || loadingMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 1 }
    )

    const sentinel = sentinelRef.current
    if (sentinel) observer.observe(sentinel)

    return () => {
      if (sentinel) observer.unobserve(sentinel)
    }
  }, [hasMore, loadingMore, loadMore])

  //search state tracking
  // useEffect(() => {
  //   const hasSelectedGenres = Object.values(selectedGenres).some(Boolean)
  //   if (searchTerm || hasSelectedGenres) {
  //     setIsQuery(true)
  //   }
  // }, [searchTerm, selectedGenres])

  function handleRemoveGenre(slug) {
    setSelectedGenres((prev) => ({
      ...prev,
      [slug]: false,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const term = e.target.elements["search"].value.trim()
    setSearchTerm(term)
    // setIsQuery(true)
  }

  function handleReset(e) {
    e.preventDefault()
    resetFilters()
  }

  const toggleListView = () => {
    setIsListView((prev) => !prev)
  }

  const nothingFound = isSearchCriteria && !loading && products.length === 0
  const activeGenres = GENRES.filter((genre) => selectedGenres[genre.slug])

  return (
    <div className={classes.queryResults}>
      <div className={classes.left}>
        <Filters />
      </div>
      <div className={classes.right}>
        <div className={classes.topMenu}>
          {isSearchCriteria ? (
            <div className={classes.criteriaContainer}>
              {searchTerm ? (
                <div className={classes.criteria}>
                  {`"${searchTerm}"`}
                  <button onClick={() => setSearchTerm("")}>
                    {icons.cross({ className: `${classes.removeCriteria}` })}
                  </button>
                </div>
              ) : null}
              {activeGenres.map(({ name, slug }) => (
                <div className={classes.criteria} key={slug}>
                  {name}
                  <button onClick={() => handleRemoveGenre(slug)}>
                    {icons.cross({ className: `${classes.removeCriteria}` })}
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <div className={classes.searchMenu}>
            {/* spacer div to keep search in the middle and grid button on the right */}
            <div></div>
            <form className={classes.searchContainer} onSubmit={handleSubmit}>
              <button type="button" onClick={handleReset}>
                {icons.trash({ className: `${classes.trash}` })}
              </button>
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
            </form>
            <div className={classes.viewBtnsContainer}>
              {isListView ? (
                <button onClick={toggleListView}>
                  {icons.grid({ className: `${classes.gridIcon}` })}
                </button>
              ) : (
                <button onClick={toggleListView}>
                  {icons.list({ className: `${classes.listIcon}` })}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={classes.productListContainer}>
          {!isSearchCriteria && !loading ? (
            <div className={classes.noCriteria}>
              Perform a search or select a genre to see products.
            </div>
          ) : loading /* spinner */ ? (
            <div className={classes.loadSpinner}>
              <PropagateLoader color="#a0a0a0" />
            </div>
          ) : nothingFound ? (
            <div className={classes.noResults}>
              No products found. Try different keywords or genres.
            </div>
          ) : isListView ? (
            <ul className={classes.productList}>
              {products.map((item) => (
                <ShopItem
                  key={item.id}
                  {...item}
                  onAdd={handleAddToCart}
                  listView
                />
              ))}
            </ul>
          ) : (
            <ul className={classes.productGrid}>
              {products.map((item) => (
                <ShopItem key={item.id} {...item} onAdd={handleAddToCart} />
              ))}
            </ul>
          )}
        </div>
        <div className={classes.loadingSection}>
          {/* fallback if auto-load fails */}
          {/* {!loading && isSearchCriteria && hasMore && !loadingMore && (
            <button className={classes.loadMoreBtn} onClick={loadMore}>
              Load more
            </button>
          )} */}

          {/* spinner */}
          {loadingMore && !loading && (
            <div className={classes.loadSpinner}>
              <PropagateLoader color="#a0a0a0" />
            </div>
          )}

          {/* invisible div to detect scroll */}
          {!loading && isSearchCriteria && (
            <div ref={sentinelRef} style={{ height: "1px" }} />
          )}
        </div>
      </div>
    </div>
  )
}
