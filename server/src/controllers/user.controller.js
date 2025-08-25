import z from "zod";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as userService from "../services/user.service.js";
import { cookieOptions } from "../config/cookieOptions.js";

export const register = asyncHandler(async (req, res) => {
  const registerUserSchema = z.object({
    fullname: z.string().min(3).max(30),
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(6).max(30),
  });

  const { fullname, username, email, password } = registerUserSchema.parse(
    req.body
  );

  const { user, accessToken, refreshToken } = await userService.registerUser({
    fullname,
    username,
    email,
    password,
  });

  return res
    .status(201)
    .cookies("token", refreshToken, cookieOptions)
    .json(
      ApiResponse.success(
        { user, accessToken, refreshToken },
        "User registered successfully",
        201
      )
    );
});

export const login = asyncHandler(async (req, res) => {
  const loginUserSchema = z.object({
    email: z.string().email().optional(),
    username: z.string().min(3).max(30).optional(),
    password: z.string().min(6).max(30),
  });

  const { email, username, password } = loginUserSchema.parse(req.body);

  const { user, accessToken, refreshToken } = await userService.loginUser({
    email,
    username,
    password,
  });

  return res
    .status(200)
    .cookies("token", refreshToken, cookieOptions)
    .json(
      ApiResponse.success(
        { user, accessToken, refreshToken },
        "User logged in successfully",
        200
      )
    );
});

export const refreshAuthToken = asyncHandler(async (req, res) => {
  const refreshTokenSchema = z.object({
    refreshToken: z.string(),
  });

  const { refreshToken: newRefreshToken } = await userService.refreshToken(
    refreshTokenSchema.parse(req.body)
  );

  return res
    .status(200)
    .cookies("token", newRefreshToken, cookieOptions)
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
