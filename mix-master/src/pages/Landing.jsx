import { useLoaderData } from 'react-router-dom'
import axios from 'axios'
import CocktailsList from '../components/CocktailsList'
import SearchForm from '../components/SearchForm'
import { useQuery } from '@tanstack/react-query'

const COCKTAIL_DB_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php'

function getSearchCocktailsQuery(searchTerm) {
  return {
    queryKey: ['search-cocktails', searchTerm ?? 'all'],
    queryFn: async () => {
      const { data } = await axios.get(COCKTAIL_DB_URL, {
        params: {
          s: searchTerm,
        },
      })

      return data.drinks
    },
  }
}

// export async function loader({ request }) {
//   const url = new URL(request.url)

//   const searchTerm = url.searchParams.get('search') ?? ''
//   // const { data } = await axios.get(COCKTAIL_DB_URL, {
//   //   params: {
//   //     s: searchTerm,
//   //   },
//   // })

//   // return { drinks: data.drinks, searchTerm }
//   return { searchTerm }
// }

export function loader(queryClient) {
  return async function ({ request }) {
    const url = new URL(request.url)

    const searchTerm = url.searchParams.get('search') ?? ''
    await queryClient.ensureQueryData(getSearchCocktailsQuery(searchTerm))
    return { searchTerm }
  }
}

function Landing() {
  const { searchTerm } = useLoaderData()
  const { data: drinks, isLoading } = useQuery(
    getSearchCocktailsQuery(searchTerm)
  )

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      {searchTerm && <p>Search results for "{searchTerm}"</p>}
      <CocktailsList
        drinks={drinks ?? []}
        searchTerm={searchTerm}
        isLoading={isLoading}
      />
    </>
  )
}
export default Landing
