import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCategories,
  getCategoryById,
  createNewCategory,
  updateCategory,
  deleteCategory,
} from "./categoryThunks";

const initialState = {
  isLoading: false,
  error: null,
  items: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
     /*    console.log("in state ", action.payload?.data) */;

        if (action.payload?.data) {
          if (action.payload.data?.currentPage === 1) {
            state.items = action.payload?.data?.items;
          } else if (action.payload.data?.currentPage > 1) {
            state.items = [...state.items, ...action.payload.data.items];
          }
        }
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getCategoryById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("in state ", action.payload);
        state.error = null;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createNewCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log("in state ", action.payload);
        state.items.push(action.payload);
      })
      .addCase(createNewCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log("in state ", action.payload);

        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("in state ", action.payload);
        state.error = null;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
