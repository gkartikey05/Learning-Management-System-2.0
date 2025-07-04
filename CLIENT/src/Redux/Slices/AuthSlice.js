import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("/user/signup", data);
    toast.promise(res, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const loginAccount = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("/user/login", data);
    toast.promise(res, {
      loading: "Wait! logging you in",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const logoutAccount = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.get("/user/logout");
    toast.promise(res, {
      loading: "Wait! logging you out",
      success: (data) => {
        return data?.message;
      },
      error: "Failed to log out",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const updateProfile = createAsyncThunk(
  "/user/profile-update",
  async (data) => {
    try {
      const res = axiosInstance.put(`/user/update/${data[0]}`, data[1]);
      toast.promise(res, {
        loading: "Wait! updating your profile",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update profile",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getUserDetails = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get("/user/profile");
    return (await res).data;
  } catch (error) {
    toast.error(error?.message);
  }
});

export const changePassword = createAsyncThunk(
  "/user/change-password",
  async (userPassword) => {
    try {
      const res = axiosInstance.post("/user/change-password", userPassword);
      toast.promise(res, {
        loading: "Wait! changing your password",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to change password",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "/auth/forgot-password",
  async (email) => {
    try {
      const res = axiosInstance.post("/user/forgot-password", { email });
      toast.promise(res, {
        loading: "Wait! sending verification link",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to send verification link",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/auth/reset-password",
  async (data) => {
    try {
      const res = axiosInstance.post(
        `/user/reset-password/${data.resetToken}`,
        { password: data.password }
      );
      toast.promise(res, {
        loading: "Wait! resetting password",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to reset password",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.isLoggedIn = true;
          state.role = action?.payload?.user?.role;
          state.data = action?.payload?.user;
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("role", action?.payload?.user?.role);
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        }
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.isLoggedIn = true;
          state.role = action?.payload?.user?.role;
          state.data = action?.payload?.user;
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("role", action?.payload?.user?.role);
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        }
      })
      .addCase(logoutAccount.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.isLoggedIn = false;
          state.role = "";
          state.data = {};
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("role");
          localStorage.removeItem("data");
        }
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.isLoggedIn = true;
          state.role = action?.payload?.user?.role;
          state.data = action?.payload?.user;
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("role", action?.payload?.user?.role);
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        }
      });
  },
});

export default authSlice.reducer;
