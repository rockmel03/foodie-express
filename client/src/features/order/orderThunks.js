import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ addressId, paymentMethod = "online" }, thunkAPI) => {
    try {
      const response = await Axios.post(
        "/api/v1/orders/",
        {
          addressId,
          paymentMethod,
        },
        {
          signal: thunkAPI.signal,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to create order"
      );
    }
  }
);

export const verifyOrderPayment = createAsyncThunk(
  "order/verifyOrderPayment",
  async (
    { razorpay_order_id, razorpay_payment_id, razorpay_signature },
    thunkAPI
  ) => {
    try {
      const response = await Axios.post(
        "/api/v1/orders/verify",
        {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
        {
          signal: thunkAPI.signal,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to verify order payment"
      );
    }
  }
);
