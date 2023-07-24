import { useState, useEffect } from "react"

export interface IApiResponse {
  status: number
  statusText: string
  error: boolean
  loading: boolean
  data: unknown
}

export function useFetch(url: string): IApiResponse {
  const [status, setStatus] = useState<number>(0)
  const [statusText, setStatusText] = useState<string>("")
  const [data, setData] = useState<unknown>()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  async function getAPIData() {
    try {
      setLoading(true)

      const apiResponse = await fetch(url)

      if (!apiResponse.ok) {
        throw new Error(apiResponse.statusText)
      }
      const json = await apiResponse.json()

      setStatus(apiResponse.status)
      setStatusText(apiResponse.statusText)
      setData(json)
    } catch (error) {
      console.error("Error", error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAPIData()
  }, [])

  return { status, statusText, data, error, loading }
}
