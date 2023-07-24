import { useRef } from "react"

interface PaginationProps {
  totalPages: number
  currentPage: number
  action: (page: number) => void
}

function Pagination({ totalPages, currentPage, action }: PaginationProps) {
  const pageInputRef = useRef<HTMLInputElement>(null)
  function handlePrevClick() {
    action((currentPage - 1 + totalPages) % totalPages)
  }

  function handleNextClick() {
    action((currentPage + 1) % (totalPages + 1))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pageInputRef.current) {
      action(pageInputRef.current.valueAsNumber)
    }
  }

  return (
    <div className="pagination">
      <button onClick={handlePrevClick} disabled={currentPage == 1}>
        prev
      </button>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="page" className="page">
          <input
            type="number"
            inputMode="numeric"
            id="page"
            ref={pageInputRef}
            min={1}
            max={totalPages}
            defaultValue={currentPage}
          />
          <span>/ {totalPages}</span>
        </label>
        <button type="submit">go</button>
      </form>
      <button onClick={handleNextClick} disabled={currentPage == totalPages}>
        next
      </button>
    </div>
  )
}

export default Pagination
