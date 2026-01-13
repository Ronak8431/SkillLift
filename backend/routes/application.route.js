import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStudentStatus
} from "../controllers/application.controller.js";

import upload from "../middlewares/multer.js";

const router = express.Router();

const onlyCollege = (req, res, next) => {
  if (req.role !== "college") {
    return res.status(403).json({ message: "College only", success: false });
  }
  next();
};

const onlyRecruiter = (req, res, next) => {
  if (req.role !== "recruiter") {
    return res.status(403).json({ message: "Recruiter only", success: false });
  }
  next();
};


router.post(
  "/apply/:id",
  isAuthenticated,
  onlyCollege,
  upload.array("resumes", 30),
  applyJob
);


router.get(
  "/applied",
  isAuthenticated,
  onlyCollege,
  getAppliedJobs
);


router.get(
  "/job/:id/applicants",
  isAuthenticated,
  onlyRecruiter,
  getApplicants
);


router.post(
  "/:applicationId/student/:studentId/status",
  isAuthenticated,
  onlyRecruiter,
  updateStudentStatus
);

export default router;
