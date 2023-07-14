/* eslint-disable */
import { useCallback, useEffect, useState } from 'react'
import JobInfo from './JobInfo'
import BtnContainer from './BtnContainer'

const url = 'https://course-api.com/react-tabs-project'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const fetchData = useCallback(async function () {
    const resp = await fetch(url)
    const fetchedData = await resp.json()
    setJobs(fetchedData)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <section className='jobs-center'>
        <div className='loading'></div>
      </section>
    )
  }

  return (
    <section className='jobs-center'>
      <BtnContainer
        jobs={jobs}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <JobInfo {...jobs[currentIndex]} />
    </section>
  )
}
export default App
