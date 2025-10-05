import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.use(authMiddleware());

router.post("/order", createPaymentOrder);

router.post("/verify", verifyPayment);

export default router;
