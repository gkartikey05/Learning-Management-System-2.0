import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      minLength: [5, "Course title must be at least 5 characters long"],
      maxLength: [100, "Course title must not exceed 100 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      minLength: [20, "Course description must be at least 20 characters long"],
      maxLength: [500, "Course description must not exceed 500 characters"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Course category is required"],
      enum: [
        "Web Development",
        "Mobile Development",
        "Data Science",
        "Machine Learning",
        "Cloud Computing",
        "Cyber Security",
        "Game Development",
        "AI & Robotics",
        "Blockchain",
        "DevOps",
      ],
    },
    thumbnail: {
      public_id: {
        type: String,
        required: [true, "Thumbnail public ID is required"],
      },
      secure_url: {
        type: String,
        required: [true, "Thumbnail secure URL is required"],
      },
    },
    lectures: [
      {
        title: {
          type: String,
          required: [true, "Lecture title is required"],
        },
        description: {
          type: String,
          required: [true, "Lecture description is required"],
        },
        lecture: {
          public_id: {
            type: String,
            required: [true, "Lecture public ID is required"],
          },
          secure_url: {
            type: String,
            required: [true, "Lecture secure URL is required"],
          },
        },
      },
    ],
    numbersOfLectures: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      required: [true, "Course creator name is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = model("Course", courseSchema);

export default Course;
