import { Router } from "express";
import {
  refreshAuthToken,
  register,
  login,
  logout,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshAuthToken);
router.post("/logout", logout);

export default router;
