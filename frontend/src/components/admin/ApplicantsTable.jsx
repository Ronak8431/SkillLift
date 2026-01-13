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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = ["accepted", "rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(applicants);
  }, [applicants]);

  const statusHandler = async (applicationId, studentId, status) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/${applicationId}/student/${studentId}/status`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Status updated");

        setData((prev) => {
          const updatedApplications = prev.applications.map((app) => {
            if (app._id !== applicationId) return app;

            return {
              ...app,
              students: app.students.map((stu) =>
                stu._id === studentId ? { ...stu, status } : stu
              ),
            };
          });

          return { ...prev, applications: updatedApplications };
        });
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (!data || !data.applications?.length) {
    return (
      <div className="text-center py-16 text-slate-600">
        No applicants found
      </div>
    );
  }
    const getResumeUrl = (url = "") => {
    return url.includes("/fl_inline")
      ? url.replace("/fl_inline", "")
      : url;
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-md shadow-lg overflow-x-auto">
      <Table>
        <TableCaption className="py-4 text-slate-600">
          Applicants list
        </TableCaption>

        <TableHeader className="bg-slate-100 sticky top-0 z-10">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>College</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>CGPA</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.applications.map((app) =>
            app.students.map((student) => (
              <TableRow
                key={student._id}
                className="hover:bg-slate-50 transition"
              >
                <TableCell>{app.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="font-medium">
                  {app.college?.fullname}
                </TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.cgpa}</TableCell>
                <TableCell>{student.semester}</TableCell>

                <TableCell>
                <a
                      href={getResumeUrl(student.resume?.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </a>
                </TableCell>

                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        student.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : student.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-200 text-gray-700"
                      }
                    `}
                  >
                    {student.status.toUpperCase()}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal className="h-5 w-5 text-slate-600 hover:text-slate-900" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 rounded-lg shadow-md bg-white">
                      {shortlistingStatus.map((s) => (
                        <div
                          key={s}
                          onClick={() =>
                            statusHandler(app._id, student._id, s)
                          }
                          className="py-2 px-2 text-sm cursor-pointer rounded bg-white hover:bg-slate-100" 
                        >
                          {s.toUpperCase()}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
