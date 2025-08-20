import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const healthCheckController = asyncHandler(async (req, res) => {
  res.status(200).json(ApiResponse.success({}, "Server is running", 200));
});
