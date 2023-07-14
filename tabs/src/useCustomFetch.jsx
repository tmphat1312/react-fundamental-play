/* eslint-disable */
import { useEffect, useState } from 'react'

function useCustomFetch(url) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  async function fetchData() {
    try {
      const resp = await fetch(url)

      if (!resp.ok) {
        setHasError(true)
        setIsLoading(false)
        return
      }

      const fetchedData = await resp.json()
      setData(fetchedData)
      setIsLoading(false)
    } catch (error) {
      setHasError(true)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return [isLoading, hasError, data]
}
export default useCustomFetch
