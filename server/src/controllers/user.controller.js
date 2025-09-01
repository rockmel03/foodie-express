import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as userService from "../services/user.service.js";
import { cookieOptions } from "../config/cookieOptions.js";

export const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await userService.registerUser(
    req.body
  );

  return res
    .status(201)
    .cookie("token", refreshToken, cookieOptions)
    .json(
      ApiResponse.success(
        { user, accessToken, refreshToken },
        "User registered successfully",
        201
      )
    );
});

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await userService.loginUser(
    req.body
  );

  return res
    .status(200)
    .cookie("token", refreshToken, cookieOptions)
    .json(
      ApiResponse.success(
        { user, accessToken, refreshToken },
        "User logged in successfully",
        200
      )
    );
});

export const refreshAuthToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.token || req.body.refreshToken;

  const { accessToken, refreshToken: newRefreshToken } =
    await userService.refreshToken(token);

  return res
    .status(200)
    .cookie("token", newRefreshToken, cookieOptions)
    .json(
      ApiResponse.success(
        { accessToken, refreshToken: newRefreshToken },
        "Token generated successfully",
        200
      )
    );
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.token || req.body.refreshToken;

  const { user } = await userService.logoutUser(refreshToken);

  return res
    .status(200)
    .clearCookie("token", cookieOptions)
    .json(ApiResponse.success({ user }, "User logged out successfully", 200));
});
