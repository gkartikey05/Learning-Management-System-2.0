import Course from "../Models/course.model.js";
import AppError from "../Utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import path from "path";

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({})
      .select("-lectures")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      courses,
    });
  } catch {
    return next(new AppError("Failed to fetch courses", 500));
  }
};

export const getCourseById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Course not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      lectures: course.lectures,
    });
  } catch {
    return next(new AppError("Failed to fetch this course", 500));
  }
};

export const createCourse = async (req, res, next) => {
  try {
    // Remove unused variable 'thumbnail'
    const { title, description, category, createdBy } = req.body;

    const course = await Course.create({
      title,
      description,
      category,
      thumbnail: {
        public_id: title,
        secure_url:
          "https://res.cloudinary.com/dx0h4xmyc/image/upload/v1748796534/lms/avatar_drzgxv.jpg",
      },
      createdBy,
    });
    if (!course) {
      return next(new AppError("Course cannot be created", 500));
    }

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "LMS/Courses",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          course.thumbnail.public_id = result.public_id;
          course.thumbnail.secure_url = result.secure_url;

          fs.rm(`Uploads/${req.file.filename}`);
        }
      } catch (err) {
        return next(new AppError(err.message, 500));
      }
    }

    await course.save();
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const updateCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );

    if (!course) {
      return next(new AppError("Course not found", 404));
    }

    await course.save();
    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const deleteCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (course === null) {
      return next(new AppError("Course does not exist anymore", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      course,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const addLecturesToCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("Course not found", 404));
    }

    const lectureData = {
      title,
      description,
      lecture: {},
    };

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "LMS/Lectures",
          chunk_size: 5 * 1024 * 1024 * 1024, // 5 GB size
          resource_type: "video",
        });

        if (result) {
          lectureData.lecture.public_id = result.public_id;
          lectureData.lecture.secure_url = result.secure_url;
        }
        fs.rm(`Uploads/${req.file.filename}`);
      } catch (err) {
        for (const file of await fs.readdir("Uploads/")) {
          await fs.unlink(path.join("Uploads/", file));
        }
        return next(new AppError(err.message, 500));
      }
    }

    course.lectures.push(lectureData);
    course.numbersOfLectures = course.lectures.length;
    await course.save();

    return res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      course,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const deleteLectureToCourseById = async (req, res, next) => {
  const { courseId, lectureId } = req.query;

  if (!courseId) {
    return next(new AppError("Course ID is required", 400));
  }

  if (!lectureId) {
    return next(new AppError("Lecture ID is required", 400));
  }

  const course = await Course.findById(courseId);

  if (!course) {
    return next(new AppError("Invalid ID or Course does not exist.", 404));
  }

  const lectureIndex = course.lectures.findIndex(
    (lecture) => lecture._id.toString() === lectureId.toString()
  );

  if (lectureIndex === -1) {
    return next(new AppError("Lecture does not exist.", 404));
  }

  await cloudinary.v2.uploader.destroy(
    course.lectures[lectureIndex].lecture.public_id,
    {
      resource_type: "video",
    }
  );

  course.lectures.splice(lectureIndex, 1);

  course.numberOfLectures = course.lectures.length;

  await course.save();

  return res.status(200).json({
    success: true,
    message: "Course lecture removed successfully",
  });
};
