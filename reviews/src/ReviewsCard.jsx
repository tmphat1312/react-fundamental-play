import { useState } from 'react'
import reviews from './data'
import {
  BsCaretRight,
  BsCaretLeft,
  BsFillChatRightQuoteFill,
} from 'react-icons/bs'

function ReviewsCard() {
  const [index, setIndex] = useState(0)
  const { name, image, text, job } = reviews.at(index)
  const { length } = reviews

  function nextReview() {
    setIndex((i) => i + 1)
  }

  function prevReview() {
    setIndex((i) => i - 1)
  }

  function randomReview() {
    let randomIndex = Math.floor(Math.random() * length)

    if (randomIndex == index) {
      randomIndex = (randomIndex + 1) % length
    }

    setIndex(randomIndex)
  }

  return (
    <ul className='review-card'>
      <article className='review'>
        <figure className='review-image-box'>
          <img src={image} alt={name} className='review-image' />
          <BsFillChatRightQuoteFill className='review-quote-fill' />
        </figure>

        <h4 className='review-name'>{name}</h4>
        <p className='review-job'>{job}</p>
        <q className='review-text'>{text}</q>

        <div>
          <div className='review-controls'>
            <button
              className='no-text-btn'
              title='previous card'
              onClick={prevReview}
              disabled={index == 0}
            >
              <BsCaretLeft />
            </button>
            <button
              className='no-text-btn'
              title='next card'
              onClick={nextReview}
              disabled={index == length - 1}
            >
              <BsCaretRight />
            </button>
          </div>
          <button className='btn' title='random card' onClick={randomReview}>
            Surprise me
          </button>
        </div>
      </article>
    </ul>
  )
}
export default ReviewsCard
