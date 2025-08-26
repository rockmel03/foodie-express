import Cart from "../models/cart.model.js";
import ApiError from "../utils/ApiError.js";
import Food from "../models/food.model.js";

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
    return newCart;
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
  return cart;
};

export const removeFromCart = async (userId, foodId, quantity = 1) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return null;
  }

  const food = await Food.findById(foodId);
  if (!food) {
    throw ApiError.notFoundError("Food");
  }

  const isExistingFood = cart.items.find((item) => item.foodId.equals(foodId));
  if (isExistingFood) {
    if (isExistingFood.quantity <= quantity) {
      cart.items = cart.items.filter((item) => !item.foodId.equals(foodId));
    } else {
      cart.items = cart.items.map((item) => {
        if (item.foodId.equals(foodId)) {
          item.quantity -= quantity;
        }
        return item;
      });
    }
    cart.items = cart.items.filter((item) => item.quantity > 0);
  }
  if (cart.items.length === 0) {
    await cart.deleteOne();
    return cart;
  } else {
    await cart.save();
    return cart;
  }
};

export const getCart = async (userId) => {
  const isValidId = mongoose.isValidObjectId(userId);
  if (!isValidId) {
    throw ApiError.badRequestError("Invalid user ID");
  }
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return null;
  }
  return cart;
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
