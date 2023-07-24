import { useState } from "react"

export function usePaginate<T>(data: T[], perPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / perPage)

  // Get the slice of data to display on the current page
  const startIndex = (currentPage - 1) * perPage
  const endIndex = startIndex + perPage
  const currentPageData = data.slice(startIndex, endIndex)

  // Function to handle page changes
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  return { totalPages, currentPageData, handlePageChange, currentPage }
}
