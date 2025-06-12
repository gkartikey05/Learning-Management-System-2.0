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

config();

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

//* routes of all the modules
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1", miscellanousRoutes);
app.use("/api/v1/payments", paymentRoutes)

app.use(errorMiddleware);

export default app;