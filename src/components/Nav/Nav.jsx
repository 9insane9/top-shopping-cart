import { Link } from "react-router-dom"
import classes from "./Nav.module.css"

export default function Nav({ onCartToggle }) {
  return (
    <nav>
      <ul className={classes.links}>
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>
          <Link to="shop">Shop</Link>
        </li>
      </ul>
      <button className={classes.cartBtn} onClick={onCartToggle}>
        <img src="/cart.svg" alt="Cart" />
      </button>
    </nav>
  )
}
