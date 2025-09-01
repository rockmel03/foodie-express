import { Router } from "express";
import {
  refreshAuthToken,
  register,
  login,
  logout,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import z from "zod";

const router = Router();

// validation schemas
const registerUserSchemas = {
  body: z.object({
    fullname: z.string().min(3).max(30),
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(6).max(30),
  }),
};

const loginUserSchemas = {
  body: z.object({
    email: z.string().email().optional(),
    username: z.string().min(3).max(30).optional(),
    password: z.string().min(6).max(30),
  }),
};

const refreshTokenSchemas = {
  body: z.object({
    refreshToken: z.string().optional(),
  }),
};

const logoutSchemas = {
  body: z.object({
    refreshToken: z.string().optional(),
  }),
};

// routes
router.post("/register", validate(registerUserSchemas), register);
router.post("/login", validate(loginUserSchemas), login);
router.post("/refresh-token", validate(refreshTokenSchemas), refreshAuthToken);
router.post("/logout", validate(logoutSchemas), logout);

export default router;
