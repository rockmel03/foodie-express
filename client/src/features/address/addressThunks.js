import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../config/axios/index.js";

export const getAddresses = createAsyncThunk(
  "address/getAddresses",
  async (_,thunkAPI) => {
    try {
      const response = await Axios.get("/api/v1/addresses", {
        signal: thunkAPI.signal,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to get addresses"
      );
    }
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (address, thunkAPI) => {
    try {
      const response = await Axios.post("/api/v1/addresses", address, {
        signal: thunkAPI.signal,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to add address"
      );
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (address, thunkAPI) => {
    try {
      const response = await Axios.put(
        `/api/v1/addresses/${address._id}`,
        address,
        {
          signal: thunkAPI.signal,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to update address"
      );
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, thunkAPI) => {
    try {
      const response = await Axios.delete(`/api/v1/addresses/${addressId}`, {
        signal: thunkAPI.signal,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to delete address"
      );
    }
  }
);
