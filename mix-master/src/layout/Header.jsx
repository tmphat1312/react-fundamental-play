import Navbar from '../components/Navbar'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

function Header() {
  return (
    <StyledHeader className='width-limit full-bleed'>
      <NavLink to='/' className='logo-link'>
        <h1 className='logo'>MixMaster</h1>
      </NavLink>
      <Navbar />
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-block: 2.8rem;

  .logo {
    font-size: 4.4rem;
    letter-spacing: 0.2ch;
    text-shadow: 2px 2px 0 var(--shadow-light-color);
    font-weight: 600;
    color: var(--primary-500);
    text-transform: uppercase;
  }

  @media screen and (width >= 48em) {
    & {
      flex-direction: row;
    }
  }
`

export default Header
