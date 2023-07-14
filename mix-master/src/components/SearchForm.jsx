/* eslint-disable */
import { Form, useNavigation } from 'react-router-dom'
import styled from 'styled-components'

function SearchForm({ searchTerm }) {
  const { state } = useNavigation()

  return (
    <StyledForm>
      <input
        type='search'
        name='search'
        className='input'
        defaultValue={searchTerm}
      />
      <button type='submit' className='search-btn'>
        {state == 'submitting' ? 'searching...' : 'search'}
      </button>
    </StyledForm>
  )
}

const StyledForm = styled(Form)`
  max-inline-size: 60rem;
  margin-inline: auto;
  background-color: var(--white);
  padding: 4rem 3.2rem;
  display: flex;
  margin-block-end: 3.2rem;
  border-radius: 4px;
  box-shadow: var(--shadow-light);

  .input {
    flex: 1;
    padding-inline: 1.2rem;
  }

  .search-btn {
    flex: 0;
    background-color: var(--primary-500);
    color: var(--white);
    padding-inline: 0.5em;

    &:hover {
      background-color: var(--primary-600);
    }
  }
`
export default SearchForm
