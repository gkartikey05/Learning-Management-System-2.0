import Course from "../Models/course.model.js";
import AppError from "../Utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({})
      .select("-lectures")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      courses,
    });
  } catch (err) {
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

    res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      lectures: course.lectures,
    });
  } catch (err) {
    return next(new AppError("Failed to fetch this course", 500));
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, thumbnail, createdBy } = req.body;

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
          folder: "lms",
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
    res.status(201).json({
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
    res.status(200).json({
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

    res.status(200).json({
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
      lecture: {
        public_id: title,
        secure_url:
          "https://res.cloudinary.com/dx0h4xmyc/image/upload/v1748796534/lms/avatar_drzgxv.jpg",
      },
    };

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          lectureData.lecture.public_id = result.public_id;
          lectureData.lecture.secure_url = result.secure_url;

          fs.rm(`Uploads/${req.file.filename}`);
        }
      } catch (err) {
        return next(new AppError(err.message, 500));
      }
    }

    course.lectures.push(lectureData);
    course.numbersOfLectures = course.lectures.length;
    await course.save();

    res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      course,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};
