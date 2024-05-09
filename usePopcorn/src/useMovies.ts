import { useState, useEffect } from "react"
import { IMovie } from "./types/MovieTypes"

export function useMovies({
  query,
  callback = () => {},
}: {
  query: string
  callback?: () => void
}) {
  const [movies, setMovies] = useState<IMovie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    callback()

    const abortController = new AbortController()

    async function fetchMovies() {
      try {
        setIsLoading(true)
        setErrorMsg(null)
        const url = new URL("http://www.omdbapi.com")
        url.searchParams.set("apikey", import.meta.env.VITE_OMDB_API_KEY)
        url.searchParams.set("s", query)

        const res = await fetch(url.toString(), {
          signal: abortController.signal,
        })

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies")
        }

        const data = await res.json()

        if (data.Response === "False") {
          throw new Error(data.Error)
        }
        setMovies(data.Search)
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== "AbortError") {
            setErrorMsg(error.message)
          }
        } else {
          setErrorMsg("Something went wrong with fetching movies")
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (query.length < 3) {
      setMovies([])
      setErrorMsg(null)
    } else {
      // handleDeselectMovie()
      fetchMovies()
    }

    return () => {
      abortController.abort()
    }
  }, [query])

  return { movies, isLoading, errorMsg }
}
