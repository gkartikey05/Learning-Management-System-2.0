import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  lectures: [],
};

export const getCourseLecture = createAsyncThunk(
  "/course/lecture/get",
  async (courseId) => {
    try {
      const res = axiosInstance.get(`/courses/${courseId}`);

      toast.promise(res, {
        loading: "Wait! fetching lectures",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to fetch lectures",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addCourseLecture = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    const formData = new FormData();
    formData.append("lecture", data.lecture);
    formData.append("title", data.title);
    formData.append("description", data.description);

    try {
      const res = axiosInstance.post(`/courses/${data.id}`, formData);

      toast.promise(res, {
        loading: "Adding the lecture...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to add lecture",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteCourseLecture = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
    try {
      const res = axiosInstance.delete(
        `/courses/?courseId=${data.courseId}&lectureId=${data.lectureId}`
      );

      toast.promise(res, {
        loading: "Deleting the lecture...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to delete lecture",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLecture.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.lectures = action?.payload?.lectures;
        }
      })
      .addCase(addCourseLecture.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.lectures = action?.payload?.course?.lectures;
        }
      });
  },
});

export default lectureSlice.reducer;
