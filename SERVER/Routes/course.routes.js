import { Router } from "express";
import {
  createCourse,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  updateCourseById,
} from "../Controllers/course.controller.js";
import { isLoggedIn } from "../Middlewares/auth.middleware.js";
import upload from "../Middlewares/multer.middleware.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(isLoggedIn, upload.single("thumbnail"), createCourse);
router
  .route("/:id")
  .get(isLoggedIn, getCourseById)
  .put(isLoggedIn, upload.single("thumbnail"), updateCourseById)
  .delete(isLoggedIn, deleteCourseById);

export default router;
