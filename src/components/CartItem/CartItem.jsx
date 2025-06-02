import { useProducts } from "../context/ProductProvider"
import icons from "../../utils/icons"
import classes from "./CartItem.module.css"

export default function CartItem({
  id,
  qty,
  onRemove,
  onUpdate,
  variant = "drawer",
}) {
  const { productCache } = useProducts()
  const product = productCache[id]
  const subTotal = product.price * qty

  const drawerItem = (
    <div className={classes.item}>
      <div className={classes.imgWrapper}>
        <img src={product.imgSrc} alt={product.name} />
        <p className={classes.miniQty}>{qty}</p>
      </div>
      <div className={classes.infoContainer}>
        <h2>{product.name}</h2>
        <h3>{product.price.toFixed(2)} €</h3>
      </div>
      <button
        className={classes.removeBtn}
        onClick={() => {
          onRemove(id)
        }}
      >
        {icons.trash({ className: `${classes.remove}` })}
      </button>
    </div>
  )

  const fullSizeItem = (
    <div className={`${classes.item} ${classes.itemFullSize}`}>
      <div className={`${classes.imgWrapper} ${classes.imgWrapperFullSize}`}>
        <img src={product.imgSrc} alt={product.name} />
      </div>
      <div
        className={`${classes.infoContainer} ${classes.infoContainerFullSize}`}
      >
        <div className={classes.namePriceWrapper}>
          <span className={`${classes.productNameFullSize}`}>
            {product.name}
          </span>
          <span className={`${classes.productPriceFullSize}`}>
            {product.price.toFixed(2)} €
          </span>
        </div>

        <div className={classes.priceQtyControl}>
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
          <p className={classes.subTotal}>{subTotal.toFixed(2)}&nbsp;€</p>
        </div>
      </div>
      <button
        className={`${classes.removeBtn} ${classes.removeBtnFullSize}`}
        onClick={() => {
          onRemove(id)
        }}
      >
        {icons.trash({ className: `${classes.remove}` })}
      </button>
    </div>
  )

  return variant === "drawer" ? drawerItem : fullSizeItem
}
