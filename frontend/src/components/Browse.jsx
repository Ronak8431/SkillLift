import React, { useEffect } from "react"
import Navbar from "./shared/Navbar"
import Job from "./Job"
import { useDispatch, useSelector } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"
import useGetAllJobs from "@/hooks/useGetAllJobs"
import Footer from "./shared/Footer"

const Browse = () => {
  const dispatch = useDispatch()
  const { allJobs } = useSelector(store => store.job)

  useEffect(() => {
    dispatch(setSearchedQuery(""))
  }, [dispatch])

  useGetAllJobs()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdebd3] to-[#fff1e6]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 my-10">
        <h1 className="font-bold text-lg md:text-xl mb-6">
          Search Results ({allJobs.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.map(job => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Browse
