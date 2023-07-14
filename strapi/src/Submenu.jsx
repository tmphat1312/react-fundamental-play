import { useAppContext } from './context'
import { useRef } from 'react'
import links from './data'

function Submenu() {
  const { pageId, setPageId } = useAppContext()
  const currentPage = links.find((link) => link.pageId == pageId)
  const subMenuRef = useRef(null)

  function handleClosingSubmenu(e) {
    const { clientX, clientY } = e
    const { bottom, left, right } = subMenuRef.current.getBoundingClientRect()

    if (clientX < left || clientX > right || clientY > bottom) {
      setPageId(null)
    }
  }

  return (
    <>
      {currentPage && (
        <div
          className='sub-menu'
          onMouseLeave={handleClosingSubmenu}
          ref={subMenuRef}
        >
          <article key={currentPage?.pageId} className='link'>
            <h4 className='link-title'>{currentPage?.page}</h4>
            <div className='sub-links'>
              {currentPage?.links.map((sub) => (
                <a href={sub.url} key={sub.id} className='sub-link'>
                  {sub.icon}
                  {sub.label}
                </a>
              ))}
            </div>
          </article>
        </div>
      )}
    </>
  )
}
export default Submenu
