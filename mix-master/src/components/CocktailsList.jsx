/* eslint-disable */
import styled from 'styled-components'
import CocktailCard from './CocktailCard'
// import { useOutletContext } from 'react-router-dom'

function CocktailsList({ drinks, searchTerm, isLoading }) {
  if (isLoading) {
    return <p>loading...</p>
  }
  if (drinks.length < 1) {
    return (
      <StyledNotFoundMessage>
        {`No cocktails with "${searchTerm}" found...`}
      </StyledNotFoundMessage>
    )
  }

  const formattedDrinks = drinks.map((drink) => {
    const {
      idDrink: id,
      strDrink: name,
      strAlcoholic: info,
      strDrinkThumb: image,
      strGlass: glass,
    } = drink

    return { id, name, info, image, glass }
  })

  // const value = useOutletContext()
  // console.log(value)
  //? This is a global context with new React_router version
  //? It's probably the Router in App set this context -> It's much less code than the React Context API

  return (
    <StyledCocktails>
      {formattedDrinks.map((drink) => (
        <CocktailCard {...drink} key={drink.id} />
      ))}
    </StyledCocktails>
  )
}

const StyledNotFoundMessage = styled.h4`
  text-align: center;
`

const StyledCocktails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, auto));
  grid-gap: 3.6rem 3.2rem;
  padding: 2rem;

  @media screen and (width >= 48em) {
    & {
      padding: unset;
    }
  }
`
export default CocktailsList
