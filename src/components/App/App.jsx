import { Outlet } from "react-router-dom"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import Nav from "../Nav/Nav"
import Cart from "../Cart/Cart"
import Drawer from "react-modern-drawer"
import "./App.css"
import "react-modern-drawer/dist/index.css"

function App() {
  const [showMiniCart, setShowMiniCart] = useState(false)
  const toggleMiniCart = () => {
    setShowMiniCart((prev) => !prev)
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        theme="dark"
        pauseOnHover={false}
        autoClose={1000}
        style={{ width: "200px" }}
      />
      <Nav onCartToggle={toggleMiniCart} />
      <Outlet />
      <Drawer
        open={showMiniCart}
        onClose={toggleMiniCart}
        className="drawer"
        direction="right"
        size={320}
      >
        <Cart variant={"drawer"} onClose={toggleMiniCart} />
      </Drawer>
    </>
  )
}

export default App
