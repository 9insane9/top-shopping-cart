import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import routes from "./routes"
import { FilterProvider } from "./components/context/FilterProvider"
import { DrawerProvider } from "./components/context/DrawerProvider"
import { CartProvider } from "./components/context/CartProvider"
import { ProductProvider } from "./components/context/ProductProvider"
import "./index.css"

const router = createBrowserRouter(routes)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FilterProvider>
      <ProductProvider>
        <CartProvider>
          <DrawerProvider>
            <RouterProvider router={router} />
          </DrawerProvider>
        </CartProvider>
      </ProductProvider>
    </FilterProvider>
  </StrictMode>
)
