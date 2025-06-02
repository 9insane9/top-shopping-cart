import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useCallback, Children } from "react"
import { useFilters } from "../context/FilterProvider"
import { GENRES } from "../../utils/genres"
import icons from "../../utils/icons"
import "./ShopCarousel.css"

export default function ShopCarousel({ genreName = "", children }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const { setSelectedGenres, resetFilters, setIsQuery } = useFilters()

  const slides = Children.toArray(children)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit()
    }
  }, [emblaApi])

  const handleSeeAll = () => {
    const matched = GENRES.find(
      (g) => g.name.toLowerCase() === genreName.toLowerCase()
    )
    setIsQuery(true)
    resetFilters()
    setSelectedGenres((prev) => ({
      ...prev,
      [matched.slug]: true,
    }))
  }

  return (
    <div className="carouselWrapper">
      <div className="carouselInfo">
        <h1>{genreName}</h1>
        <button onClick={handleSeeAll}>See all</button>
      </div>
      <div className="embla__controls"></div>
      <div className="controlsWrapper">
        <button className="embla__prev" onClick={scrollPrev}>
          {icons.arrowLeft({ className: `arrow arrowLeft` })}
        </button>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((child, index) => (
              <div className="embla__slide" key={index}>
                {child}
              </div>
            ))}
          </div>
        </div>
        <button className="embla__next" onClick={scrollNext}>
          {icons.arrowRight({ className: `arrow arrowRight` })}
        </button>
      </div>
    </div>
  )
}
