import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as FoodService from "../services/food.service.js";

export const createFood = asyncHandler(async (req, res) => {
  const { title, description, price, discount, categoryId, isActive } = req.body;
  const image = req.file;

  const food = await FoodService.createFood({
    title,
    description,
    price,
    discount,
    categoryId,
    isActive,
    image,
  });
  return res
    .status(201)
    .json(ApiResponse.success(food, "Food created successfully", 201));
});

export const getFoods = asyncHandler(async (req, res) => {
  const { limit = 10, page = 1, categoryId, search, sort } = req.query;

  const { foods, currentLimit, currentPage, totalDocuments, totalPages } =
    await FoodService.getFoods({ limit, page, categoryId, search, sort });
  return res
    .status(200)
    .json(
      ApiResponse.success(
        { foods, currentLimit, currentPage, totalDocuments, totalPages },
        "Foods fetched successfully",
        200
      )
    );
});

export const getFoodById = asyncHandler(async (req, res) => {
  const food = await FoodService.getFoodById(req.params.id);
  return res
    .status(200)
    .json(ApiResponse.success(food, "Food fetched successfully", 200));
});

export const updateFood = asyncHandler(async (req, res) => {
  const { title, description, price, discount, categoryId, isActive } =
    req.body;
  const image = req.file;

  const food = await FoodService.updateFood(req.params.id, {
    title,
    description,
    price,
    discount,
    categoryId,
    isActive,
    image,
  });
  return res
    .status(200)
    .json(ApiResponse.success(food, "Food updated successfully", 200));
});

export const deleteFood = asyncHandler(async (req, res) => {
  const food = await FoodService.deleteFood(req.params.id);
  return res
    .status(200)
    .json(ApiResponse.success(food, "Food deleted successfully", 200));
});
