import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { Plus } from "lucide-react";
import Footer from "../shared/Footer";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdebd3] to-[#fff1e6]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Manage Jobs
          </h1>
          <p className="text-slate-700 mt-1">
            Create, search, and manage all your posted opportunities
          </p>
        </div>

        <div className="sticky top-20 z-10 mb-6 rounded-2xl bg-white/70 backdrop-blur-md border border-orange-200 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Input
            className="w-full sm:max-w-sm focus-visible:ring-orange-400"
            placeholder="Search by company or role"
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Job
          </Button>
        </div>

        <AdminJobsTable />
      </div>
      <Footer/>
    </div>
  );
};

export default AdminJobs;
