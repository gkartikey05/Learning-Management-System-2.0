import AppError from "../Utils/error.util.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new AppError("Unauthenticated, please login first", 401));
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = userDetails;

  next();
};

export const authorizedRoles =
  (...roles) =>
  (req, res, next) => {
    const userRole = req?.user?.role;
    if (!roles.includes(userRole)) {
      return next(
        new AppError("You are not authorized to access this resource", 403)
      );
    }

    next();
  };

export const authorizeSubscribers = (req, res, next) => {
  if (req.user.role !== "ADMIN" && req.user.subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route.", 403));
  }

  next();
};
