import { createClient } from 'contentful'
import { useState, useEffect } from 'react'

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  environment: 'master',
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
})

export default function useContentful() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const [error, setError] = useState(null)

  async function fetchProjects() {
    try {
      const response = await client.getEntries({
        content_type: 'reactProjects',
      })
      const projects = response.items
      const newProjects = projects.map((project) => {
        const { title, url, image } = project.fields
        const { id } = project.sys
        const imageSrc = image?.fields?.file?.url
        const imageAlt = image?.fields?.description

        return {
          id,
          title,
          url,
          image: {
            src: imageSrc,
            alt: imageAlt,
          },
        }
      })
      setProjects(newProjects)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return { isLoading, projects, error }
}
