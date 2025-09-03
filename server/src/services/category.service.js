import Category from "../models/category.model.js";
import ApiError from "../utils/ApiError.js";
import {
  uploadImageToImageKit,
  deleteImageFromImageKit,
} from "../services/imagekit.service.js";

export const createCategory = async (categoryDetails) => {
  const { title, description, image } = categoryDetails;

  if (!image) {
    throw ApiError.badRequestError("Image is required");
  }
  const imageKitResponse = await uploadImageToImageKit(
    image,
    title,
    "foodie/categories"
  );

  const category = await Category.create({
    title,
    description,
    image: imageKitResponse,
  });
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
  const category = await Category.findById(id);
  if (!category) {
    throw ApiError.notFoundError("Category");
  }
  if (categoryDetails.image) {
    const imageKitResponse = await uploadImageToImageKit(
      categoryDetails.image,
      category.title,
      "foodie/categories"
    );
    categoryDetails.image = imageKitResponse;

    // delete old image
    if (category.image?.fileId) {
      await deleteImageFromImageKit(category.image.fileId);
    }
  }
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    categoryDetails,
    {
      new: true,
    }
  );
  return updatedCategory;
};

export const deleteCategory = async (id) => {
  const category = await Category.findById(id)
  if (!category) {
    throw ApiError.notFoundError("Category");
  }

  // delete image
  if (category.image?.fileId) {
    await deleteImageFromImageKit(category.image.fileId);
  }

  return await Category.findByIdAndDelete(id);
};
