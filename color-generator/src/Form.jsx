/* eslint-disable */
import { useId, useState } from 'react'
import { CgColorPicker, CgKeyboard } from 'react-icons/cg'
import { getContrastTextColor } from './utils'

function Form({ addColor }) {
  const [color, setColor] = useState('#f15025')
  const htmlId = useId()
  const style = { color: color }

  function handleSubmission(e) {
    e.preventDefault()
    addColor(color)
  }

  return (
    <form onSubmit={handleSubmission} className='form' style={style}>
      <h2 className='title'>Color generator</h2>
      <div className='form__field'>
        <label htmlFor={`${htmlId}-gui`} title='Pick a color'>
          <CgColorPicker className='form__icon' />
        </label>
        <input
          className='form__input'
          type='color'
          name='color-gui'
          id={`${htmlId}-gui`}
          onChange={({ target }) => setColor(target.value)}
          value={color}
          style={{
            border: `2px solid ${color}`,
            boxShadow: `2px 2px ${color}`,
          }}
        />
      </div>
      <div className='form__field'>
        <label htmlFor={`${htmlId}-text`}>
          <CgKeyboard className='form__icon' />
        </label>
        <input
          className='form__input text'
          type='text'
          name='color-text'
          id={`${htmlId}-text`}
          onChange={({ target }) => setColor(target.value)}
          value={color}
          placeholder='#f15025'
          style={{
            border: `2px solid ${color}`,
            boxShadow: `2px 2px ${color}`,
          }}
        />
      </div>
      <button
        className='form__submit'
        type='submit'
        style={{ backgroundColor: color, color: getContrastTextColor(color) }}
      >
        get
      </button>
    </form>
  )
}
export default Form
