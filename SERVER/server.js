// Entry point for starting the server and connecting to services
import app from "./app.js";
import dbConnection from "./Config/dbConnection.js";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";

// Configure Cloudinary for file uploads
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize Razorpay instance for payment processing
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const PORT = process.env.PORT || 5010;

// Start the Express server and connect to MongoDB
app.listen(PORT, async () => {
  await dbConnection();
  console.log(`Server is up and running at http://localhost:${PORT}`);
});
