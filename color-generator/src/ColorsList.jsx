/* eslint-disable */
import { useId } from 'react'
import SingleColor from './SingleColor'

function ColorsList({ colors }) {
  const colorId = useId()

  return (
    <section className='colors'>
      {colors.map((color, index) => (
        <SingleColor color={color} key={`${colorId}_${index}`} />
      ))}
    </section>
  )
}
export default ColorsList
