import ShopItem from "../ShopItem/ShopItem"
import ShopCarousel from "../ShopCarousel/ShopCarousel"
import { useProducts } from "../context/ProductProvider"
import classes from "./DefaultShopPage.module.css"
import ShimmerBox from "../../utils/ShimmerBox"

export default function DefaultShopPage({ handleAddToCart }) {
  const { carouselData, loadingCarouselData } = useProducts()

  const PLACEHOLDER_COUNT = 5

  // prepare the carousels array (JSX elements)
  const renderedCarousels = loadingCarouselData
    ? // when loading, create placeholder sections
      Array.from({ length: PLACEHOLDER_COUNT }).map((_, idx) => (
        <section
          /* guard against early clicks */
          style={{ pointerEvents: "none" }}
          key={`shimmer-section-${idx}`}
          className={`${classes.carouselSection} ${classes.filter}`}
        >
          <ShopCarousel genreName="Loading...">
            {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
              <div className={classes.fakeItem}>
                <ShimmerBox mode="dark" key={`shimmer-${i}`} />
              </div>
            ))}
          </ShopCarousel>
        </section>
      ))
    : // when loaded, map actual data
      carouselData.map(({ genre, games }) => (
        <section key={genre} className={classes.carouselSection}>
          <ShopCarousel genreName={genre}>
            {games.slice(0, 10).map((game) => (
              <ShopItem key={game.id} {...game} onAdd={handleAddToCart} />
            ))}
          </ShopCarousel>
        </section>
      ))

  return <div className={classes.defaultView}>{renderedCarousels}</div>
}
