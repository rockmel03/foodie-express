import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as CartService from "../services/cart.service.js";

export const addToCart = asyncHandler(async (req, res) => {
  const { foodId, quantity } = req.body;

  const cart = await CartService.addToCart(req.user._id, foodId, quantity);
  return res
    .status(201)
    .json(ApiResponse.success(cart, "Food added to cart successfully", 201));
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const { foodId } = req.params;
  const { quantity } = req.body;

  const cart = await CartService.updateCartItem(req.user._id, foodId, {
    quantity,
  });
  return res
    .status(200)
    .json(ApiResponse.success(cart, "Food updated in cart successfully", 200));
});

export const deleteCartItem = asyncHandler(async (req, res) => {
  const { foodId } = req.params;

  const cart = await CartService.deleteCartItem(req.user._id, foodId);
  return res
    .status(200)
    .json(
      ApiResponse.success(cart, "Food deleted from cart successfully", 200)
    );
});

export const getCart = asyncHandler(async (req, res) => {
  const cart = await CartService.getCart(req.user._id);
  return res
    .status(200)
    .json(ApiResponse.success(cart, "Cart fetched successfully", 200));
});

export const deleteCart = asyncHandler(async (req, res) => {
  const cart = await CartService.deleteCart(req.user._id);
  return res
    .status(200)
    .json(ApiResponse.success(cart, "Cart deleted successfully", 200));
});
