import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    step: 1,
    shippingDetails: null,
    paymentDetails: null,
    orderId: null,
    status: "idle",
  },
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setShippingDetails: (state, action) => {
      state.shippingDetails = action.payload;
    },
    setPaymentDetails: (state, action) => {
      state.paymentDetails = action.payload;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    resetCheckout: (state) => {
      state.step = 1;
      state.shippingDetails = null;
      state.paymentDetails = null;
      state.orderId = null;
      state.status = "idle";
    },
  },
});

export const {
  setStep,
  setShippingDetails,
  setPaymentDetails,
  setOrderId,
  resetCheckout,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
