import express from "express";
import z from "zod";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createOrder,
  getAllOrders,
  getOrderById,
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

router
  .route("/")
  .post(validate(createOrderSchema), createOrder)
  .get(getAllOrders);

router.post("/verify", validate(verifyOrderPaymentSchema), verifyOrderPayment);
router.route("/:id").get(getOrderById);

export default router;
