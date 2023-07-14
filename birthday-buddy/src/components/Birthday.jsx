import './Birthday.css'

/* eslint-disable */
function Birthday({ name, age, image }) {
  return (
    <li className='birthday'>
      <img className='birthday__image' src={image} alt={name} />
      <div className='birthday__info'>
        <h4 className='birthday__name'>{name}</h4>
        <p className='birthday__age'>{age} years</p>
      </div>
    </li>
  )
}
export default Birthday
