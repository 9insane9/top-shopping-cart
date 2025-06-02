import App from "./components/App/App"
import Home from "./components/Home/Home"
import Shop from "./components/Shop/Shop"
import Cart from "./components/Cart/Cart"
import OrderSuccess from "./components/OrderSuccess/OrderSuccess"
import ErrorPage from "./components/ErrorPage/ErrorPage"

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart variant="fullSize" />,
      },
      {
        path: "success",
        element: <OrderSuccess />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]

export default routes
