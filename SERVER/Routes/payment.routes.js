// Express routes for payment and subscription endpoints
import { Router } from 'express'
import { 
  authorizedRoles, 
  authorizeSubscribers, 
  isLoggedIn 
} from '../Middlewares/auth.middleware.js';
import { 
  allPayments, 
  buySubscription, 
  cancelSubscription, 
  getRazorpayApiKey, 
  verifySubscription 
} from '../Controllers/payment.controller.js';

const router = Router()

// Start a new subscription
router
  .route('/subscribe')
  .post(isLoggedIn, buySubscription);

// Verify a subscription payment
router
  .route('/verify')
  .post(isLoggedIn, verifySubscription);

// Cancel a subscription (subscribers only)
router
  .route('/unsubscribe')
  .post(isLoggedIn, authorizeSubscribers, cancelSubscription);

// Get Razorpay API key for frontend
router
  .route('/razorpay-key')
  .get(isLoggedIn, getRazorpayApiKey);

// Get all payments (admin only)
router
  .route('/')
  .get(isLoggedIn, authorizedRoles('ADMIN'), allPayments);

export default router;