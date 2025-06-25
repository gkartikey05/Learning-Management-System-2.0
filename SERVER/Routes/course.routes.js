// Express routes for course-related endpoints
import { Router } from "express";
import {
  addLecturesToCourseById,
  createCourse,
  deleteCourseById,
  deleteLectureToCourseById,
  getAllCourses,
  getCourseById,
  updateCourseById,
} from "../Controllers/course.controller.js";
import { authorizedRoles, isLoggedIn } from "../Middlewares/auth.middleware.js";
import upload from "../Middlewares/multer.middleware.js";

const router = Router();

// Get all courses or create a new course (admin only)
router
  .route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourse
  )
  .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteLectureToCourseById);

// Get, update, delete, or add lectures to a specific course by ID
router
  .route("/:id")
  .get(
    isLoggedIn, 
    getCourseById
  )
  .put(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    updateCourseById
  )
  .delete(
    isLoggedIn, 
    authorizedRoles("ADMIN"), 
    deleteCourseById
  )
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("lecture"),
    addLecturesToCourseById
  );

export default router;
