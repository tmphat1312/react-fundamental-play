/* eslint-disable */
import { useState } from 'react'
import data from './data'
import Categories from './Categories'

const allCategories = [
  'all',
  ...new Set(data.map((dish) => dish.category)).values(),
]

function Menu() {
  const [dishes, setDishes] = useState(data)
  const [categoryFilters, setCategoryFilters] = useState(allCategories)

  function filterDishes(category = 'all') {
    const filteredDishes =
      category == 'all'
        ? data
        : data.filter((dish) => dish.category == category)
    setDishes(filteredDishes)
  }

  return (
    <section className='menu'>
      <Categories categories={categoryFilters} filterDishes={filterDishes} />
      <ul className='dishes'>
        {dishes.map((dish) => (
          <li key={dish.id} className='dish'>
            <span className='dish-price'>${dish.price}</span>
            <img src={dish.img} alt={dish.title} className='dish-img' />
            <h3 className='dish-title'>{dish.title}</h3>
            <p className='dish-desc'>{dish.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
export default Menu
