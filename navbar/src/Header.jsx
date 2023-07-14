import Navbar from './Navbar'
import logo from './logo.svg'

function Header() {
  return (
    <header className='header'>
      <img src={logo} alt='logo' className='logo' />
      <Navbar />
    </header>
  )
}
export default Header
