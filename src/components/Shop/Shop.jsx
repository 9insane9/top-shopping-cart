import { toast } from "react-toastify"
import { useCart } from "../context/CartProvider"
import { useProducts } from "../context/ProductProvider"
import { useFilters } from "../context/FilterProvider"
import DefaultShopPage from "../DefaultShopPage/DefaultShopPage"
import QueryResults from "../QueryResults/QueryResults"
import classes from "./Shop.module.css"

export default function Shop() {
  const { addToCart } = useCart()
  const { productCache, error } = useProducts()
  const { isQuery } = useFilters()

  function handleAddToCart(id) {
    const item = productCache[id]
    addToCart(id)
    toast(`${item.name} added to cart!`)
  }

  if (error) return <p>Failed to load products. Try again later.</p>

  return (
    <div className={classes.shopContainer}>
      {isQuery ? (
        <QueryResults handleAddToCart={handleAddToCart} />
      ) : (
        <DefaultShopPage handleAddToCart={handleAddToCart} />
      )}
    </div>
  )
}
