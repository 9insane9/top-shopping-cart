import { useRouteError } from "react-router-dom"
import { Link } from "react-router-dom"
import classes from "./ErrorPage.module.css"

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Blimey!</h1>
      <p>Apologies, an unexpected oopsie has occurred.</p>
      <p>
        <i>{error.status + " - " + error.statusText || error.message}</i>
      </p>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  )
}
