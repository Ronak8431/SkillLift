import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="group cursor-pointer rounded-2xl border border-orange-200 
                 bg-white/70 backdrop-blur-md p-6 shadow-md
                 transition-all duration-300 hover:-translate-y-1 
                 hover:shadow-xl hover:border-orange-300"
    >
      <div className="mb-3">
        <h1 className="text-lg font-semibold text-slate-900 group-hover:text-orange-600 transition">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-slate-500">India</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900 mb-1">
          {job?.title}
        </h2>
        <p className="text-sm text-slate-600 line-clamp-2">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-blue-50 text-blue-700 font-semibold">
          {job?.position} Positions
        </Badge>

        <Badge className="bg-orange-50 text-orange-700 font-semibold">
          {job?.jobType}
        </Badge>

        <Badge className="bg-purple-50 text-purple-700 font-semibold">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
