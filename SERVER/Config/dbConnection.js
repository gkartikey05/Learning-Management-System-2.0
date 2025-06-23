// Handles MongoDB connection using Mongoose
import { connect } from "mongoose";

// Get MongoDB URI from environment variables
const DB = process.env.MONGO_URI;

// Connect to MongoDB and handle connection errors
const dbConnection = async () => {
  try {
    const { connection } = await connect(DB);

    if (connection) {
      console.log(`MongoDB Connected Successfully at: ${connection.host}`);
    }
  } catch (err) {
    // Log error and exit process if connection fails
    console.error(err.message);
    process.exit(1);
  }
};

export default dbConnection;
