import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div
      className="
        rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md
        shadow-md hover:shadow-xl transition-all duration-300
        p-6 flex flex-col justify-between
      "
    >
      
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-slate-300 hover:bg-slate-100"
        >
          <Bookmark className="h-4 w-4 text-slate-600" />
        </Button>
      </div>

      
      <div className="flex items-center gap-3 mt-4">
        <Avatar className="h-12 w-12 border border-slate-200">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div>
          <h2 className="font-semibold text-slate-900">
            {job?.company?.name}
          </h2>
          <p className="text-xs text-slate-500">India</p>
        </div>
      </div>

      
      <div className="mt-4">
        <h1 className="font-bold text-lg text-slate-900">
          {job?.title}
        </h1>
        <p className="text-sm text-slate-600 mt-1 line-clamp-3">
          {job?.description}
        </p>
      </div>

      
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          {job?.position} Positions
        </Badge>
        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
          {job?.jobType}
        </Badge>
        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
          {job?.salary} LPA
        </Badge>
      </div>

      
      <div className="flex gap-3 mt-6">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          View Details
        </Button>
        <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"  onClick={() => navigate(`/college/apply/${job?._id}`)}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default Job;
