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
