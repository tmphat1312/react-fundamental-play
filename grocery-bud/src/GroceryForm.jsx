import { useState, useId, useRef, useEffect } from 'react'
import useAppContext from './useAppContext'

function GroceryForm() {
  const [item, setItem] = useState('')
  const { addItem } = useAppContext()
  const inputRef = useRef(null)
  const htmlId = useId()

  function handleSubmission(e) {
    e.preventDefault()
    if (item == '') return

    addItem(item)
    setItem('')
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === '/') {
        event.preventDefault()
        inputRef.current.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <form onSubmit={handleSubmission} className='grocery-form'>
      <h4 className='title'>Grocery list</h4>
      <div className='field'>
        <label className='label' htmlFor={`${htmlId}_name`}>
          Add a grocery 🌳
        </label>
        <input
          ref={inputRef}
          type='text'
          name='name'
          id={`${htmlId}_name`}
          value={item}
          onChange={({ target }) => setItem(target.value)}
          className='text-input'
          placeholder='e.g. Get some eggs'
        />
      </div>
      <button type='submit' className='submit'>
        Add
      </button>
    </form>
  )
}
export default GroceryForm
