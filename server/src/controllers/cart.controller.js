import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import z from "zod";
import * as CartService from "../services/cart.service.js";

export const addToCart = asyncHandler(async (req, res) => {
  const { foodId, quantity } = req.body;

  const cart = await CartService.addToCart(req.user._id, foodId, quantity);
  return res
    .status(201)
    .json(ApiResponse.success(cart, "Food added to cart successfully", 201));
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const { foodId, quantity } = req.body;

  const cart = await CartService.removeFromCart(req.user._id, foodId, quantity);
  return res
    .status(200)
    .json(
      ApiResponse.success(cart, "Food removed from cart successfully", 200)
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
