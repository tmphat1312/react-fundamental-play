import { nanoid } from 'nanoid'
import { ADD_ITEM, REMOVE_ITEM, CHECK_ITEM, UPDATE_TITLE } from './constants'

function appReducer(state, { type, payload }) {
  const newItems = structuredClone(state.items)
  const itemId = nanoid()
  let item = {}

  switch (type) {
    case ADD_ITEM:
      newItems.set(itemId, {
        title: payload.title,
        completed: false,
        id: itemId,
      })
      break

    case REMOVE_ITEM:
      newItems.delete(payload.id)
      break

    case CHECK_ITEM:
      item = newItems.get(payload.id)
      newItems.set(payload.id, { ...item, completed: !item.completed })
      break

    case UPDATE_TITLE:
      item = newItems.get(payload.id)
      newItems.set(payload.id, { ...item, title: payload.title })
      break

    default:
      throw new Error(`No matching ${type} - action type`)
  }

  return {
    ...state,
    items: newItems,
  }
}
export default appReducer
