import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as CategoryService from "../services/category.service.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // todo: add image upload

  const category = await CategoryService.createCategory({ title, description });
  return res
    .status(201)
    .json(ApiResponse.success(category, "Category created successfully", 201));
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await CategoryService.getCategories();
  return res
    .status(200)
    .json(
      ApiResponse.success(categories, "Categories fetched successfully", 200)
    );
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await CategoryService.getCategoryById(req.params.id);
  return res
    .status(200)
    .json(ApiResponse.success(category, "Category fetched successfully", 200));
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const category = await CategoryService.updateCategory(req.params.id, {
    title,
    description,
  });
  return res
    .status(200)
    .json(ApiResponse.success(category, "Category updated successfully", 200));
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await CategoryService.deleteCategory(req.params.id);
  // todo: delete category image
  return res
    .status(200)
    .json(ApiResponse.success(category, "Category deleted successfully", 200));
});
