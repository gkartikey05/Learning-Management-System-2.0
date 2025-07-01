// Express routes for user authentication and profile management
import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signUp,
  updateUser,
  userProfile,
} from "../Controllers/user.controller.js";
import { isLoggedIn } from "../Middlewares/auth.middleware.js";
import upload from "../Middlewares/multer.middleware.js";

const router = Router();

// User registration with avatar upload
router
  .route("/signup")
  .post(upload.single("avatar"), signUp)
// User login
router
  .route("/login")
  .post(login)
// Get user profile (authenticated)
router
  .route("/profile")
  .get(isLoggedIn, userProfile)
// Logout user (authenticated)
router
  .route("/logout")
  .get(isLoggedIn, logout)
// Update user profile (authenticated, with avatar upload)
router
  .route("/update/:id")
  .put(isLoggedIn, upload.single("avatar"), updateUser)
// Change password (authenticated)
router
  .route("/change-password")
  .post(isLoggedIn, changePassword)
// Forgot password (send reset email)
router
  .route("/forgot-password")
  .post(forgotPassword)
// Reset password using token
router
  .route("/reset-password/:resetToken")
  .post(resetPassword)

export default router;
