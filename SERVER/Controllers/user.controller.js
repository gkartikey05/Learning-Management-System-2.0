import User from "../Models/user.model.js";
import AppError from "../Utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
  secure: true,
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
          "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
      },
    });
    if (!user) {
      return next(new AppError("User registration failed", 503));
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
    user.password = undefined;

    const token = await user.generateJWTToken();
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
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

    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie("token", token, cookieOptions);
    res.status(200).json({
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

    res.status(200).json({
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

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export const updateUser = async (req, res, next) => {
  const { fullName } = req.body;
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  if (req.fullName) {
    user.fullName = fullName;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
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

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
};
