/* eslint-disable */
import { createContext, useContext, useReducer, useEffect } from 'react'
import reducer from './reducer'
import {
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  CLEAR_CART,
  REMOVE_ITEM,
  DISPLAY_ITEMS,
} from './actions'

const API_URL = 'https://www.course-api.com/react-useReducer-cart-project'
const AppContext = createContext()

export function useAppContext() {
  return useContext(AppContext)
}

const defaultState = {
  cartItems: null,
  loading: true,
  totalAmount: 0,
  totalPrice: 0,
}

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    fetchData(API_URL)
  }, [])

  async function fetchData(url) {
    const resp = await fetch(url)
    const cartItems = await resp.json()
    displayItems(cartItems)
  }

  function displayItems(cartItems) {
    dispatch({ type: DISPLAY_ITEMS, payload: { cartItems } })
  }

  function clearCartItems() {
    dispatch({ type: CLEAR_CART })
  }

  function removeItem(id) {
    dispatch({ type: REMOVE_ITEM, payload: { id } })
  }

  function increaseAmount(id) {
    dispatch({ type: INCREASE_AMOUNT, payload: { id } })
  }

  function decreaseAmount(id) {
    dispatch({ type: DECREASE_AMOUNT, payload: { id } })
  }

  const value = {
    ...state,
    clearCartItems,
    removeItem,
    increaseAmount,
    decreaseAmount,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
