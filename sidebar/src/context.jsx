/* eslint-disable */
import { createContext, useState, useContext } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openSidebar() {
    setIsSidebarOpen(true)
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const value = {
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    isModalOpen,
    openModal,
    closeModal,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
