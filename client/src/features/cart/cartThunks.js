import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";

export const getCart = createAsyncThunk("cart/get", async (_, thunkApi) => {
  try {
    const response = await Axios.get("/api/v1/cart", {
      signal: thunkApi.signal,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkApi.rejectWithValue(
      error.response?.data?.message || "Failed to get cart"
    );
  }
});

export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (_, thunkApi) => {
    try {
      const response = await Axios.delete("/api/v1/cart", {
        signal: thunkApi.signal,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to delete cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, thunkApi) => {
    try {
      const response = await Axios.post("/api/v1/cart", data, {
        signal: thunkApi.signal,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (data, thunkApi) => {
    try {
      const response = await Axios.delete(
        "/api/v1/cart/remove-from-cart",
        data,
        {
          signal: thunkApi.signal,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to remove from cart"
      );
    }
  }
);
