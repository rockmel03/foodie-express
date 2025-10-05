import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios/";

export const createPaymentOrder = createAsyncThunk(
  "payment/createPaymentOrder",
  async (_, thunkApi) => {
    try {
      const response = await Axios.post(
        "/api/v1/payments/order",
        {},
        {
          signal: thunkApi.signal,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to create payment order"
      );
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (
    { razorpay_order_id, razorpay_payment_id, razorpay_signature },
    thunkApi
  ) => {
    try {
      const response = await Axios.post(
        "/api/v1/payments/verify",
        {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
        {
          signal: thunkApi.signal,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to verify payment"
      );
    }
  }
);
