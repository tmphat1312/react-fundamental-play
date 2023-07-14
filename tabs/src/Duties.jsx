/* eslint-disable */
import { AiOutlineDoubleRight } from 'react-icons/ai'
import { nanoid } from 'nanoid'

function Duties({ duties }) {
  return (
    <ul>
      {duties.map((duty) => (
        <li key={nanoid()} className='job-desc'>
          <AiOutlineDoubleRight className='job-icon' />
          <p>{duty}</p>
        </li>
      ))}
    </ul>
  )
}
export default Duties
