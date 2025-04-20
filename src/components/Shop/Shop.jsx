import ShopItem from "../ShopItem/ShopItem"
import fakeShopItems from "../../fakeData"
import classes from "./Shop.module.css"

export default function Shop() {
  return (
    <ul>
      {fakeShopItems.map((item) => (
        <li key={item.id}>
          <ShopItem {...item} />
        </li>
      ))}
    </ul>
  )
}
