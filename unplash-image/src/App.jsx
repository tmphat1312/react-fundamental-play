import Gallery from './Gallery'
import SearchImagesForm from './SearchImagesForm'
import ThemeToggler from './ThemeToggler'

function App() {
  return (
    <main className='app'>
      <ThemeToggler />
      <SearchImagesForm />
      <Gallery />
    </main>
  )
}
export default App
