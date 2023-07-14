import { useEffect } from 'react'
import { useState } from 'react'

const url = 'https://course-api.com/react-tours-project'

function Tours() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchTours()
  }, [])

  async function fetchTours() {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        setLoading(false)
        setError(true)
      }

      const data = await response.json()
      setTours(data)
    } catch (error) {
      setError(true)
    }

    setLoading(false)
  }

  function removeTour(id) {
    const newTours = tours.filter((tour) => tour.id != id)
    setTours(newTours)
  }

  if (loading) {
    return (
      <div className='tours-container'>
        <h2>Our Tours</h2>
        <div className='loading'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='tours-container'>
        <h2>Our Tours</h2>
        <p>Error loading tours!!!</p>
      </div>
    )
  }

  if (tours.length == 0) {
    return (
      <>
        <h2 className='title'>No more remaining</h2>
        <button
          className='btn'
          onClick={() => {
            setLoading(!loading)
            fetchTours()
          }}
        >
          refresh
        </button>
      </>
    )
  }

  return (
    <div className='tours-container'>
      <h2 className='title'>Our Tours</h2>
      <ul className='tours'>
        {tours.map((tour) => (
          <Tour key={tour.id} {...tour} removeTour={removeTour} />
        ))}
      </ul>
    </div>
  )
}

// eslint-disable-next-line
function Tour({ id, name, info, image, price, removeTour }) {
  const [readMore, setReadMore] = useState(false)

  return (
    <li className='single-tour'>
      <span className='tour-price'>${price}</span>
      <img src={image} alt={name} className='img' />
      <div className='tour-info'>
        <h5>{name}</h5>
        <p className={!readMore ? 'line-clamp' : ''}>{info}</p>
        <button className='btn' onClick={() => setReadMore(!readMore)}>
          {!readMore ? 'Read more' : 'Show less'}
        </button>
      </div>
      <button className='delete-btn btn' onClick={() => removeTour(id)}>
        Not interested
      </button>
    </li>
  )
}

export default Tours
