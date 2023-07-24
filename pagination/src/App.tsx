import { IFollowerProps } from "./Follower"
import FollowersList from "./FollowersList"
import LoadingSpinner from "./LoadingSpinner"
import { useFetch } from "./useFetch"

function App() {
  const { data, loading, error } = useFetch(
    "https://api.github.com/users/john-smilga/followers?per_page=90"
  )

  if (loading) {
    return (
      <main className="app">
        <h1 className="title">Github followers - Pagination</h1>
        <LoadingSpinner />
      </main>
    )
  }

  if (error) {
    return (
      <main className="app">
        <h1 className="title">Github followers - Pagination</h1>
        <h2>There was an error, unfortunately I've not handled it yet</h2>
      </main>
    )
  }

  const followers = data as IFollowerProps[]

  return (
    <main className="app">
      <h1 className="title">Github followers - Pagination</h1>
      <FollowersList followers={followers} />
    </main>
  )
}

export default App
