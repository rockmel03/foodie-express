import { createSlice } from "@reduxjs/toolkit";
import {
  getAllFoods,
  getFoodById,
  createNewFood,
  updateFood,
  deleteFood,
} from "./foodThunk";

const initialState = {
  isLoading: false,
  error: null,
  items: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFoods.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllFoods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        /*    console.log("in state ", action.payload?.data) */ if (
          action.payload?.data
        ) {
          if (action.payload.data?.currentPage === 1) {
            state.items = action.payload?.data?.items;
          } else if (action.payload.data?.currentPage > 1) {
            state.items = [...state.items, ...action.payload.data.items];
          }
        }
      })
      .addCase(getAllFoods.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getFoodById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFoodById.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("in state ", action.payload);
        state.error = null;
      })
      .addCase(getFoodById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createNewFood.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log("in state ", action.payload);
        state.items.push(action.payload.data);
      })
      .addCase(createNewFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateFood.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log("in state ", action.payload.data);

        state.items = state.items.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item
        );
      })
      .addCase(updateFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteFood.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("in state ", action.payload);
        state.error = null;
        state.items = state.items.filter(
          (item) => item._id !== action.payload.data._id
        );
      })
      .addCase(deleteFood.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
