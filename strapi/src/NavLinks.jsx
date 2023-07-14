import { useAppContext } from './context'
import links from './data'

function NavLinks() {
  const { setPageId } = useAppContext()

  function handleClosingSubmenu({ target }) {
    if (!target.classList.contains('nav-link')) {
      setPageId(null)
    }
  }

  return (
    <nav className='nav-links' onMouseMove={handleClosingSubmenu}>
      {links.map((link) => (
        <button
          className='nav-link'
          key={link.pageId}
          onMouseOver={() => setPageId(link.pageId)}
        >
          {link.page}
        </button>
      ))}
    </nav>
  )
}
export default NavLinks
