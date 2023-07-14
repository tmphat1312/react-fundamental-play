function BtnContainer({ jobs, setCurrentIndex, currentIndex }) {
  return (
    <div className='btn-container'>
      {jobs.map((job, index) => (
        <button
          className={`job-btn ${currentIndex == index && 'active-btn'}`}
          key={job.id}
          onClick={() => setCurrentIndex(index)}
        >
          {job.company}
        </button>
      ))}
    </div>
  )
}
export default BtnContainer
