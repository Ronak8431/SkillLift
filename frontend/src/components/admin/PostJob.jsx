import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useGetAllColleges from "@/hooks/useGetAllColleges";

const PostJob = () => {
  useGetAllColleges();
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const { colleges } = useSelector((store) => store.user);

  const [loading, setLoading] = useState(false);
  const [collegeMode, setCollegeMode] = useState("all");

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
    allowedCollege: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const companySelectHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      toast.error("Please select a company");
      return;
    }

    if (collegeMode === "single" && !input.allowedCollege) {
      toast.error("Please select a college");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Job creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdebd3] to-[#fff1e6]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Post a New Job
          </h1>
          <p className="text-slate-700 mt-1">
            Create internship or job opportunities for colleges
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="rounded-2xl bg-white/70 backdrop-blur-md border border-orange-200 shadow-lg p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              ["Title", "title"],
              ["Description", "description"],
              ["Requirements", "requirements"],
              ["Salary", "salary"],
              ["Location", "location"],
              ["Job Type", "jobType"],
              ["Experience Level", "experience"],
            ].map(([label, name]) => (
              <div key={name}>
                <Label>{label}</Label>
                <Input
                  name={name}
                  value={input[name]}
                  onChange={changeEventHandler}
                  className="mt-1"
                />
              </div>
            ))}

            <div>
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>
          </div>

          {companies?.length > 0 && (
            <div className="mt-6 max-w-sm">
              <Label>Company</Label>
              <Select onValueChange={companySelectHandler}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="bg-white">
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company.name.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="mt-8 border-t border-orange-200 pt-6">
            <Label className="font-bold text-slate-800">
              Job Visibility
            </Label>

            <div className="flex gap-6 mt-3">
              {["all", "single"].map((mode) => (
                <label
                  key={mode}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition
                    ${
                      collegeMode === mode
                        ? "bg-orange-100 border-orange-400 text-orange-700"
                        : "border-slate-300 hover:bg-slate-50"
                    }
                  `}
                >
                  <input
                    type="radio"
                    checked={collegeMode === mode}
                    onChange={() => {
                      setCollegeMode(mode);
                      if (mode === "all") {
                        setInput({ ...input, allowedCollege: null });
                      }
                    }}
                  />
                  {mode === "all" ? "All Colleges" : "Select One College"}
                </label>
              ))}
            </div>

            {collegeMode === "single" && (
              <div className="mt-4 max-w-sm">
                <Select
                  onValueChange={(collegeId) =>
                    setInput({ ...input, allowedCollege: collegeId })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select College" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="bg-white">
                      {colleges?.map((college) => (
                        <SelectItem key={college._id} value={college._id}>
                          {college.fullname}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button
            className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white"
            disabled={loading}
          >
            {loading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {loading ? "Posting..." : "Post Job"}
          </Button>

          {companies?.length === 0 && (
            <p className="text-xs text-red-600 font-semibold text-center mt-4">
              * Please register a company first
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
