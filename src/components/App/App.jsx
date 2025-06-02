import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { useDrawer } from "../context/DrawerProvider"
import Drawer from "react-modern-drawer"
import Nav from "../Nav/Nav"
import Cart from "../Cart/Cart"
import Filters from "../Filters/Filters"
import "./App.css"
import "react-modern-drawer/dist/index.css"

function App() {
  const { showDrawer, toggleShowDrawer, drawerContent, setDrawerContent } =
    useDrawer()

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
      <Nav
        onDrawerToggle={toggleShowDrawer}
        setDrawerContent={setDrawerContent}
      />
      <Outlet />
      <Drawer
        open={showDrawer}
        onClose={toggleShowDrawer}
        className="drawer"
        direction="right"
        size={320}
        overlayOpacity="0.7"
        style={{ backgroundColor: "#1e1f26" }}
      >
        {(() => {
          switch (drawerContent) {
            case "search":
              return <Filters drawerVariant />
            case "cart":
              return <Cart variant="drawer" onClose={toggleShowDrawer} />
            case "menu":
              return <p>here goes MENU component</p>
            default:
              return <Cart variant="drawer" onClose={toggleShowDrawer} />
          }
        })()}
      </Drawer>
    </>
  )
}

export default App
