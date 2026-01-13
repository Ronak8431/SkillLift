import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const DEFAULT_IMAGE =
    "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdebd3] to-[#fff1e6]">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-8 px-6">
        <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-orange-200 shadow-lg p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24 border border-orange-300">
                <AvatarImage
                  src={user?.profile?.profilePhoto || DEFAULT_IMAGE}
                  alt="profile"
                />
              </Avatar>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {user?.fullname}
                </h1>
                <p className="text-slate-600">
                  {user?.profile?.bio || "No bio added"}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Pen className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>

          <div className="mt-6 space-y-3 text-slate-700">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-orange-500" />
              <span>{user?.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Contact className="w-5 h-5 text-orange-500" />
              <span>{user?.phoneNumber}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-900">City:</span>
              <span>{user?.profile?.city || "Not specified"}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-white/70 backdrop-blur-md border border-orange-200 shadow-lg p-6">
          <h1 className="text-xl font-bold text-slate-900 mb-4">
            Applied Jobs
          </h1>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
