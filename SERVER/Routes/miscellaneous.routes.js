// Express routes for miscellaneous endpoints (contact, stats)
import { Router } from "express";
import {
  contactUs,
  userStats,
} from "../Controllers/miscellaneous.controller.js";
import { authorizedRoles, isLoggedIn } from "../Middlewares/auth.middleware.js";

const router = Router();

// Contact form endpoint
router
  .route("/contact")
  .post(contactUs)
  .head((req, res) => res.sendStatus(200));

// Admin-only user statistics endpoint
router
  .route("/admin/stats/users")
  .get(isLoggedIn, authorizedRoles("ADMIN"), userStats)
  .head((req, res) => res.sendStatus(200));

export default router;
