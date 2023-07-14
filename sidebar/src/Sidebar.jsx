import { AiOutlineDoubleLeft } from 'react-icons/ai'
import { links, socials } from './data'
import logo from './logo.svg'
import { useAppContext } from './context'

function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useAppContext()
  const sidebarClass = isSidebarOpen ? 'sidebar js-open' : 'sidebar'

  return (
    <aside className={sidebarClass}>
      <header className='sidebar-header'>
        <img src={logo} alt='Codding Addict logo' className='logo' />
        <button className='close-btn' onClick={closeSidebar}>
          <AiOutlineDoubleLeft />
        </button>
      </header>
      <nav className='nav'>
        <ul className='nav-links'>
          {links.map((link) => {
            return (
              <li key={link.id}>
                <a href={link.url} className='nav-link'>
                  {link.icon}
                  {link.text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
      <footer className='sidebar-footer'>
        <ul className='social-links'>
          {socials.map((social) => {
            return (
              <li key={social.id}>
                <a
                  href={social.url}
                  className='social-link'
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  {social.icon}
                </a>
              </li>
            )
          })}
        </ul>
      </footer>
    </aside>
  )
}
export default Sidebar
