import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    addressLine: { type: String, required: true },
    phone: { type: String, required: true },
    street: String,
    city: String,
    state: String,
    country: String,
    zipcode: Number,
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
