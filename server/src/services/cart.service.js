import Cart from "../models/cart.model.js";
import ApiError from "../utils/ApiError.js";
import Food from "../models/food.model.js";
import mongoose from "mongoose";

export const getCart = async (userId) => {
  const isValidId = mongoose.isValidObjectId(userId);
  if (!isValidId) {
    throw ApiError.badRequestError("Invalid user ID");
  }
  const carts = await Cart.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "foods",
        localField: "items.foodId",
        foreignField: "_id",
        as: "items.food",
      },
    },
    { $unwind: "$items.food" },
    {
      $group: {
        _id: "$_id",
        userId: { $first: "$userId" },
        items: {
          $push: {
            foodId: "$items.foodId",
            quantity: "$items.quantity",
            food: "$items.food",
          },
        },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
      },
    },
  ]);

  const cart = carts[0];
  if (!cart) {
    return null;
  }
  return cart;
};

export const addToCart = async (userId, foodId, quantity = 1) => {
  const food = await Food.findById(foodId);
  if (!food) {
    throw ApiError.notFoundError("Food");
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    const newCart = await Cart.create({
      userId,
      items: [{ foodId, quantity }],
    });
    return getCart(userId);
  }

  const isExistingFood = cart.items.find((item) => item.foodId.equals(foodId));
  if (isExistingFood) {
    cart.items = cart.items.map((item) => {
      if (item.foodId.equals(foodId)) {
        item.quantity += quantity;
      }
      return item;
    });
  } else {
    cart.items.push({ foodId, quantity });
  }

  cart.items = cart.items.filter((item) => item.quantity > 0);
  await cart.save();
  return getCart(userId);
};

export const updateCartItem = async (userId, foodId, itemData = {}) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return null;
  }

  const food = await Food.findById(foodId);
  if (!food) {
    throw ApiError.notFoundError("Food");
  }

  const isExistingFood = cart.items.find((item) => item.foodId.equals(foodId));
  if (!isExistingFood) {
    throw ApiError.notFoundError("Food item in cart");
  }

  if (!isNaN(itemData.quantity) && itemData.quantity) {
    if (itemData.quantity > 0) {
      cart.items = cart.items.map((item) => {
        if (item.foodId.equals(foodId)) {
          item.quantity = parseInt(Number(itemData.quantity));
        }
        return item;
      });
    } else {
      cart.items = cart.items.filter((item) => !item.foodId.equals(foodId));
    }
  }
  if (cart.items.length === 0) {
    await cart.deleteOne();
    return cart;
  } else {
    await cart.save();
    return getCart(userId);
  }
};

export const deleteCartItem = async (userId, foodId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return null;
  }

  const food = await Food.findById(foodId);
  if (!food) {
    throw ApiError.notFoundError("Food");
  }

  const isExistingFood = cart.items.find((item) => item.foodId.equals(foodId));
  if (!isExistingFood) {
    throw ApiError.notFoundError("Food item in cart");
  }

  cart.items = cart.items.filter((item) => !item.foodId.equals(foodId));
  if (cart.items.length === 0) {
    await cart.deleteOne();
    return cart;
  } else {
    await cart.save();
    return getCart(userId);
  }
};

export const deleteCart = async (userId) => {
  const isValidId = mongoose.isValidObjectId(userId);
  if (!isValidId) {
    throw ApiError.badRequestError("Invalid user ID");
  }
  const cart = await Cart.findOneAndDelete({ userId });
  if (!cart) {
    return null;
  }
  return cart;
};
