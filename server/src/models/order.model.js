import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema({
  foodId: {
    type: Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
});

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

export default Order;
