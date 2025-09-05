import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
});

export default Store;
