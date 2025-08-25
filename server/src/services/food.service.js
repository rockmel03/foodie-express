import Food from "../models/food.model.js";
import ApiError from "../utils/ApiError.js";
import Category from "../models/category.model.js";

export const createFood = async (foodDetails) => {
  const { title, description, price, discount, categoryId } = foodDetails;

  const isCategoryValid = await Category.findById(categoryId);
  if (!isCategoryValid) {
    throw ApiError.notFoundError("Category");
  }

  const food = await Food.create({
    title,
    description,
    price,
    discount,
    categoryId,
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

  const foods = await Food.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ],
    categoryId: { $in: [categoryId] },
  })
    .skip(skip)
    .limit(limit)
    .sort(sort);

  return {
    foods,
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

export const updateFood = async (id, foodDetails) => {
  const isCategoryValid = await Category.findById(foodDetails.categoryId);
  if (!isCategoryValid) {
    throw ApiError.notFoundError("Category");
  }
  const food = await Food.findById(id);
  if (!food) {
    throw ApiError.notFoundError("Food");
  }

  if (food.categoryId) food.categoryId = foodDetails.categoryId;
  if (food.title) food.title = foodDetails.title;
  if (food.description) food.description = foodDetails.description;
  if (food.price) food.price = foodDetails.price;
  if (food.discount) food.discount = foodDetails.discount;

  await food.save();
  return food;
};

export const deleteFood = async (id) => {
  const food = await Food.findByIdAndDelete(id);
  return food;
};
