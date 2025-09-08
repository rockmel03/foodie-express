import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import { setAuthConfig } from "../config/axios";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
});

export default Store;

// set auth config
setAuthConfig(() => Store.getState().auth.token, Store.dispatch);
