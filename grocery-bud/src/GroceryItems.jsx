import GroceryItem from './GroceryItem'
import useAppContext from './useAppContext'

function GroceryItems() {
  const { items } = useAppContext()
  const itemsArray = [...items.values()].reverse()

  return (
    <div className='grocery-items'>
      {itemsArray.map((item) => (
        <GroceryItem key={item.id} {...item} />
      ))}
    </div>
  )
}
export default GroceryItems
