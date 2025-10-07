import express from "express";
import z from "zod";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createOrder,
  verifyOrderPayment,
} from "../controllers/order.controller.js";

const router = express.Router();

router.use(authMiddleware());

const createOrderSchema = {
  body: z.object({
    addressId: z.string(),
    paymentMethod: z.enum(["online", "cod"]),
  }),
};

const verifyOrderPaymentSchema = {
  body: z.object({
    razorpay_order_id: z.string(),
    razorpay_payment_id: z.string(),
    razorpay_signature: z.string(),
  }),
};

router.post("/", validate(createOrderSchema), createOrder);
router.post("/verify", validate(verifyOrderPaymentSchema), verifyOrderPayment);

export default router;
