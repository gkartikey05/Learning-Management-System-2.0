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

router.post("/signup", upload.single("avatar"), signUp);
router.post("/login", login);
router.get("/profile", isLoggedIn, userProfile);
router.get("/logout", isLoggedIn, logout);
router.put("/update/:id", isLoggedIn, upload.single("avatar"), updateUser);
router.post("/change-password", isLoggedIn, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

export default router;
