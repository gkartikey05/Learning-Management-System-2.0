import { Router } from "express";
import {
  login,
  logout,
  signUp,
  userProfile,
} from "../Controllers/user.controller.js";
import { isLoggedIn } from "../Middlewares/auth.middleware.js";
import upload from "../Middlewares/multer.middleware.js";

const router = Router();

router.post("/signup", upload.single("avatar"), signUp);
router.post("/login", login);
router.get("/profile", isLoggedIn, userProfile);
router.get("/logout", isLoggedIn, logout);

export default router;
