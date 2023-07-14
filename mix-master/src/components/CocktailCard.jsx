/* eslint-disable */
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function CocktailCard({ id, image, name, info, glass }) {
  return (
    <StyledCocktail>
      <img src={image} alt={name} className='img' />
      <section className='card-info'>
        <h4 className='name'>{name}</h4>
        <p className='glass'>{glass}</p>
        <p className='info'>{info}</p>
      </section>
      <Link to={`cocktail/${id}`} className='details-link'>
        details
      </Link>
    </StyledCocktail>
  )
}

const StyledCocktail = styled.article`
  background-color: var(--white);
  box-shadow: var(--shadow-light);
  border-radius: 4px;
  overflow: hidden;

  .card-info {
    padding: 1em;

    & > * {
      margin-block-end: 0.5em;
    }
  }

  .name {
    font-size: 2.4rem;
    font-weight: 500;
    color: var(--grey-700);
  }

  .glass {
    color: var(--grey-600);
  }

  .info {
    color: var(--grey-500);
  }

  .details-link {
    display: block;
    text-align: center;
    background-color: var(--primary-500);
    color: var(--white);
    padding: 0.5em;
    font-size: 2rem;
    text-transform: capitalize;

    &:is(:hover, :focus) {
      background-color: var(--primary-700);
    }
  }
`
export default CocktailCard
