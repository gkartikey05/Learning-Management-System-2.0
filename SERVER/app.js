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
import swaggerUi from "swagger-ui-express";
// Use createRequire to import JSON in a way compatible with ESLint and Node.js
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");

// Load environment variables from .env file
config();

const app = express();

// CORS configuration for frontend integration
app.use(
  cors({
    origin: "https://learning-management-system-2-0.vercel.app",
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

// Define root route to handle GET and HEAD requests (e.g., Render health checks)
app.head("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  return res.status(200).send("LMS Backend is running");
});

//* API routes for different modules
app.use("/api/user", userRoutes); // User authentication and profile routes
app.use("/api/courses", courseRoutes); // Course management routes
app.use("/api", miscellanousRoutes); // Miscellaneous routes (contact, stats, etc.)
app.use("/api/payments", paymentRoutes); // Payment and subscription routes

// Synchronously import swagger-output.json and register Swagger route for API docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

// Global error handler middleware
app.use(errorMiddleware);

export default app;
