import { ToastContainer, toast } from "react-toastify"
import ShopItem from "../ShopItem/ShopItem"
import classes from "./Shop.module.css"
import { useCart } from "../context/CartProvider"
import { useProducts } from "../context/ProductProvider"

export default function Shop() {
  const { addToCart } = useCart()
  const { products, loading, error } = useProducts()

  function handleAddToCart(id) {
    addToCart(id)
    const item = products.find((i) => i.id === id)
    toast(`${item.name} added to cart!`)
  }

  if (loading) return <div>Loading products...</div>
  if (error) return <p>Failed to load products. Try again later.</p>

  return (
    <div className={classes.shopContainer}>
      <ul className={classes.productList}>
        {products.map((item) => (
          <ShopItem key={item.id} {...item} onAdd={handleAddToCart} />
        ))}
      </ul>
    </div>
  )
}
