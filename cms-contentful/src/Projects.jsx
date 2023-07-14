import useContentful from './useContentful'

function Projects() {
  const { isLoading, projects, error } = useContentful()
  let content = null

  if (isLoading) {
    content = <p>Loading...</p>
  } else if (error) {
    content = <p>{error.message}</p>
  } else {
    content = (
      <div className='projects-container'>
        {projects.map((project) => {
          const { id, title, url, image } = project
          return (
            <figure className='project' key={id}>
              <a href={url} target='_blank' rel='noopener noreferrer'>
                <img src={image.src} alt={image.alt} className='img' />
                <h4 className='name'>{title}</h4>
              </a>
            </figure>
          )
        })}
      </div>
    )
  }

  return (
    <section className='projects'>
      <h2 className='title'>Projects</h2>
      {content}
    </section>
  )
}
export default Projects
