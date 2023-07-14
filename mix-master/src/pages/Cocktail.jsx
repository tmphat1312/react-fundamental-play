import { useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import Loader from '../components/Loader'

const COCKTAIL_LOOKUP_URL =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php'

// export async function loader({ params }) {
//   const { id } = params

//   const { data } = await axios({
//     method: 'get',
//     url: COCKTAIL_LOOKUP_URL,
//     params: {
//       i: id,
//     },
//   })

//   if (!data.drinks) throw new Error(`cocktail not found`)

//   return { id, data }
// }

function getCocktailDetailsQuery(id) {
  return {
    queryKey: ['cocktail-details', id],
    queryFn: async () => {
      const { data } = await axios({
        method: 'get',
        url: COCKTAIL_LOOKUP_URL,
        params: {
          i: id,
        },
      })

      return data
    },
  }
}

export function loader(queryClient) {
  return async function ({ params }) {
    const { id } = params
    await queryClient.ensureQueryData(getCocktailDetailsQuery(id))
    return { id }
  }
}

function Cocktail() {
  const { id } = useLoaderData()
  const { data, isLoading } = useQuery(getCocktailDetailsQuery(id))

  if (isLoading) {
    return <Loader />
  }

  if (!data.drinks) throw new Error(`cocktail not found`)

  const cocktail = data.drinks[0]

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = cocktail

  const ingredients = []
  Object.keys(cocktail).forEach((key) => {
    if (key.startsWith('strIngredient') && cocktail[key]) {
      ingredients.push(cocktail[key])
    }
  })

  const cocktailObject = {
    name,
    info,
    glass,
    category,
    ingredients: ingredients.join(', '),
    instructions,
  }

  return (
    <StyledCocktail>
      <header className='header'>
        <Link to='/' className='back-link'>
          back home
        </Link>
        <h3 className='title'>{name}</h3>
      </header>
      <main className='drink'>
        <img src={image} alt={name} className='img' />
        <ul className='infos'>
          {Object.keys(cocktailObject).map((key) => (
            <li key={key} className='info'>
              <span className='name'>{key}</span>
              <p className='data'>{cocktailObject[key]}</p>
            </li>
          ))}
        </ul>
      </main>
    </StyledCocktail>
  )
}

const StyledCocktail = styled.section`
  .header {
    text-align: center;
  }

  .back-link {
    font-size: 1.8rem;
    text-transform: capitalize;
    font-weight: 500;
    color: var(--primary-500);

    &:hover {
      text-decoration: underline;
    }
  }

  .title {
    font-weight: 500;
    margin-block: 1.2rem;
    color: var(--primary-700);
  }

  .drink {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 3.6rem;
  }

  .img {
    border-radius: 4px;
    box-shadow: var(--shadow-light);
  }

  .infos {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.2rem;
  }

  .info {
    display: flex;
    align-items: start;
  }

  .name {
    font-weight: 500;
    color: var(--white);
    background-color: var(--primary-500);
    padding: 0.5em;
    display: inline-block;
    text-transform: capitalize;
    margin-inline-end: 1.2rem;
    border-radius: 4px;
  }

  .data {
    max-inline-size: 48ch;
  }
`

export default Cocktail
