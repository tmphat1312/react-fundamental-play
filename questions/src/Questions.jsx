/* eslint-disable*/
import { useState } from 'react'
import Question from './Question'
import data from './data'

function Questions() {
  const [questions, setQuestions] = useState(data)
  const [currentQuestionId, setCurrentQuestionId] = useState(null)

  function toggleOnlyOneQuestion(id) {
    const newQuestionId = id === currentQuestionId ? null : id
    setCurrentQuestionId(newQuestionId)
  }

  return (
    <section className='questions'>
      <h2 className='questions-heading'>Frequently asked questions</h2>
      {questions.map((question) => (
        <Question
          key={question.id}
          {...question}
          activeQuestionId={currentQuestionId}
          toggleOnlyOneQuestion={toggleOnlyOneQuestion}
        />
      ))}
    </section>
  )
}
export default Questions
