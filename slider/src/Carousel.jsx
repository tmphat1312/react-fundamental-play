import { useEffect, useState } from 'react'
import { shortList, list, longList } from './data'
import { AiOutlineRightSquare, AiOutlineLeftSquare } from 'react-icons/ai'
import Slide from './Slide'

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slides] = useState(longList)

  function nextSlide() {
    setCurrentIndex((i) => (i + 1) % slides.length)
  }

  function prevSlide() {
    setCurrentIndex((i) => (i - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const intId = setInterval(nextSlide, 3000)
    return () => {
      clearInterval(intId)
    }
  }, [currentIndex])

  return (
    <section className='slider'>
      {slides.map((item, index) => (
        <Slide
          key={item.id}
          index={index}
          {...item}
          currentIndex={currentIndex}
        />
      ))}
      <button className='prev-slide' onClick={prevSlide}>
        <AiOutlineLeftSquare />
      </button>
      <button className='next-slide' onClick={nextSlide}>
        <AiOutlineRightSquare />
      </button>
    </section>
  )
}
export default Carousel
