import app from "./app.js";
import dbConnection from "./Config/dbConnection.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5010;

app.listen(PORT, async () => {
  await dbConnection();
  console.log(`Server is up and running at http://localhost:${PORT}`);
});
