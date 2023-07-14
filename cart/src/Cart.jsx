import CartItem from './CartItem'
import { useAppContext } from './context'
import { USMoneyFormat } from './utils'

function Cart() {
  const { cartItems, clearCartItems, totalPrice, loading } = useAppContext()

  if (loading) {
    return (
      <div className='cart'>
        <header className='cart-header'>
          <h4 className='cart-title'>Your Cart</h4>
        </header>
        <div className='cart-loading'>Loading</div>
      </div>
    )
  }

  if (cartItems.size == 0) {
    return (
      <div className='cart'>
        <header className='cart-header'>
          <h4 className='cart-title'>Your Cart</h4>
        </header>
        <p className='cart-empty'>is empty now</p>
      </div>
    )
  }

  const cartItemsArray = [...cartItems.values()]
  return (
    <div className='cart'>
      <header className='cart-header'>
        <h4 className='cart-title'>Your Cart</h4>
      </header>
      <div className='cart-items'>
        {cartItemsArray.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <hr className='separator' />
      <footer className='cart-footer'>
        <div className='total-price'>
          Total{' '}
          <span className='price'>{USMoneyFormat.format(totalPrice)}</span>
        </div>
        <button className='clear-btn' onClick={clearCartItems}>
          clear cart
        </button>
      </footer>
    </div>
  )
}
export default Cart
