import asyncHandler from "../utils/asyncHandler.js";
import * as PaymentService from "../services/payment.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import Cart from "../models/cart.model.js";
import * as orderService from "../services/order.service.js";

// controllers
export const createPaymentOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { amount, currency = "INR" } = req.body;

  const paymentOrder = await PaymentService.createPaymentOrder({
    amount,
    currency,
  });

  return res
    .status(200)
    .json(
      ApiResponse.success(paymentOrder, "Payment order created successfully")
    );
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const payment = await PaymentService.verifyRazorpayPayment({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  if (!payment) {
    throw new ApiError(400, "Payment verification failed");
  }

  return res
    .status(200)
    .json(ApiResponse.success(payment, "Payment verified successfully"));
});
