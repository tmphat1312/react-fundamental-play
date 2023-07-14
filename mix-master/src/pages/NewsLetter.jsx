import styled from 'styled-components'
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import axios from 'axios'

const NEWSLETTER_URL = 'https://www.course-api.com/cocktails-newsletter'

export async function action({ request }) {
  const formData = await request.formData()
  // const name = formData.get('name')
  // const lastName = formData.get('lastName')
  // const email = formData.get('email')
  // console.log(name, lastName, email)

  try {
    await axios({
      method: 'post',
      url: NEWSLETTER_URL,
      data: Object.fromEntries(formData),
    })

    return redirect('/')
  } catch (error) {
    console.log(error)
    return error?.response?.data
  }
}

function NewsLetter() {
  const error = useActionData()
  const { state } = useNavigation()

  return (
    <StyledForm method='POST'>
      <h3 className='title'>Our newsletter</h3>
      <div className='form-group'>
        <label htmlFor='name' className='label'>
          name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          className='input'
          defaultValue='phat'
          // required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='lastName' className='label'>
          last name
        </label>
        <input
          type='text'
          name='lastName'
          id='lastName'
          className='input'
          defaultValue='trương'
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='email' className='label'>
          email
        </label>
        <input
          type='text'
          name='email'
          id='email'
          className='input'
          defaultValue='test@test.com'
          required
        />
      </div>

      {error && <p className='error'>{error?.msg}</p>}
      <button
        type='submit'
        className='submit-btn'
        disabled={state == 'loading' || state == 'submitting'}
      >
        {state == 'submitting' ? 'submitting' : 'submit'}
      </button>
    </StyledForm>
  )
}

const StyledForm = styled(Form)`
  background-color: var(--white);
  max-inline-size: 60rem;
  margin-inline: auto;
  padding: 2rem 2.4rem;
  border-radius: 4px;
  box-shadow: var(--shadow-light);

  .title {
    text-align: center;
    margin-block-end: 2rem;
    color: var(--grey-700);
  }

  .label {
    display: block;
    color: var(--grey-600);
    text-transform: capitalize;
    margin-block-end: 0.4rem;
  }

  .input {
    display: block;
    width: 100%;
    margin-block-end: 1.6rem;
    color: var(--grey-800);
  }

  .error {
    background-color: red;
    color: var(--white);
    padding: 0.5em;
  }

  .submit-btn {
    background-color: var(--primary-500);
    color: var(--white);
    display: block;
    inline-size: 100%;
    margin-block-start: 3.2rem;
    padding: 0.5em;
    text-transform: capitalize;

    &:hover {
      background-color: var(--primary-700);
    }
  }
`

export default NewsLetter
