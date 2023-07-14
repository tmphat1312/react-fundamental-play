/* eslint-disable */
import { createContext, useState, useContext } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [pageId, setPageId] = useState(null)

  function openSidebar() {
    setIsSidebarOpen(true)
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  const value = { isSidebarOpen, openSidebar, closeSidebar, pageId, setPageId }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
