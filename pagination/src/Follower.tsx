export interface IFollowerProps {
  login: string
  avatar_url: string
  id: string
  html_url: string
}

function Follower({ login, avatar_url, html_url }: IFollowerProps) {
  return (
    <article className="follower">
      <img src={avatar_url} alt={login} />
      <h4>{login}</h4>
      <a href={html_url} target="_blank" rel="noopener noreferrer">
        visit
      </a>
    </article>
  )
}

export default Follower
