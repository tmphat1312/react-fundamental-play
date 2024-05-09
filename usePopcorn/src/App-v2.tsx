import { Fragment, useState, useEffect } from "react"
import StarRating from "./StarRating"

interface IMovie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

interface IDetailedMovie extends IMovie {
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Ratings: {
    Source: string
    Value: string
  }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

interface IWatchedMovie extends IMovie {
  runtime: number
  imdbRating: number
  userRating: number
}

function average(arr: number[]): number {
  return arr.reduce((acc, cur) => acc + cur / arr.length, 0)
}

function Search({
  query,
  setQuery,
}: {
  query: string
  setQuery: (query: string) => void
}) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function NumResults({ numResults }: { numResults: number }) {
  return (
    <p className="num-results">
      Found <strong>{numResults}</strong> results
    </p>
  )
}

function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  )
}

function MovieImage({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} width={40} height={60} />
}

function Movie({
  movie,
  onClick: handleClick,
}: {
  movie: IMovie
  onClick: (id: string) => void
}) {
  return (
    <li onClick={() => handleClick(movie.imdbID)}>
      <MovieImage src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

function SelectedMovie({
  selectedId,
  isWatched,
  onCloseMovie: handleCloseMovie,
  onAddWatched,
}: {
  selectedId: string
  isWatched: boolean
  onCloseMovie: () => void
  onAddWatched: (movie: IWatchedMovie) => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [movie, setMovie] = useState<IDetailedMovie>()
  const [userRating, setUserRating] = useState(0)

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true)
        setErrorMsg(null)
        const url = new URL("http://www.omdbapi.com")
        url.searchParams.set("apikey", import.meta.env.VITE_OMDB_API_KEY)
        url.searchParams.set("i", selectedId)

        const res = await fetch(url.toString())

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies")
        }

        const data = await res.json()

        if (data.Response === "False") {
          throw new Error(data.Error)
        }
        setMovie(data)
      } catch (error) {
        if (error instanceof Error) {
          setErrorMsg(error.message)
        } else {
          setErrorMsg("Something went wrong with fetching movie details")
        }
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (selectedId) {
      fetchMovieDetails()
    }
  }, [selectedId])

  useEffect(() => {
    document.title = `Movie | ${movie?.Title || "usePopcorn"}`

    return () => {
      document.title = "usePopcorn"
    }
  }, [movie])

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.code == "Escape") {
        handleCloseMovie()
      }
    }

    document.addEventListener("keydown", handleEsc)

    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [handleCloseMovie])

  function handleAddWatched() {
    if (!movie) return

    const newWatched: IWatchedMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Poster: movie.Poster,
      runtime: parseInt(movie.Runtime.split(" ")[0], 10),
      imdbRating: parseFloat(movie.imdbRating),
      userRating: userRating,
      Year: movie.Year,
    }

    onAddWatched(newWatched)
    handleCloseMovie()
  }

  return (
    <div className="details">
      {isLoading && <Loader />}
      {errorMsg && <ErrorMessage msg={errorMsg} />}
      {!isLoading && !errorMsg && movie && (
        <Fragment>
          <header>
            <button
              className="btn-back"
              onClick={handleCloseMovie}
              title="back"
            >
              <span role="presentation">&larr;</span>
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title} movie`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span role="presentation">⭐</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <Fragment>
                  <StarRating maxRating={10} size={24} onRate={setUserRating} />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      + Add to the list
                    </button>
                  )}
                </Fragment>
              ) : (
                <p>You rated this movie! 👏</p>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </Fragment>
      )}
    </div>
  )
}

function MovieList({
  movies,
  onMovieClick,
}: {
  movies: IMovie[]
  onMovieClick: (id: string) => void
}) {
  return (
    <ul className="list list-movies">
      {movies.map((m) => (
        <Movie movie={m} key={m.imdbID} onClick={onMovieClick} />
      ))}
    </ul>
  )
}

function Box({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((o) => !o)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  )
}

function WatchedSummary({ watched }: { watched: IWatchedMovie[] }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating))
  const avgUserRating = average(watched.map((movie) => movie.userRating))
  const avgRuntime = average(watched.map((movie) => movie.runtime))
  const numMovies = watched.length

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{numMovies} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  )
}

function WatchedMovie({
  movie,
  onDeleteWatched: handleDeleteWatched,
}: {
  movie: IWatchedMovie
  onDeleteWatched: (id: string) => void
}) {
  return (
    <li key={movie.imdbID}>
      <MovieImage src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => handleDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  )
}

function WatchedList({
  watched,
  onDeleteWatched,
}: {
  watched: IWatchedMovie[]
  onDeleteWatched: (id: string) => void
}) {
  return (
    <ul className="list">
      {watched.map((m) => (
        <WatchedMovie
          movie={m}
          key={m.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  )
}

function Main({ children }: { children: React.ReactNode }) {
  return <main className="main">{children}</main>
}

function Loader() {
  return <div className="loader">Loading...</div>
}

function ErrorMessage({ msg }: { msg: string }) {
  return (
    <p className="error">
      <span>⚠️</span>
      <span>{msg}</span>
    </p>
  )
}

export default function App() {
  const [movies, setMovies] = useState<IMovie[]>([])
  const [watched, setWatched] = useState<IWatchedMovie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [watchedIdSet, setWatchedIdSet] = useState(new Set<string>())

  useEffect(() => {
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
      handleDeselectMovie()
      fetchMovies()
    }

    return () => {
      abortController.abort()
    }
  }, [query])

  function handleSelectMovie(id: string) {
    if (id === selectedId) {
      setSelectedId(null)
    } else {
      setSelectedId(id)
    }
  }

  function handleDeselectMovie() {
    setSelectedId(null)
  }

  function handleAddWatched(watchedMovie: IWatchedMovie) {
    if (!watchedIdSet.has(watchedMovie.imdbID)) {
      setWatched((watched) => [...watched, watchedMovie])
      setWatchedIdSet((watchedIdSet) => watchedIdSet.add(watchedMovie.imdbID))
    }
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
    setWatchedIdSet((watchedIdSet) => {
      const newWatchedIdSet = new Set(watchedIdSet)
      newWatchedIdSet.delete(id)
      return newWatchedIdSet
    })
  }

  return (
    <Fragment>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults numResults={movies.length} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {errorMsg && <ErrorMessage msg={errorMsg} />}
          {!isLoading && !errorMsg && (
            <MovieList movies={movies} onMovieClick={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              isWatched={watchedIdSet.has(selectedId)}
              onCloseMovie={handleDeselectMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <Fragment>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </Fragment>
          )}
        </Box>
      </Main>
    </Fragment>
  )
}
