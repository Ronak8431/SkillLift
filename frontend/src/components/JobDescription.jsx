import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdebd3] to-[#fff1e6]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-orange-200 shadow-lg p-8">
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">
                {singleJob?.title}
              </h1>

              <div className="flex flex-wrap gap-3 mt-4">
                <Badge className="bg-blue-50 text-blue-700 font-semibold">
                  {singleJob?.position} Positions
                </Badge>
                <Badge className="bg-orange-50 text-orange-700 font-semibold">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 font-semibold">
                  {singleJob?.salary} LPA
                </Badge>
              </div>
            </div>

            {user?.role === "college" && (
              <Button
                onClick={() => navigate(`/college/apply/${jobId}`)}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6"
              >
                Apply (Upload Students)
              </Button>
            )}
          </div>

          <div className="mt-10 border-t border-orange-200 pt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Job Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
              <p><span className="font-semibold">Role:</span> {singleJob?.title}</p>
              <p><span className="font-semibold">Location:</span> {singleJob?.location}</p>
              <p><span className="font-semibold">Experience:</span> {singleJob?.experienceLevel} yrs</p>
              <p><span className="font-semibold">Salary:</span> {singleJob?.salary} LPA</p>
              <p>
                <span className="font-semibold">Colleges Applied:</span>{" "}
                {singleJob?.applications?.length}
              </p>
              <p>
                <span className="font-semibold">Posted On:</span>{" "}
                {singleJob?.createdAt?.split("T")[0]}
              </p>
            </div>

            <div className="mt-6">
              <p className="font-semibold text-slate-900 mb-1">
                Description
              </p>
              <p className="text-slate-700 leading-relaxed">
                {singleJob?.description}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            className="mt-8"
            onClick={() => navigate("/jobs")}
          >
            Back to Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
