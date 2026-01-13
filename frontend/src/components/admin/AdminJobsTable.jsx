import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Eye, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(
    (store) => store.job
  );
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  const deleteJobHandler = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `${JOB_API_END_POINT}/delete/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Job deleted successfully");

    
        setFilterJobs((prev) => prev.filter((job) => job._id !== jobId));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div
      className="
        rounded-2xl border border-orange-200 shadow-xl
        bg-gradient-to-br from-[#fff7ed] via-[#fdebd3] to-[#fff1e6]
        p-6
      "
    >
      <Table>
        <TableCaption className="text-slate-700 font-medium mt-4">
          A list of your recently posted jobs
        </TableCaption>

        <TableHeader className="bg-white/70 backdrop-blur sticky top-0 z-10">
          <TableRow>
            <TableHead className="font-semibold text-slate-800">
              Company
            </TableHead>
            <TableHead className="font-semibold text-slate-800">
              Role
            </TableHead>
            <TableHead className="font-semibold text-slate-800">
              Posted On
            </TableHead>
            <TableHead className="text-center font-semibold text-slate-800">
              Applicants
            </TableHead>
            <TableHead className="text-center font-semibold text-slate-800">
              Delete
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow
              key={job._id}
              className="hover:bg-white/60 transition"
            >
              <TableCell className="font-medium text-slate-900">
                {job?.company?.name}
              </TableCell>

              <TableCell className="text-slate-700">
                {job?.title}
              </TableCell>

              <TableCell className="text-slate-600">
                {job?.createdAt.split("T")[0]}
              </TableCell>

            
              <TableCell className="text-center">
                <button
                  onClick={() =>
                    navigate(`/admin/jobs/${job._id}/applicants`)
                  }
                  className="
                    inline-flex items-center justify-center
                    w-9 h-9 rounded-full
                    bg-indigo-100 text-indigo-700
                    hover:bg-indigo-200 transition
                  "
                >
                  <Eye className="w-4 h-4" />
                </button>
              </TableCell>

            
              <TableCell className="text-center">
                <button
                  onClick={() => deleteJobHandler(job._id)}
                  className="
                    inline-flex items-center justify-center
                    w-9 h-9 rounded-full
                    bg-red-100 text-red-700
                    hover:bg-red-200 transition
                  "
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
