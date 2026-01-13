import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Footer from './shared/Footer'

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs)

  useEffect(() => {
    if (!searchedQuery || searchedQuery === "") {
      setFilterJobs(allJobs)
      return
    }

    if (typeof searchedQuery === "string") {
      const query = searchedQuery.toLowerCase()
      const filtered = allJobs.filter(job => {
        const title = String(job.title || "").toLowerCase()
        const description = String(job.description || "").toLowerCase()
        const location = String(job.location || "").toLowerCase()
        const company = String(job.jobType || "").toLowerCase()
        const field = String(job.field || "").toLowerCase()
        return (
          title.includes(query) ||
          description.includes(query) ||
          location.includes(query) ||
          company.includes(query) ||
          field.includes(query)
        )
      })
      setFilterJobs(filtered)
      return
    }

    if (typeof searchedQuery === "object" && searchedQuery !== null) {
      const { min, max } = searchedQuery
      const filtered = allJobs.filter(job => {
        if (!job.salary) return false
        return job.salary >= min && job.salary <= max
      })
      setFilterJobs(filtered)
    }
  }, [allJobs, searchedQuery])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdebd3] to-[#fff1e6]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4">
            <FilterCard />
          </div>

          {filterJobs.length <= 0 ? (
            <span className="text-center w-full">Job not found</span>
          ) : (
            <div className="flex-1 lg:h-[85vh] overflow-y-auto pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs.map(job => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Jobs
