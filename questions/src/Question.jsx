/* eslint-disable */
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

function Question({
  id,
  question,
  answer,
  activeQuestionId,
  toggleOnlyOneQuestion,
}) {
  const isActive = id == activeQuestionId

  return (
    <article className='question'>
      <h5 onClick={() => toggleOnlyOneQuestion(id)}>
        <button className='question-toggler'>
          {question}
          {isActive ? (
            <AiOutlineMinus className='question-toggler-icon' />
          ) : (
            <AiOutlinePlus className='question-toggler-icon' />
          )}
        </button>
      </h5>
      {isActive && <p className='answer'>{answer}</p>}
    </article>
  )
}
export default Question
