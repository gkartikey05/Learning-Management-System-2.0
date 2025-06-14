import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("/courses/get", async () => {
  try {
    const res = axiosInstance.get("/courses");
    toast.promise(res, {
      loading: "Wait! fetching courses",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to fetch courses",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createNewCourse = createAsyncThunk(
  "/get/courses",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnail", data?.thumbnail);

      const res = axiosInstance.post("/courses", formData);
      toast.promise(res, {
        loading: "Creating the course...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to create course",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const res = axiosInstance.delete(`courses/${id}`);
    toast.promise(res, {
      loading: "Deleting the course...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to delete course",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const updateCourse = createAsyncThunk("/course/update", async (data) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("createdBy", data.createdBy);
    formData.append("description", data.description);

    const res = axiosInstance.put(`/courses/${data.id}`, {
      title: data.title,
      category: data.category,
      createdBy: data.createdBy,
      description: data.description,
    });
    toast.promise(res, {
      loading: "Updating the course...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to update course",
    });
    return (await res).data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action?.payload?.success) {
        state.courseData = [...action.payload.courses];
      }
    });
  },
});

export default courseSlice.reducer;
