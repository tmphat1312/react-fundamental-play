import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAppContext } from './context'

const URL = 'https://api.unsplash.com/search/photos'

function Gallery() {
  const { searchTerm } = useAppContext()

  const { isError, isLoading, data } = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      const { data } = await axios.get(URL, {
        params: {
          query: searchTerm,
          client_id: import.meta.env.VITE_API_KEY,
          per_page: 24,
        },
      })
      return data
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  const { results } = data

  if (results.length < 1) return <div>No results</div>

  return (
    <div className='gallery'>
      {results.map((image) => {
        const { id, urls, alt_description } = image
        return (
          <img
            src={urls?.regular}
            alt={alt_description}
            key={id}
            className='img'
          />
        )
      })}
    </div>
  )
}
export default Gallery
