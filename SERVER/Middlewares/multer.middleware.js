// Middleware for handling file uploads using multer
import path from "path";
import multer from "multer";

// Configure multer for file storage and filtering
const upload = multer({
  dest: "Uploads/",
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB max file size
  storage: multer.diskStorage({
    destination: "Uploads/",
    filename: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname);

    // Allow only specific file types
    if (
      ext !== ".jpeg" &&
      ext !== ".jpg" &&
      ext !== ".webp" &&
      ext !== ".png" &&
      ext !== ".mp4"
    ) {
      cb(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }

    cb(null, true);
  },
});

export default upload;
