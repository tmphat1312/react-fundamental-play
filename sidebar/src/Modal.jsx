import { FaTimes } from 'react-icons/fa'
import { useAppContext } from './context'

function Modal() {
  const { isModalOpen, closeModal } = useAppContext()

  return (
    <>
      {isModalOpen && (
        <>
          <div className='modal-overlay' onClick={closeModal}></div>
          <article className='modal'>
            <h2>Modal</h2>
            <button className='close-btn' onClick={closeModal}>
              <FaTimes />
            </button>
          </article>
        </>
      )}
    </>
  )
}
export default Modal
