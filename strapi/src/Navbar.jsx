import { FaBars } from 'react-icons/fa'
import { useAppContext } from './context'
import NavLinks from './NavLinks'

function Navbar() {
  const { openSidebar } = useAppContext()

  return (
    <nav className='nav'>
      <div className='nav-center'>
        <h3 className='logo'>Strapi</h3>
        <NavLinks />
        <button className='sidebar-toggler' onClick={openSidebar}>
          <FaBars />
        </button>
      </div>
    </nav>
  )
}
export default Navbar
