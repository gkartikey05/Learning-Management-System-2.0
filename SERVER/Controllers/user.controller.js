import User from "../Models/user.model.js";
import AppError from "../Utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../Utils/sendEmail.js";
import crypto from "crypto";

const cookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const signUp = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new AppError("Email already registered", 409));
    }

    const user = await User.create({
      fullName,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url:
          "https://res.cloudinary.com/dx0h4xmyc/image/upload/v1748796534/lms/avatar_drzgxv.jpg",
      },
    });
    if (!user) {
      return next(new AppError("User registration failed", 503));
    }

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "LMS/Users",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          fs.rm(`Uploads/${req.file.filename}`);
        }
      } catch (err) {
        return next(new AppError(err.message, 500));
      }
    }

    await user.save();
    user.password = undefined;

    const token = await user.generateJWTToken(
      user._id,
      user.email,
      user.subscription,
      user.role
    );
    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError("User not registered", 400));
    } else if (!(await user.comparePassword(password))) {
      return next(new AppError("Invalid Credentials", 400));
    }

    const token = await user.generateJWTToken(
      user._id,
      user.email,
      user.subscription,
      user.role
    );
    user.password = undefined;

    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    return res.status(200).json({
      success: true,
      message: "User details",
      user,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const logout = (req, res, next) => {
  try {
    res.cookie("token", null, {
      secure: true,
      httpOnly: true,
      maxAge: 0,
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { fullName } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    if (fullName) {
      user.fullName = fullName;
    }

    if (req.file) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "LMS/Users",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          // Remove file from server
          fs.rm(`Uploads/${req.file.filename}`);
        }
      } catch (err) {
        return next(new AppError(err.message, 500));
      }
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;
    if (!oldPassword || !newPassword) {
      return next(new AppError("All fields are required", 400));
    }

    const user = await User.findById(id).select("+password");
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (!(await user.comparePassword(oldPassword))) {
      return next(new AppError("Old password is incorrect", 400));
    }

    user.password = newPassword;
    await user.save();
    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new AppError("Email is required", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const resetToken = await user.generatePasswordResetToken();
    if (!resetToken) {
      return next(new AppError("Failed to generate reset token", 500));
    }

    await user.save();
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const subject = "Reset Password - LMS";
    const message = `Hello ${user.fullName},\n\nWe received a request to reset your password. Please click the link below to reset your password:\n\n${resetPasswordUrl}\n\nIf you did not request this, please ignore this email.\n\nThank you!`;

    try {
      await sendEmail(email, subject, message);

      return res.status(200).json({
        success: true,
        message: `Reset password link has been sent to ${email} successfully`,
        resetPasswordUrl,
      });
    } catch (err) {
      user.forgotPasswordToken = undefined;
      user.forgotPasswordExpiry = undefined;
      await user.save();

      return next(new AppError(err.message, 500));
    }
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    const forgotPasswordToken = await crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    console.log(forgotPasswordToken);

    const user = await User.findOne({
      forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new AppError("Token is invalid or expired, please try again", 400)
      );
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};
