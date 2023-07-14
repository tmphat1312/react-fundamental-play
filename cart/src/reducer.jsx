import {
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  CLEAR_CART,
  REMOVE_ITEM,
  DISPLAY_ITEMS,
} from './actions'
import { calculateTotalAmount, calculateTotalPrice } from './utils'

// export default function reducer(state, { type, payload }) {
//   let newCartItems = []

//   function getNewState(newCartItems) {
//     return {
//       ...state,
//       cartItems: newCartItems,
//       totalAmount: calculateTotalAmount(newCartItems),
//       totalPrice: calculateTotalPrice(newCartItems),
//     }
//   }

//   switch (type) {
//     //? clear all items in cart
//     case CLEAR_CART:
//       return getNewState(newCartItems)

//     //? remove one item in cart with a specified id
//     case REMOVE_ITEM:
//       newCartItems = state.cartItems.filter((item) => item?.id != payload?.id)

//       return getNewState(newCartItems)

//     //? increase amount of an item one at a time
//     case INCREASE_AMOUNT:
//       newCartItems = state.cartItems.map((item) => {
//         if (item?.id == payload?.id) {
//           return { ...item, amount: item.amount + 1 }
//         }

//         return item
//       })

//       return getNewState(newCartItems)

//     //? decrease amount of an item one at a time
//     case DECREASE_AMOUNT:
//       newCartItems = state.cartItems.map((item) => {
//         if (item?.id == payload?.id) {
//           return { ...item, amount: Math.max(1, item.amount - 1) }
//         }

//         return item
//       })

//       return getNewState(newCartItems)

//     default:
//       throw new Error(`No matching ${type} - action type`)
//   }

// }

export default function reducer(state, { type, payload }) {
  // let newCartItemsWrong = state.cartItems
  //? updating existing map makes the reducer hook impure -> bug
  // let newCartItems = new Map(state.cartItems)
  //? but new Map just create a shallow copy of the old map
  // let newCartItems = state.cartItems
  //! Let's use new JS API called structuredClone -> deep copy any Object
  let newCartItems = structuredClone(state.cartItems)
  let loading = state.loading

  function updateAmount(id, calculateFnc) {
    const item = newCartItems.get(id)
    item.amount = calculateFnc(item.amount) // will have reference issue when newCartItems is just a shallow copy of cartItems
    // the below and above work the same since we use structuredClone in this case
    // newCartItems.set(id, { ...item, amount: calculateFnc(item.amount) })
  }

  switch (type) {
    case DISPLAY_ITEMS:
      loading = false
      newCartItems = new Map(payload.cartItems.map((item) => [item.id, item]))
      break

    case CLEAR_CART:
      newCartItems.clear()
      break

    case REMOVE_ITEM:
      newCartItems.delete(payload?.id)
      break

    case INCREASE_AMOUNT:
      updateAmount(payload?.id, (amount) => amount + 1)
      break

    case DECREASE_AMOUNT:
      updateAmount(payload?.id, (amount) => Math.max(1, amount - 1))
      break

    default:
      throw new Error(`No matching ${type} - action type`)
  }

  return {
    ...state,
    cartItems: newCartItems,
    loading: loading,
    totalAmount: calculateTotalAmount(newCartItems),
    totalPrice: calculateTotalPrice(newCartItems),
  }
}
