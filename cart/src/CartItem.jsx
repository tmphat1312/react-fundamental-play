/* eslint-disable */
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { useAppContext } from './context'
import { USMoneyFormat } from './utils'

function CartItem({ id, img, price, title, amount }) {
  const { removeItem, increaseAmount, decreaseAmount } = useAppContext()

  return (
    <article className='cart-item'>
      <img src={img} alt={title} className='cart-item-photo' />
      <section className='cart-item-info'>
        <h4 className='cart-item-title'>{title}</h4>
        <p className='cart-item-price'>{USMoneyFormat.format(price)}</p>
      </section>
      <div className='cart-item-counter'>
        <button
          onClick={() => increaseAmount(id)}
          className='cart-item-increase'
          title='increase amount'
        >
          <FaAngleUp />
        </button>
        <span className='cart-item-amount'>{amount}</span>
        <button
          onClick={() => decreaseAmount(id)}
          disabled={amount <= 1}
          className='cart-item-decrease'
          title='decrease amount'
        >
          <FaAngleDown />
        </button>
      </div>
      <button className='btn' onClick={() => removeItem(id)}>
        Remove
      </button>
    </article>
  )
}
export default CartItem
