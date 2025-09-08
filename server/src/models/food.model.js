import mongoose, { Schema } from "mongoose";

const foodSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      url: { type: String, required: true },
      fileId: { type: String, required: true },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;
