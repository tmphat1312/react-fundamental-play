import { useAppContext } from './context'

function SearchImagesForm() {
  const { setSearchTerm } = useAppContext()

  function handleSubmit(event) {
    event.preventDefault()
    const { search } = event.target.elements

    if (!search.value) return
    setSearchTerm(search.value)
    search.value = ''
  }

  return (
    <section className='search'>
      <h2 className='title'>Unplash Images</h2>
      <form className='search-form' onSubmit={handleSubmit}>
        <input
          type='text'
          id='search'
          name='search'
          placeholder='e.g. office'
          className='input'
        />
        <button type='submit' className='submit'>
          Search
        </button>
      </form>
    </section>
  )
}
export default SearchImagesForm
