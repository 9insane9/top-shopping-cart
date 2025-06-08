import classes from "./Home.module.css"
import { useNavigate } from "react-router-dom"
import { useFilters } from "../context/FilterProvider"

export default function Home() {
  const navigate = useNavigate()
  const { resetFilterContext } = useFilters()

  const resetAndNavigate = () => {
    resetFilterContext()
    navigate("/shop")
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.titleText}>
        welcome to the greatest video game store of all time
      </h1>
      <button onClick={resetAndNavigate}>Shop now!</button>
    </div>
  )
}
