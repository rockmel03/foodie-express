import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        foodId: { type: Schema.Types.ObjectId, ref: "Food", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "preparing",
        "out-for-delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },
    addressId: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    deliveryPartnerId: { type: Schema.Types.ObjectId, ref: "DeliveryPartner" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
