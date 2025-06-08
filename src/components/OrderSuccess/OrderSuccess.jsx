import { MoonLoader, ClipLoader } from "react-spinners"
import { ConfettiExplosion } from "react-confetti-explosion"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import classes from "./OrderSuccess.module.css"

export default function OrderSuccess() {
  const [isProccesing, setIsProcessing] = useState(true)
  const navigate = useNavigate()

  //just time outs
  useEffect(() => {
    const processingTimeout = setTimeout(() => {
      setIsProcessing(false)
    }, 3000)

    const redirectTimeout = setTimeout(() => {
      navigate("/shop")
    }, 8000)

    return () => {
      clearTimeout(processingTimeout)
      clearTimeout(redirectTimeout)
    }
  }, [navigate])

  return (
    <div className={classes.container}>
      {isProccesing ? (
        <div className={classes.processingContainer}>
          <MoonLoader color="#e0e0e0" />
          <h2>Processing order...</h2>
        </div>
      ) : (
        <div className={classes.successContainer}>
          <ConfettiExplosion
            force={1}
            duration={3000}
            particleCount={250}
            width={1600}
          />
          <h2>Products ordered!</h2>
          <ClipLoader color="#e0e0e0" size={25} />
          <p className={classes.redirecting}>Redirecting to store...</p>
        </div>
      )}
    </div>
  )
}
