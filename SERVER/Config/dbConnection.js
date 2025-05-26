import { connect } from "mongoose";

const DB = process.env.MONGO_URI;

const dbConnection = async () => {
  try {
    const { connection } = await connect(DB);

    if (connection) {
      console.log(`MongoDB Connected Successfully at: ${connection.host}`);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default dbConnection;
