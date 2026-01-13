import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      toast.error("Failed to create company");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdebd3] to-[#fff1e6]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-orange-200 shadow-lg p-8">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Create Your Company
          </h1>
          <p className="text-slate-700 mt-2">
            Enter your company name. You can update details later.
          </p>

          <div className="mt-6 ">
            <Label className="my-3">Company Name</Label>
            <Input
              type="text"
              placeholder="SkillLift, Microsoft, Google..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex items-center justify-end gap-3 mt-10">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>

            <Button
              onClick={registerNewCompany}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={!companyName}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
