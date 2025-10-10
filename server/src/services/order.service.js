import Order from "../models/order.model.js";
import mongoose from "mongoose";

import * as cartService from "./cart.service.js";
import * as paymentService from "./payment.service.js";
import * as addressService from "./address.service.js";

import ApiError from "../utils/ApiError.js";
import Payment from "../models/payment.model.js";

export const createOrder = async ({ userId, paymentMethod, addressId }) => {
  const session = await mongoose.startSession();
  const useTransactions = process.env.NODE_ENV === "production";
  
  if (useTransactions) {
    session.startTransaction();
  }

  try {
    const cart = await cartService.getCart(userId);

    if (!cart || cart.items.length === 0) {
      throw new ApiError("Cart is empty");
    }

    const address = await addressService.getAddressById(addressId);

    if (!address || address.userId.toString() !== userId) {
      throw new ApiError(400, "Invalid address");
    }

    let total = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const food = item.food;
      if (!food.isActive || (food.quantity && food.quantity < item.quantity)) {
        throw new Error(
          `${food.title} is not available in the requested quantity`
        );
      }
      const discountedPrice =
        food.price - (food.price * (food.discount || 0)) / 100;
      total += discountedPrice * item.quantity;
      orderItems.push({
        foodId: food._id,
        quantity: item.quantity,
        price: discountedPrice,
        discount: food.discount || 0,
      });
    }

    // Create order with pending status
    const order = new Order({
      userId,
      items: orderItems,
      total,
      status: "pending",
      addressId: address._id,
    });

    await order.save({ session });

    if (paymentMethod === "online") {
      const razorpayOrder = await paymentService.createRazorpayOrder({
        amount: total,
        currency: "INR",
      });

      const payment = new Payment({
        orderId: order._id,
        amount: total,
        currency: "INR",
        status: "pending",
        paymentMethod: "razorpay",
        razorpayOrderId: razorpayOrder.id,
      });

      await payment.save({ session });

      order.paymentId = payment._id;
      await order.save({ session });

      if (useTransactions) {
        await session.commitTransaction();
      }
      session.endSession();

      const dataToSend = order.toObject();
      dataToSend.payment = payment.toObject();
      return dataToSend;
    } else {
      const payment = new Payment({
        orderId: order._id,
        amount: total,
        status: "pending",
        paymentMethod: "cod",
      });
      await payment.save({ session });

      order.paymentId = payment._id;
      order.status = "confirmed";
      await order.save({ session });

      if (useTransactions) {
        await session.commitTransaction();
      }
      session.endSession();

      const dataToSend = order.toObject();
      dataToSend.payment = payment.toObject();
      return dataToSend;
    }
  } catch (error) {
    if (useTransactions) {
      await session.abortTransaction();
    }
    session.endSession();
    console.log(error);
    throw new ApiError(
      500,
      process.env.NODE_ENV === "development"
        ? error.message
        : "Failed to create order"
    );
  }
};

export const verifyOrderPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  const session = await mongoose.startSession();

  const useTransactions = process.env.NODE_ENV === "production";

  if (useTransactions) {
    session.startTransaction();
  }

  try {
    const paymentStatus = await paymentService.verifyRazorpayPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!paymentStatus) {
      throw new ApiError(400, "Payment verification failed");
    }

    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id,
    }).session(session);

    if (!payment) {
      throw new ApiError(400, "Payment not found");
    }

    payment.status = "success";
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    await payment.save(useTransactions ? { session } : undefined);

    const order = await Order.findByIdAndUpdate(
      payment.orderId,
      { status: "confirmed" },
      { new: true, session: useTransactions ? session : undefined }
    ).populate("items.foodId");

    // clear cart
    await cartService.deleteCart(order.userId);

    if (useTransactions) {
      await session.commitTransaction();
    }
    session.endSession();

    // Todo: Send confirmation email
    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Payment verification failed:", error);
    throw new ApiError(
      500,
      process.env.NODE_ENV === "development"
        ? error.message
        : "Failed to verify payment"
    );
  }
};
