import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export function authMiddleware(roles = []) {
  return asyncHandler(async (req, res, next) => {
    const token = req.headers?.authorization?.replace("Bearer ", "");
    if (!token) {
      throw ApiError.authError("Unauthorized");
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded.user;

      if (roles.length > 0 && !roles.includes(decoded.user.role)) {
        throw new ApiError(403, "Forbidden");
      }

      next();
    } catch (error) {
      throw ApiError.authError("Unauthorized");
    }
  });
}
