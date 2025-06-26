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

// CORS configuration for frontend integration
const allowedOrigins = [
  process.env.FRONTEND_URL_PROD,
  process.env.FRONTEND_URL, // fallback for local/dev
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Parse JSON and URL-encoded data from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Parse cookies from requests
app.use(cookieParser());
// Log HTTP requests in development
app.use(morgan("dev"));

// Define root route to handle GET and HEAD requests (e.g., Render health checks)
app.head("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.status(200).send("LMS Backend is running");
});

//* API routes for different modules
app.use("/api/v1/user", userRoutes); // User authentication and profile routes
app.use("/api/v1/courses", courseRoutes); // Course management routes
app.use("/api/v1", miscellanousRoutes); // Miscellaneous routes (contact, stats, etc.)
app.use("/api/v1/payments", paymentRoutes); // Payment and subscription routes

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

// Global error handler middleware
app.use(errorMiddleware);

export default app;
