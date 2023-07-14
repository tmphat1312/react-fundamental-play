import { useState } from 'react'
import { nanoid } from 'nanoid'
import data from './data'

function App() {
  const [count, setCount] = useState(1)
  const [text, setText] = useState([])

  function generateText(e) {
    e.preventDefault()
    setText(data.slice(0, count))
    setCount(1)
  }

  return (
    <section className='section-center'>
      <h4 className=''>Tired of Lorem ipsum?</h4>
      <form className='lorem-form' onSubmit={generateText}>
        <label htmlFor='number'>Paragraphs: </label>
        <input
          type='number'
          name='number'
          id='number'
          value={count}
          min={1}
          max={8}
          step={1}
          onChange={(e) => setCount(e.target.value)}
        />
        <button type='submit' className='btn'>
          generate
        </button>
      </form>
      <article className='lorem-text'>
        {text.map((item) => (
          <p key={nanoid()}>{item}</p>
        ))}
      </article>
    </section>
  )
}

export default App
