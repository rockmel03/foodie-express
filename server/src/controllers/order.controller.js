import asyncHandler from "../utils/asyncHandler.js";
import * as orderService from "../services/order.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { addressId, paymentMethod = "online" } = req.body;
  const userId = req.user._id;

  const orderData = await orderService.createOrder({
    userId,
    addressId,
    paymentMethod,
  });

  return res
    .status(201)
    .json(ApiResponse.success(orderData, "Order created successfully"));
});

export const verifyOrderPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const orderData = await orderService.verifyOrderPayment({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  return res
    .status(200)
    .json(ApiResponse.success(orderData, "Payment verified successfully"));
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { limit = "10", page = "1" } = req.query;

  const ordersData = await orderService.getAllOrders({ userId, limit, page });

  return res
    .status(200)
    .json(ApiResponse.success(ordersData, "Orders fetched successfully"));
});

export const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id;

  const orderData = await orderService.getOrderById(orderId);

  return res
    .status(200)
    .json(ApiResponse.success(orderData, "Order fetched successfully"));
});
