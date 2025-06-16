import { Router } from 'express';
import { contactUs, userStats } from '../Controllers/miscellaneous.controller.js';
import { authorizedRoles, isLoggedIn } from "../Middlewares/auth.middleware.js";

const router = Router();

router
  .route("/contact")
  .post(contactUs);

router
  .route("/admin/stats/users")
  .get(isLoggedIn, authorizedRoles("ADMIN"), userStats);

export default router;