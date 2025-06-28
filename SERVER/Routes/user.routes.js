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
  .head((req, res) => res.sendStatus(200));
// User login
router
  .route("/login")
  .post(login)
  .head((req, res) => res.sendStatus(200));
// Get user profile (authenticated)
router
  .route("/profile")
  .get(isLoggedIn, userProfile)
  .head((req, res) => res.sendStatus(200));
// Logout user (authenticated)
router
  .route("/logout")
  .get(isLoggedIn, logout)
  .head((req, res) => res.sendStatus(200));
// Update user profile (authenticated, with avatar upload)
router
  .route("/update/:id")
  .put(isLoggedIn, upload.single("avatar"), updateUser)
  .head((req, res) => res.sendStatus(200));
// Change password (authenticated)
router
  .route("/change-password")
  .post(isLoggedIn, changePassword)
  .head((req, res) => res.sendStatus(200));
// Forgot password (send reset email)
router
  .route("/forgot-password")
  .post(forgotPassword)
  .head((req, res) => res.sendStatus(200));
// Reset password using token
router
  .route("/reset-password/:resetToken")
  .post(resetPassword)
  .head((req, res) => res.sendStatus(200));

export default router;
