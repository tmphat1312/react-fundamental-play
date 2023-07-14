import { useRouteError, Link } from 'react-router-dom'

function SinglePageError() {
  const error = useRouteError()

  return (
    <>
      <h2>{error.message}</h2>
      <Link to='/'>back home</Link>
    </>
  )
}
export default SinglePageError
