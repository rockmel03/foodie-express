import crypto from "crypto";
import Razorpay from "../config/razorpay.js";
import ApiError from "../utils/ApiError.js";

export const createPaymentOrder = async ({ amount, currency = "INR" }) => {
  const options = {
    amount: amount * 100,
    currency,
    receipt: "receipt_order_" + Date.now(),
  };

  try {
    const order = await Razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Failed to create payment order");
  }
};

export const verifyPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new ApiError(400, "Invalid signature");
  }

  return true;
};
