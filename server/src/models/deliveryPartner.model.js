import mongoose, { Schema } from "mongoose";

const deliveryPartnerSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    vehicle: String,
    status: {
      type: String,
      enum: ["available", "busy"],
      default: "available",
    },
  },
  { timestamps: true }
);

const DeliveryPartner = mongoose.model(
  "DeliveryPartner",
  deliveryPartnerSchema
);

export default DeliveryPartner;
