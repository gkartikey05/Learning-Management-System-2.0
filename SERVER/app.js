// Main Express app setup for the Learning Management System backend
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import userRoutes from "./Routes/user.routes.js";
import courseRoutes from "./Routes/course.routes.js";
import miscellanousRoutes from "./Routes/miscellaneous.routes.js";
import paymentRoutes from "./Routes/payment.routes.js";
import { errorMiddleware } from "./Middlewares/error.middleware.js";

// Load environment variables from .env file
config();

const app = express();

// Enable CORS for frontend URL and allow credentials
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// Parse JSON and URL-encoded data from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Parse cookies from requests
app.use(cookieParser());
// Log HTTP requests in development
app.use(morgan("dev"));

//* API routes for different modules
app.use("/api/v1/user", userRoutes); // User authentication and profile routes
app.use("/api/v1/courses", courseRoutes); // Course management routes
app.use("/api/v1", miscellanousRoutes); // Miscellaneous routes (contact, stats, etc.)
app.use("/api/v1/payments", paymentRoutes); // Payment and subscription routes

// Global error handler middleware
app.use(errorMiddleware);

export default app;
