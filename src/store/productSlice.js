// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const response = await axios.get("https://fakestoreapi.com/products");
//     return response.data;
//   },
// );

// const productSlice = createSlice({
//   name: "products",
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default productSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { products } from "../data/product";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: products,
    filteredItems: products,
    selectedCategory: "All",
    loading: false,
    error: null,
  },
  reducers: {
    filterByCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredItems =
        action.payload === "All"
          ? state.items
          : state.items.filter((item) => item.category === action.payload);
    },
    sortProducts: (state, action) => {
      switch (action.payload) {
        case "price-low":
          state.filteredItems.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          state.filteredItems.sort((a, b) => b.price - a.price);
          break;
        default:
          state.filteredItems = [...state.items];
      }
    },
  },
});

export const { filterByCategory, sortProducts } = productSlice.actions;
export default productSlice.reducer;
