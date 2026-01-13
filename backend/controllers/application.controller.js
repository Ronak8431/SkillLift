import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import mongoose from "mongoose";


export const applyJob = async (req, res) => {
  try {
    const collegeId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false
      });
    }

    const students = JSON.parse(req.body.students || "[]");

    if (!students.length) {
      return res.status(400).json({
        message: "At least one student is required",
        success: false
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

  
    const alreadyApplied = await Application.findOne({
      job: jobId,
      college: collegeId
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "College already applied to this job",
        success: false
      });
    }

  
    if (!req.files || req.files.length !== students.length) {
      return res.status(400).json({
        message: "Each student must have a resume",
        success: false
      });
    }

    const formattedStudents = students.map((s, i) => ({
      name: s.name,
      email: s.email,
      cgpa: s.cgpa,
      semester: s.semester,
       resume: {
    url: req.files[i].path,
    public_id: req.files[i].filename
  }, 
      status: "pending"
    }));

    const application = await Application.create({
      job: jobId,
      college: collegeId,
      students: formattedStudents
    });

    job.applications.push(application._id);
    await job.save();

    return res.status(201).json({
      message: "Students submitted successfully",
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Application failed",
      success: false
    });
  }
};




export const getAppliedJobs = async (req, res) => {
    try {
        const collegeId = req.id;

        const applications = await Application.find({ college: collegeId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                populate: {
                    path: "company"
                }
            });

        if (!applications.length) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "applications",
            populate: {
                path: "college",
                select: "fullname email"
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

export const updateStudentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { applicationId, studentId } = req.params;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        const student = application.students.id(studentId);
        if (!student) {
            return res.status(404).json({
                message: "Student not found",
                success: false
            });
        }

        student.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Student status updated successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};
