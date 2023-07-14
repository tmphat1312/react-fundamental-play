import notFoundImg from '../assets/not-found.svg'
import { Link, useRouteError } from 'react-router-dom'
import styled from 'styled-components'

function Error() {
  const error = useRouteError()

  if (error.status == 404) {
    return (
      <StyledError>
        <img src={notFoundImg} alt='404 not found' className='error-img' />
        <h3 className='title'>Oops!</h3>
        <p className='desc'>It looks like this page doesn&apos;t exist</p>
        <p className='desc'>{error.data}</p>
        <Link to='/' className='back-link'>
          back home
        </Link>
      </StyledError>
    )
  }

  return (
    <StyledError>
      <h3 className='title'>Oops!</h3>
      <p className='desc'>It looks like something went wrong</p>
      <Link to='/' className='back-link'>
        back home
      </Link>
    </StyledError>
  )
}

const StyledError = styled.section`
  min-block-size: 80dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;

  @media screen and (width >= 48em) {
    .error-img {
      max-width: 600px;
    }
  }

  .title {
    font-size: 3.2rem;
    font-weight: 500;
    margin-block-start: 3.2rem;
  }

  .desc {
    font-size: 2rem;
    color: var(--grey-600);
  }

  .back-link {
    color: var(--primary-500);
    font-size: 2rem;
    text-transform: capitalize;
    text-decoration: underline;
  }
`
export default Error
