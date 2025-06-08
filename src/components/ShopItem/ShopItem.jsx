import { useEffect, useState } from "react"
import { formatDate } from "../../utils/formatDate"
import { getRatingData } from "../../utils/getRatingData"
import icons from "../../utils/icons"
import classes from "./ShopItem.module.css"

export default function ShopItem({
  id,
  onAdd,
  name,
  imgSrc,
  price,
  released,
  rating,
  ratingCount,
  listView = false,
}) {
  const [visible, setVisible] = useState(false)

  // small animation delay
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const ratingData = getRatingData(rating, ratingCount, classes)

  const gridItem = (
    <li className={`${classes.item} ${visible ? classes.visible : ""}`}>
      <div className={classes.imgWrapper}>
        <img className={classes.productImg} src={imgSrc} alt="" />
        <h2 className={classes.productName}>{name}</h2>
      </div>
      <div className={classes.buyContainer}>
        <h2 className={classes.productPrice}>{price} €</h2>
        <button className={classes.buyButton} onClick={() => onAdd(id)}>
          <img src="./cartAdd.svg" alt="add to cart" />
        </button>
      </div>
    </li>
  )

  const listItem = (
    <li className={`${classes.listItem} ${visible ? classes.visible : ""}`}>
      <div className={classes.imgWrapperListItem}>
        <img className={classes.productImgListItem} src={imgSrc} alt="" />
      </div>
      <div className={classes.infoContainer}>
        <div className={classes.nameReleaseRating}>
          <h2 className={classes.productNameListItem}>{name}</h2>
          <div className={classes.releaseRating}>
            <p className={classes.release}>{formatDate(released)}</p>
            <div className={classes.tooltip}>
              {ratingData.getIcon(classes.ratingIcon)}
              <div className={classes.tooltipText}>
                <p className={classes.ratingTitle}>{ratingData.title}</p>
                <p className={classes.ratingString}>{ratingData.string}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.buyContainerListItem}>
          <h2 className={classes.productPriceListItem}>{price} €</h2>
          <button
            className={classes.buyButtonListItem}
            onClick={() => onAdd(id)}
          >
            {icons.cartPlus({ className: `${classes.cartPlus}` })}
          </button>
        </div>
      </div>
    </li>
  )

  return listView ? listItem : gridItem
}
