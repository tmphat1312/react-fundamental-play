import { useAppContext } from './context'
import { BsSunFill, BsMoonFill } from 'react-icons/bs'

function ThemeToggler() {
  const { isDarkMode, toggleDarkMode } = useAppContext()

  return (
    <div className='darkMode-toggler-container'>
      <button
        className='darkMode-toggler'
        onClick={toggleDarkMode}
        title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        {isDarkMode ? <BsSunFill /> : <BsMoonFill />}
      </button>
    </div>
  )
}
export default ThemeToggler
