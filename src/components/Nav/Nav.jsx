import { Link } from "react-router-dom"
import classes from "./Nav.module.css"

export default function Nav() {
  return (
    <nav>
      <ul className="links">
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>
          <Link to="shop">Shop</Link>
        </li>
        <button>cart</button>
      </ul>
    </nav>
  )
}
