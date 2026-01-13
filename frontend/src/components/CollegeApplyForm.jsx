import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/shared/Navbar";
import { Loader2, Plus, Trash2 } from "lucide-react";

const CollegeApplyForm = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState([
    { name: "", email: "", cgpa: "", semester: "", resume: null },
  ]);

  const addStudent = () => {
    if (students.length >= 30) {
      toast.error("Maximum 30 students allowed");
      return;
    }
    setStudents([
      ...students,
      { name: "", email: "", cgpa: "", semester: "", resume: null },
    ]);
  };

  const removeStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const submitHandler = async () => {
    for (let i = 0; i < students.length; i++) {
      const s = students[i];
      if (!s.name || !s.email || !s.cgpa || !s.semester || !s.resume) {
        toast.error(`All fields required for student ${i + 1}`);
        return;
      }
    }

    try {
      setLoading(true);
      const formData = new FormData();

      const studentData = students.map(({ resume, ...rest }) => rest);
      formData.append("students", JSON.stringify(studentData));
      students.forEach((s) => formData.append("resumes", s.resume));

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        toast.success("Students submitted successfully");
        navigate("/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdebd3] to-[#fff1e6]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Apply Job – Upload Students
        </h1>
        <p className="text-slate-700 mb-8">
          Submit student details in bulk (up to 30 students)
        </p>

        {students.map((student, index) => (
          <div
            key={index}
            className="mb-6 rounded-2xl bg-white/70 backdrop-blur-md border border-orange-200 shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">
                Student {index + 1}
              </h2>

              {students.length > 1 && (
                <button
                  onClick={() => removeStudent(index)}
                  className="text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Student Name"
                value={student.name}
                onChange={(e) =>
                  handleChange(index, "name", e.target.value)
                }
                className="border border-slate-300 rounded-xl px-4 py-2"
              />

              <input
                placeholder="Email"
                value={student.email}
                onChange={(e) =>
                  handleChange(index, "email", e.target.value)
                }
                className="border border-slate-300 rounded-xl px-4 py-2"
              />

              <input
                type="number"
                placeholder="CGPA"
                value={student.cgpa}
                onChange={(e) =>
                  handleChange(index, "cgpa", e.target.value)
                }
                className="border border-slate-300 rounded-xl px-4 py-2"
              />

              <input
                type="number"
                placeholder="Semester"
                value={student.semester}
                onChange={(e) =>
                  handleChange(index, "semester", e.target.value)
                }
                className="border border-slate-300 rounded-xl px-4 py-2"
              />

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  handleChange(index, "resume", e.target.files[0])
                }
                className="border border-slate-300 rounded-xl px-4 py-2 md:col-span-2"
              />
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={addStudent}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Student
          </Button>

          <Button
            disabled={loading}
            onClick={submitHandler}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollegeApplyForm;
