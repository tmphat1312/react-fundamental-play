import { FaTimes } from 'react-icons/fa'
import links from './data'
import { useAppContext } from './context'

function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useAppContext()
  const sidebarClass = isSidebarOpen ? 'sidebar js-open' : 'sidebar'

  return (
    <aside className={sidebarClass}>
      <button className='sidebar-closer' onClick={closeSidebar}>
        <FaTimes />
      </button>
      <div>
        {links.map((link) => (
          <article key={link.pageId} className='link'>
            <h4 className='link-title'>{link.page}</h4>
            <div className='sub-links'>
              {link.links.map((sub) => (
                <a href={sub.url} key={sub.id} className='sub-link'>
                  {sub.icon}
                  {sub.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </aside>
  )
}
export default Sidebar
