/* eslint-disable */
import { createContext, useReducer } from 'react'
import appReducer from './appReducer'
import { ADD_ITEM, CHECK_ITEM, REMOVE_ITEM, UPDATE_TITLE } from './constants'
const LOCAL_STORAGE_ITEMS_KEY = 'local_grocery_list'
export const AppContext = createContext()

function getItemsFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) ?? {}
}

function saveItemsToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(Array.from(value.entries())))
}

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    items: new Map(getItemsFromLocalStorage(LOCAL_STORAGE_ITEMS_KEY)),
  })

  saveItemsToLocalStorage(LOCAL_STORAGE_ITEMS_KEY, state.items)

  function addItem(title) {
    dispatch({ type: ADD_ITEM, payload: { title } })
  }

  function checkItem(id) {
    dispatch({ type: CHECK_ITEM, payload: { id } })
  }

  function removeItem(id) {
    dispatch({ type: REMOVE_ITEM, payload: { id } })
  }

  const value = {
    items: state.items,
    addItem,
    checkItem,
    removeItem,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
