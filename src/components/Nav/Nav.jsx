import { Link, useNavigate } from "react-router-dom"
import { useFilters } from "../context/FilterProvider"
import { useCart } from "../context/CartProvider"
import icons from "../../utils/icons"
import classes from "./Nav.module.css"

export default function Nav({ onDrawerToggle, setDrawerContent }) {
  const { searchTerm, setSearchTerm, resetFilterContext } = useFilters()
  const { cartTotalQty } = useCart()
  const navigate = useNavigate()

  const handleShopClick = () => {
    resetFilterContext()
  }

  const handleSearchClick = () => {
    setDrawerContent("search")
    onDrawerToggle()
  }

  const handleCartClick = () => {
    setDrawerContent("cart")
    onDrawerToggle()
  }

  // const handleMenuClick = () => {
  //   setDrawerContent("menu")
  //   onDrawerToggle()
  // }

  function handleSubmit(e) {
    e.preventDefault()
    const term = e.target.elements["search"].value.trim()
    setSearchTerm(term)
    navigate("/shop")
  }

  return (
    <div className={classes.navBarContainer}>
      <nav className={classes.navBar}>
        <ul className={classes.links}>
          <li>
            <Link to="home">Home</Link>
          </li>
          <li>
            <Link to="shop" onClick={handleShopClick}>
              Shop
            </Link>
          </li>
        </ul>
        <div className={classes.btnContainer}>
          <form className={classes.searchContainer} onSubmit={handleSubmit}>
            <input
              className={classes.searchInput}
              type="search"
              name="search"
              id="search"
              defaultValue={searchTerm}
              placeholder="Search games..."
            />
            <button type="submit" className={classes.btn}>
              {icons.search({ className: `${classes.search}` })}
            </button>
          </form>
          <button
            className={`${classes.btn} ${classes.searchBtn}`}
            onClick={handleSearchClick}
          >
            {icons.search({ className: `${classes.search}` })}
          </button>
          <button
            className={`${classes.btn} ${classes.cartBtn}`}
            onClick={handleCartClick}
          >
            {icons.cart({ className: `${classes.cart}` })}
            {cartTotalQty ? (
              <p className={classes.tinyNumber}>{cartTotalQty}</p>
            ) : null}
          </button>
          {/* <button className={classes.btn} onClick={handleMenuClick}>
          <img src="/menu.svg" alt="menu" />
        </button> */}
        </div>
      </nav>
    </div>
  )
}
