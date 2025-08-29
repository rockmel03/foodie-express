import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  refreshAuthToken,
  registerUser,
} from "./authThunks";

import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const initialState = {
  isLoading: false,
  error: null,
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error=null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.isLoading = false;
      state.error = null;
      if (data) {
        state.isAuthenticated = true;
        state.token = data.accessToken;
        const decodedToken = decodeToken(data.accessToken);
        if (decodedToken) {
          state.user = decodedToken.user;
        }
      }
    });
    builder
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.isLoading = false;
        state.error = null;
        if (data) {
          state.isAuthenticated = true;
          state.token = data.accessToken;
          const decodedToken = decodeToken(data.accessToken);
          if (decodedToken) {
            state.user = decodedToken.user;
          }
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(refreshAuthToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.isLoading = false;
        state.error = null;
        if (data) {
          state.isAuthenticated = true;
          state.token = data.accessToken;
          const decodedToken = decodeToken(data.accessToken);
          if (decodedToken) {
            state.user = decodedToken.user;
          }
        }
      })
      .addCase(refreshAuthToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export const {} = authSlice.actions;
export default authSlice.reducer;

export const useAuth = () => useSelector((state) => state.auth);