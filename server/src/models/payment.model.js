import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay"],
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
