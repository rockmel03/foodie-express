import { configureStore } from "@reduxjs/toolkit";
import { setAuthConfig } from "../config/axios";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import foodReducer from "../features/food/foodSlice";
import cartReducer from "../features/cart/cartSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    food: foodReducer,
    cart: cartReducer,
  },
});

export default Store;

// set auth config
setAuthConfig(() => Store.getState().auth.token, Store.dispatch);
