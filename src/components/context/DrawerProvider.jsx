import { createContext, useContext, useState } from "react"

const DrawerContext = createContext()

export function DrawerProvider({ children }) {
  const [showDrawer, setShowDrawer] = useState(false)
  const [drawerContent, setDrawerContent] = useState("cart")

  const toggleShowDrawer = () => setShowDrawer((prev) => !prev)
  const closeDrawer = () => setShowDrawer(false)
  const openDrawer = () => setShowDrawer(true)

  return (
    <DrawerContext.Provider
      value={{
        showDrawer,
        toggleShowDrawer,
        closeDrawer,
        openDrawer,
        drawerContent,
        setDrawerContent,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawer() {
  return useContext(DrawerContext)
}
