import data from '../data'
import Birthday from './Birthday'
import { useState } from 'react'
import './Birthdays.css'

function Birthdays() {
  const [people, setPeople] = useState(data)

  function handleClearList() {
    setPeople([])
  }

  return (
    <section className='birthdays'>
      <h2 className='birthdays__count'>{people.length} birthdays today</h2>
      <ul className='birthdays__list'>
        {people.map((person) => (
          <Birthday key={person.id} {...person} />
        ))}
      </ul>
      <button className='btn' onClick={handleClearList}>
        Clear list
      </button>
    </section>
  )
}
export default Birthdays
