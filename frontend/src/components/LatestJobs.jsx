import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job)
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-4 my-14">
      <h1 className="text-2xl md:text-4xl font-bold mb-6">
        <span className="text-[#6A38C2]">Latest & Top </span> Internship Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length <= 0
          ? <span>No Job Available</span>
          : allJobs.slice(0, 6).map(job => (
              <LatestJobCards
                key={job._id}
                job={job}
                onClick={() => navigate(`/description/${job._id}`)}
              />
            ))
        }
      </div>
    </div>
  )
}

export default LatestJobs
