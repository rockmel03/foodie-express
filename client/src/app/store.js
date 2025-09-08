import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import { setAuthConfig } from "../config/axios";
import foodReducer from "../features/food/foodSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    food: foodReducer,
  },
});

export default Store;

// set auth config
setAuthConfig(() => Store.getState().auth.token, Store.dispatch);
