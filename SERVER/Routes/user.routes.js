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
router.post("/signup", upload.single("avatar"), signUp);
// User login
router.post("/login", login);
// Get user profile (authenticated)
router.get("/profile", isLoggedIn, userProfile);
// Logout user (authenticated)
router.get("/logout", isLoggedIn, logout);
// Update user profile (authenticated, with avatar upload)
router.put("/update/:id", isLoggedIn, upload.single("avatar"), updateUser);
// Change password (authenticated)
router.post("/change-password", isLoggedIn, changePassword);
// Forgot password (send reset email)
router.post("/forgot-password", forgotPassword);
// Reset password using token
router.post("/reset-password/:resetToken", resetPassword);

export default router;
