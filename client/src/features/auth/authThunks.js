import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await Axios.post("/api/v1/users/register", user, {
        signal: thunkAPI.signal,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Register"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const response = await Axios.post("/api/v1/users/login", user, {
        signal: thunkAPI.signal,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Login"
      );
    }
  }
);

export const refreshAuthToken = createAsyncThunk(
  "auth/refresh-token",
  async (_, thunkAPI) => {
    try {
      const response = await Axios.post("/api/v1/users/refresh-token", {
        signal: thunkAPI.signal,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Refresh Token"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await Axios.post("/api/v1/users/logout", {
        signal: thunkAPI.signal,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Logout"
      );
    }
  }
);
