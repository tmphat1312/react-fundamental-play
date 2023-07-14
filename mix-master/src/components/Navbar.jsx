import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

function Navbar() {
  return (
    <StyledNav>
      <ul className='nav-links'>
        <li>
          <NavLink className='nav-link' to='/'>
            home
          </NavLink>
        </li>
        <li>
          <NavLink className='nav-link' to='/about'>
            about
          </NavLink>
        </li>
        <li>
          <NavLink className='nav-link' to='/newsletter'>
            newsletter
          </NavLink>
        </li>
      </ul>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  width: 100%;
  text-align: center;

  .nav-links {
    display: flex;
    flex-direction: column;
  }

  .nav-link {
    display: block;
    text-transform: capitalize;
    font-weight: 500;
    font-size: 2.4rem;
    padding: 0.5em;
    transition-duration: 100ms;
    transition-property: scale, color;

    &:is(.active, :hover) {
      color: var(--primary-500);
      scale: 1.05;
    }

    &:hover {
      background-color: var(--grey-100);
    }
  }

  @media screen and (width >= 48em) {
    width: auto;

    .nav-links {
      flex-direction: row;
    }
  }
`

export default Navbar
