import { Router } from "express";
import {
  addLecturesToCourseById,
  createCourse,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  updateCourseById,
} from "../Controllers/course.controller.js";
import { authorizedRoles, isLoggedIn } from "../Middlewares/auth.middleware.js";
import upload from "../Middlewares/multer.middleware.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourse
  );
  
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
