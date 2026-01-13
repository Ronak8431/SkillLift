import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.mimetype === "application/pdf") {
      return {
        folder: "job_portal/resumes",
        resource_type: "image",
        format: "jpg",
        page: 1
      };
    }
    throw new Error("Only PDF allowed");
  }
});

const upload = multer({ storage });

export default upload;
