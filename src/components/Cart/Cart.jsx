import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartProvider"
import { useProducts } from "../context/ProductProvider"
import { useDrawer } from "../context/DrawerProvider"
import CartItem from "../CartItem/CartItem"
import classes from "./Cart.module.css"

export default function Cart({ variant = "drawer", onClose }) {
  const { cartItemList, removeFromCart, updateQty, clearCart } = useCart()
  const { productCache } = useProducts()
  const { closeDrawer } = useDrawer()
  const navigate = useNavigate()

  function handleRemoveFromCart(id) {
    removeFromCart(id)
    const item = productCache[id]
    if (!item) return
    toast(`${item.name} removed from cart!`)
  }

  const orderProducts = () => {
    clearCart()
    navigate("/success")
    closeDrawer()
  }

  const total = cartItemList.reduce((sum, cartItem) => {
    const product = productCache[cartItem.id]
    if (!product) return sum
    return sum + cartItem.qty * Number(product.price)
  }, 0)

  const drawerCart = (
    <div className={`${classes.cart} ${classes.drawerCart}`}>
      <h1>Shopping cart</h1>
      {cartItemList.length !== 0 ? (
        <div className={`${classes.cartBtns} ${classes.drawerCartBtns}`}>
          <button onClick={onClose}>
            <Link to="cart">Edit shopping cart</Link>
          </button>
          <button className={classes.checkoutBtn} onClick={orderProducts}>
            Order products
          </button>
        </div>
      ) : null}

      {cartItemList.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItemList.map(({ id, qty }) => (
          <CartItem
            key={id}
            variant="drawer"
            id={id}
            qty={qty}
            onRemove={handleRemoveFromCart}
            onUpdate={updateQty}
          />
        ))
      )}
      <div className={classes.total}>Total: {total.toFixed(2)} €</div>
    </div>
  )

  const fullSizeCart = (
    <div className={`${classes.cart} ${classes.fullSizeCart}`}>
      <h1 className={classes.fullSizeCartName}>Shopping cart</h1>
      {cartItemList.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItemList.map(({ id, qty }) => (
          <CartItem
            key={id}
            variant="fullSize"
            id={id}
            qty={qty}
            onRemove={handleRemoveFromCart}
            onUpdate={updateQty}
          />
        ))
      )}
      <div className={`${classes.total} ${classes.fullSizeTotal}`}>
        Total: {total.toFixed(2)} €
      </div>
      {cartItemList.length !== 0 ? (
        <div className={`${classes.cartBtns} ${classes.fullSizeCartBtns}`}>
          <button>Do you have a coupon or Gift Card?</button>
          <button className={classes.checkoutBtn} onClick={orderProducts}>
            Order products
          </button>
        </div>
      ) : null}
    </div>
  )

  return variant === "drawer" ? drawerCart : fullSizeCart
}
