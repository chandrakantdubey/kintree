import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";
import checkoutSlice from "./checkoutSlice";
import postReducer from "./postSlice";
import familyTreeReducer from "./familyTreeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    chat: chatReducer,
    checkout: checkoutSlice,
    posts: postReducer,
    familyTree: familyTreeReducer,
  },
});
