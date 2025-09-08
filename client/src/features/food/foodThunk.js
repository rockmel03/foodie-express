import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";

export const getAllFoods = createAsyncThunk(
  "food/getAllFoods",
  async (query, thunkApi) => {
    const queryParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      queryParams.append(key, value);
    });

    try {
      const response = await Axios.get(
        `/api/v1/foods?${queryParams.toString()}`,
        {
          signal: thunkApi.signal,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to get food items"
      );
    }
  }
);

export const getFoodById = createAsyncThunk(
  "food/getFoodById",
  async (id, thunkApi) => {
    try {
      const response = await Axios.get(`/api/v1/foods/${id}`, {
        signal: thunkApi.signal,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to get food item"
      );
    }
  }
);

export const createNewFood = createAsyncThunk(
  "food/createNewFood",
  async (data, thunkApi) => {
    try {
      const response = await Axios.post("/api/v1/foods", data, {
        signal: thunkApi.signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to create food item"
      );
    }
  }
);

export const updateFood = createAsyncThunk(
  "food/updateFood",
  async ([id, data], thunkApi) => {
    try {
      const response = await Axios.patch(`/api/v1/foods/${id}`, data, {
        signal: thunkApi.signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to update food item"
      );
    }
  }
);
export const deleteFood = createAsyncThunk(
  "food/deleteFood",
  async (id, thunkApi) => {
    try {
      const response = await Axios.delete(`/api/v1/foods/${id}`, {
        signal: thunkApi.signal,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to delete food item"
      );
    }
  }
);
