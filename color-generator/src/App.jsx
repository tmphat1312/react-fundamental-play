import { useState } from 'react'
import ColorsList from './ColorsList'
import Form from './Form'
import Values from 'values.js'
import { ToastContainer, toast } from 'react-toastify'

function App() {
  const [colors, setColors] = useState(new Values('#f15025').all(10))

  function addColor(color) {
    try {
      const newColors = new Values(color).all(10)
      setColors(newColors)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <main className='app'>
      <Form addColor={addColor} />
      <ColorsList colors={colors} />
      <ToastContainer />
    </main>
  )
}
export default App
