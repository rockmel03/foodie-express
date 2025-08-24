import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
