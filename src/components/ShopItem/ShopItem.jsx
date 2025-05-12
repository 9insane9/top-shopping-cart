import classes from "./ShopItem.module.css"

export default function ShopItem({ id, onAdd, name, imgSrc, price, qty }) {
  return (
    <li className={classes.item}>
      {/* <div className={classes.itemWrapper}> */}
      <img className={classes.productImg} src={imgSrc} alt="" />
      <h2 className={classes.productName}>{name}</h2>

      <div className={classes.buyContainer}>
        {qty ? (
          <>
            <h2 className={classes.productPrice}>{price} €</h2>
            <button className={classes.buyButton} onClick={() => onAdd(id)}>
              <img src="./cartAdd.svg" alt="add to cart" />
            </button>
          </>
        ) : (
          <span>OUT OF STOCK</span>
        )}
      </div>
      {/* </div> */}
    </li>
  )
}
