import { useState } from "react"
import Follower, { IFollowerProps } from "./Follower"
import Pagination from "./Pagination"
import { usePaginate } from "./usePaginate"

function FollowersList({ followers }: { followers: IFollowerProps[] }) {
  const [perPage, setPerPage] = useState(10)
  const { currentPageData, totalPages, handlePageChange, currentPage } =
    usePaginate(followers, perPage)

  return (
    <div className="followers-container">
      <label htmlFor="per-page" className="per-page">
        <input
          type="number"
          name="page"
          min={1}
          id="per-page"
          max={totalPages}
          value={perPage}
          onChange={(event) => setPerPage(event.target.valueAsNumber)}
        />
        followers per page
      </label>
      <div className="followers">
        {currentPageData.map((follower) => (
          <Follower key={follower.id} {...follower} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          action={handlePageChange}
          key={currentPage}
        />
      )}
    </div>
  )
}

export default FollowersList
