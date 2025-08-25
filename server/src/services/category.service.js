import Category from "../models/category.model.js";
import ApiError from "../utils/ApiError.js";

export const createCategory = async (categoryDetails) => {
  const { title, description, image } = categoryDetails;
  const category = await Category.create({ title, description, image });
  return category;
};

export const getCategories = async () => {
  const categories = await Category.find();
  return categories;
};

export const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  return category;
};

export const updateCategory = async (id, categoryDetails) => {
  const category = await Category.findByIdAndUpdate(id, categoryDetails, {
    new: true,
  });
  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  return category;
};
