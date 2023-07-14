import { FaShoppingCart } from 'react-icons/fa'
import { useAppContext } from './context'

function Navbar() {
  const { totalAmount } = useAppContext()

  return (
    <div className='navbar-container'>
      <nav className='navbar'>
        <h2 className='navbar-title'>useReducer</h2>
        <div className='cart-counter'>
          <FaShoppingCart />
          <span className='cart-amount'>{totalAmount}</span>
        </div>
      </nav>
    </div>
  )
}
export default Navbar
