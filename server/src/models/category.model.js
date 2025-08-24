import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: String,
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
