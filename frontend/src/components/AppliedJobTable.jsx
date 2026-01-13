import React from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

const CollegeStudentsProfile = () => {
  const { allAppliedJobs = [] } = useSelector((store) => store.job);


  const getResumeUrl = (url = "") => {
    return url.includes("/fl_inline")
      ? url.replace("/fl_inline", "")
      : url;
  };

  if (allAppliedJobs.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No students submitted yet.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {allAppliedJobs.map((application) => (
        <div key={application._id} className="border rounded-xl p-4">
          <h2 className="text-2xl font-semibold mb-4">
            Company: {application.job?.company?.name}
          </h2>
          <h2 className="text-lg font-semibold mb-4">
            Job: {application.job?.title}
          </h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>CGPA</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {application.students.map((student) => (
                <TableRow key={student._id}>
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

                  <TableCell className="text-right">
                    <Badge
                      className={
                        student.status === "accepted"
                          ? "bg-green-500"
                          : student.status === "rejected"
                          ? "bg-red-500"
                          : "bg-gray-400"
                      }
                    >
                      {student.status?.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default CollegeStudentsProfile;
