import Axios from "../../config/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCategories = createAsyncThunk(
  "category/get-all",
  async (data, thunkApi) => {
    try {
      const response = await Axios.get("/api/v1/categories", {
        signal: thunkApi.signal,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to get categories"
      );
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "category/get",
  async (id, thunkApi) => {
    try {
      const response = await Axios.get(`/api/v1/categories/${id}`, {
        signal: thunkApi.signal,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to get categories"
      );
    }
  }
);

export const createNewCategory = createAsyncThunk(
  "category/create",
  async (data, thunkApi) => {
    console.log("create new category data", data);
    try {
      const response = await Axios.post(`/api/v1/categories`, data, {
        signal: thunkApi.signal,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ([id, data], thunkApi) => {
    console.log(data.get("image"));
    try {
      const response = await Axios.patch(`/api/v1/categories/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        signal: thunkApi.signal,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to update category"
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, thunkApi) => {
    try {
      const response = await Axios.delete(`/api/v1/categories/${id}`, {
        signal: thunkApi.signal,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to update category"
      );
    }
  }
);
