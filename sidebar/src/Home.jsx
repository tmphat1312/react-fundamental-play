import { useAppContext } from './context'
import { FaBars } from 'react-icons/fa'

function Home() {
  const { openModal, openSidebar } = useAppContext()

  return (
    <main className='home'>
      <button className='btn sidebar-toggler' onClick={openSidebar}>
        <FaBars />
      </button>
      <button className='btn modal-toggler' onClick={openModal}>
        show modal
      </button>
    </main>
  )
}
export default Home
