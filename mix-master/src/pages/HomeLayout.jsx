import { Outlet, useNavigation } from 'react-router-dom'
import Header from '../layout/Header'
import Loader from '../components/Loader'

function HomeLayout() {
  const { state } = useNavigation()
  const value = 'test react router dom global context'

  return (
    <>
      <Header />
      <section className='width-limit page'>
        {state == 'loading' ? <Loader /> : <Outlet context={value} />}
      </section>
    </>
  )
}
export default HomeLayout
