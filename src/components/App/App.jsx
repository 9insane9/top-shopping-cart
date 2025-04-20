import "./App.css"
import Nav from "../Nav/Nav"
import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
      <Nav></Nav>
      <Outlet></Outlet>
    </>
  )
}

export default App

//drawer component for mini cart
