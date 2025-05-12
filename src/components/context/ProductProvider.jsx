import { useState, createContext, useContext, useEffect } from "react"
import { fetchProducts } from "../../api/fakeApi"

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
        console.log("Fetched products:", data)
      } catch (err) {
        console.error("Failed to fetch products:", err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])
  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductContext)
}
