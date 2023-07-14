function Categories({ categories, filterDishes }) {
  return (
    <div className='filters'>
      {categories.map((filter) => (
        <button
          key={filter}
          className='filter-btn'
          onClick={() => filterDishes(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
export default Categories
