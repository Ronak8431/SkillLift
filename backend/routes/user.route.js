import express from "express";
import { getAllColleges, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import uploadProfile from "../middlewares/multer.profile.js";


const router = express.Router();

router.post("/register", uploadProfile.single("file"), register);
router.post("/profile/update", isAuthenticated, uploadProfile.single("file"), updateProfile);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.get("/colleges", isAuthenticated, getAllColleges);


export default router;
