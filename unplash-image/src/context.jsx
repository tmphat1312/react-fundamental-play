/* eslint-disable */
import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()
const DARK_MODE_KEY = 'prefersDarkMode'

function getPreferredColorSchemeIsDark() {
  const storedValue = localStorage.getItem(DARK_MODE_KEY)
  if (storedValue) {
    return storedValue === 'true'
  }

  if (window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  return false
}

export function AppContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(getPreferredColorSchemeIsDark())
  const [searchTerm, setSearchTerm] = useState('example')

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    }
  }, [])

  function toggleDarkMode() {
    const newIsDarkMode = !isDarkMode
    document.body.classList.toggle('dark-mode', newIsDarkMode)
    setIsDarkMode(newIsDarkMode)
    localStorage.setItem(DARK_MODE_KEY, newIsDarkMode)
  }

  const value = {
    isDarkMode,
    toggleDarkMode,
    searchTerm,
    setSearchTerm,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
