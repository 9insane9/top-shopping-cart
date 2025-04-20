import classes from "./ShopItem.module.css"

export default function ShopItem({ name, imgSrc, price }) {
  return (
    <div className={classes.item}>
      <img src={imgSrc} alt="" />
      <h2>{name}</h2>
      <div className="PriceAndBuy">
        <h2>{price}</h2>
        <button>buy</button>
      </div>
    </div>
  )
}
