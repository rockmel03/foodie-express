import asyncHandler from "../utils/asyncHandler.js";
import * as PaymentService from "../services/payment.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import Cart from "../models/cart.model.js";

// controllers
export const createPaymentOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId }).populate("items.foodId");

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  if (cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  const amount = cart.items.reduce((total, item) => {
    return total + item.quantity * item.foodId.price;
  }, 0);

  const paymentOrder = await PaymentService.createPaymentOrder({
    amount,
    currency: "INR",
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

  const isVerified = await PaymentService.verifyPayment({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  if (!isVerified) {
    throw new ApiError(400, "Payment verification failed");
  }

  // todo: create order in database;

  return res
    .status(200)
    .json(ApiResponse.success({}, "Payment verified successfully"));
});
