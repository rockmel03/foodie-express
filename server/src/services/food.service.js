import Food from "../models/food.model.js";
import ApiError from "../utils/ApiError.js";
import Category from "../models/category.model.js";
import {
  deleteImageFromImageKit,
  uploadImageToImageKit,
} from "./imagekit.service.js";
import mongoose from "mongoose";
import fs from "fs";

export const createFood = async (foodDetails) => {
  const {
    title,
    description,
    price,
    discount,
    categoryId,
    image,
    isActive = true,
  } = foodDetails;

  const isCategoryValid = await Category.findById(categoryId);
  if (!isCategoryValid) {
    throw ApiError.notFoundError("Category");
  }

  if (!image) {
    throw ApiError.badRequestError("Image is required");
  }
  const imageKitResponse = await uploadImageToImageKit(
    image,
    title,
    "foodie/foods"
  );

  const food = await Food.create({
    title,
    description,
    price,
    discount,
    categoryId,
    image: imageKitResponse,
    isActive,
  });
  return food;
};

export const getFoods = async ({
  limit,
  page,
  sort = "createdAt:desc",
  categoryId = "",
  search = "",
}) => {
  const currentLimit = parseInt(limit);
  const currentPage = parseInt(page);
  const skip = (currentPage - 1) * currentLimit;

  const totalFoods = await Food.countDocuments();
  const totalPages = Math.ceil(totalFoods / currentLimit);

  const query = {
    $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ],
  };

  if (categoryId) {
    query.categoryId = { $in: [new mongoose.Types.ObjectId(categoryId)] };
  }

  const foods = await Food.find(query).skip(skip).limit(limit).sort(sort);

  return {
    items: foods,
    currentLimit,
    currentPage,
    totalDocuments: totalFoods,
    totalPages,
  };
};

export const getFoodById = async (id) => {
  const food = await Food.findById(id);
  return food;
};

export const updateFood = async (
  id,
  { title, description, price, discount, categoryId, isActive, image }
) => {
  if (categoryId) {
    const isCategoryValid = await Category.findById(categoryId);
    if (!isCategoryValid) {
      throw ApiError.notFoundError("Category");
    }
  }

  const food = await Food.findById(id);
  if (!food) {
    throw ApiError.notFoundError("Food");
  }

  if (image && image.path && fs.existsSync(image.path)) {
    const imageKitResponse = await uploadImageToImageKit(
      image,
      title,
      "foodie/foods"
    );
    food.image = imageKitResponse;
  }

  if (categoryId) food.categoryId = categoryId;
  if (title) food.title = title;
  if (description) food.description = description;
  if (price) food.price = price;
  if (discount) food.discount = discount;
  if (isActive ?? food.isActive) food.isActive = isActive;

  await food.save();
  return food;
};

export const deleteFood = async (id) => {
  const food = await Food.findById(id);
  if (!food) {
    throw ApiError.notFoundError("Food");
  }

  // delete image
  if (food.image?.fileId) {
    await deleteImageFromImageKit(food.image.fileId);
  }

  return await Food.findByIdAndDelete(id);
};
