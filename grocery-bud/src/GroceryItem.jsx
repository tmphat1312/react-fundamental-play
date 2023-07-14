/* eslint-disable */
import { MdDeleteOutline } from 'react-icons/md'
import useAppContext from './useAppContext'

function GroceryItem({ id, title, completed }) {
  const { removeItem, checkItem } = useAppContext()

  return (
    <article className='grocery-item'>
      <input
        type='checkbox'
        name='completed'
        id={id}
        checked={completed}
        className='checkbox'
        onChange={() => checkItem(id)}
      />

      <label htmlFor={id} className={`item-label ${completed && 'completed'}`}>
        {title}
      </label>

      <button className='remove-item-btn' onClick={() => removeItem(id)}>
        <MdDeleteOutline />
      </button>
    </article>
  )
}
export default GroceryItem
