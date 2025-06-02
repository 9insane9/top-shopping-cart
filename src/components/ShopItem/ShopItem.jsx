import { useEffect, useState } from "react"
import { formatDate } from "../../utils/formatDate"
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

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10) // small delay to trigger animation
    return () => clearTimeout(timer)
  }, [])

  function getRatingData(rating, ratingCount) {
    const clampedRating = Math.max(0.01, Math.min(rating, 5.0))
    const percent = Math.round((clampedRating / 5) * 100)

    let title = ""
    let status = ""

    if (percent >= 70) {
      title =
        percent >= 95
          ? "Overwhelmingly Positive"
          : percent >= 80
          ? "Very Positive"
          : "Mostly Positive"
      status = "positive"
    } else if (percent >= 40) {
      title = "Mixed"
      status = "mixed"
    } else {
      title = percent >= 20 ? "Mostly Negative" : "Very Negative"
      status = "negative"
    }

    const string = `${percent}% of the ${ratingCount} reviews for this game are positive`

    function getIcon(icons, baseClassName) {
      const combinedClassName = `${baseClassName} ${classes[status]}`

      switch (status) {
        case "positive":
          return icons.thumbUp({ className: combinedClassName })
        case "mixed":
          return icons.mixed({ className: combinedClassName })
        case "negative":
          return icons.thumbDown({ className: combinedClassName })
        default:
          return null
      }
    }

    return { title, string, status, getIcon }
  }

  const ratingData = getRatingData(rating, ratingCount)

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
              {ratingData.getIcon(icons, classes.ratingIcon)}
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
            {/* <img src="./cartAdd.svg" alt="add to cart" /> */}
            {icons.cartPlus({ className: `${classes.cartPlus}` })}
          </button>
        </div>
      </div>
    </li>
  )

  return listView ? listItem : gridItem
}
