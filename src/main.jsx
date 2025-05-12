import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import routes from "./routes"
import { CartProvider } from "./components/context/CartProvider"
import { ProductProvider } from "./components/context/ProductProvider"
import "./index.css"

const router = createBrowserRouter(routes)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ProductProvider>
  </StrictMode>
)
