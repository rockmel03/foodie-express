import { createSlice } from "@reduxjs/toolkit";
import {
  getCart,
  deleteCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
} from "./cartThunks";

const setloadingState = (state) => {
  state.isLoading = true;
  state.error = null;
};

const setErrorState = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  isLoading: false,
  error: null,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, setloadingState)
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data?.items || [];
      })
      .addCase(getCart.rejected, setErrorState);

    builder
      .addCase(deleteCart.pending, setloadingState)
      .addCase(deleteCart.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.items = [];
      })
      .addCase(deleteCart.rejected, setErrorState);

    builder
      .addCase(addToCart.pending, setloadingState)
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data?.items || [];
      })
      .addCase(addToCart.rejected, setErrorState);

    builder
      .addCase(updateCartItem.pending, setloadingState)
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data?.items || [];
      })
      .addCase(updateCartItem.rejected, setErrorState);

    builder
      .addCase(deleteCartItem.pending, setloadingState)
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data?.items || [];
      })
      .addCase(deleteCartItem.rejected, setErrorState);
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
