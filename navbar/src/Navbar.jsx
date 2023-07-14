import { links, social } from './data'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'

function Navbar() {
  const [showLinks, setShowLinks] = useState(false)

  return (
    <nav className='nav'>
      <div
        className={
          showLinks ? 'nav-links-container js-open' : 'nav-links-container'
        }
      >
        <ul className='nav-links'>
          {links.map((link) => {
            return (
              <li key={link.id} className='nav-link item'>
                <a href={link.url}>{link.text}</a>
              </li>
            )
          })}
        </ul>
      </div>
      <ul className='social-links list'>
        {social.map((socialIcon) => {
          return (
            <li key={socialIcon.id} className='social-link item'>
              <a
                href={socialIcon.url}
                target='_blank'
                rel='noreferrer noopener'
              >
                {socialIcon.icon}
              </a>
            </li>
          )
        })}
      </ul>
      <button
        className='btn nav-links-toggler'
        onClick={() => setShowLinks(!showLinks)}
      >
        <FaBars />
      </button>
    </nav>
  )
}
export default Navbar
