import jwt from "jsonwebtoken";
import AppError from "../Utils/error.util.js";

const generateToken = async (id, email, subscription, role, res, next) => {
  try {
    const payload = { id, email, subscription, role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    // Cookie options
    const cookieOptions = {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    // Set cookie
    res.cookie("token", token, cookieOptions);
  } catch (err) {
    return next(new AppError(`Error generating token:, ${err.message}`));
  }
};

export default generateToken;
