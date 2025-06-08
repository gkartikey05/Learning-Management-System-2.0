import { Router } from 'express';
import { contactUs } from '../Controllers/miscellaneous.controller.js';

const router = Router();

router
  .route("/contact")
  .post(contactUs);

export default router;