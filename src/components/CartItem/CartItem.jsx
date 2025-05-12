import { useProducts } from "../context/ProductProvider"
import classes from "./CartItem.module.css"

export default function CartItem({
  id,
  qty,
  onRemove,
  onUpdate,
  variant = "drawer",
}) {
  const { products } = useProducts()
  const product = products.find((i) => i.id === id)
  const subTotal = product.price * qty
  const drawerItem = (
    <div className={classes.item}>
      <div className={classes.imgWrapper}>
        <img src={product.imgSrc} alt={product.name} />
        <p className={classes.miniQty}>{qty}</p>
      </div>
      <div className={classes.infoContainer}>
        <h2>{product.name}</h2>
        <h3>{product.price} €</h3>
      </div>
      {/* <input
        type="number"
        value={qty}
        min={1}
        onChange={(e) => onUpdate(id, Number(e.target.value))}
      /> */}
      <button
        className={classes.removeBtn}
        onClick={() => {
          onRemove(id)
        }}
      >
        <img src="/trash.svg" alt="" />
      </button>
    </div>
  )

  const fullSizeItem = (
    <div className={`${classes.item} ${classes.itemFullSize}`}>
      <div className={`${classes.imgWrapper} ${classes.imgWrapperFullSize}`}>
        <img src={product.imgSrc} alt={product.name} />
        {/* <p className={classes.miniQty}>{qty}</p> */}
      </div>
      <div
        className={`${classes.infoContainer} ${classes.infoContainerFullSize}`}
      >
        <span className={`${classes.productNameFullSize}`}>{product.name}</span>
        <span className={`${classes.productPriceFullSize}`}>
          {product.price} €
        </span>
      </div>
      <p className={classes.times}>x</p>
      <div className={classes.customQtyControl}>
        <button onClick={() => onUpdate(id, qty - 1)}>-</button>
        <input
          type="text"
          value={qty}
          min={1}
          onChange={(e) => onUpdate(id, e.target.value)}
        />
        <button onClick={() => onUpdate(id, qty + 1)}>+</button>
      </div>
      <p className={classes.subTotal}>{subTotal} €</p>
      <button
        className={`${classes.removeBtn} ${classes.removeBtnFullSize}`}
        onClick={() => {
          onRemove(id)
        }}
      >
        <img src="/trash.svg" alt="remove from cart" />
      </button>
    </div>
  )

  return variant === "drawer" ? drawerItem : fullSizeItem
}
