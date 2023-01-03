import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  totalAmount: localStorage.getItem("totalAmountItems") ? JSON.parse(localStorage.getItem("totalAmountItems")) : 0,
  totalQuantity: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
};

const cartSlice = createSlice({

  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      state.totalQuantity = state.totalQuantity + newItem.quantity


      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity = existingItem.quantity + newItem.quantity;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),0
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      localStorage.setItem("totalAmountItems", JSON.stringify(state.totalAmount))
      localStorage.setItem("totalItems", JSON.stringify(state.totalQuantity))
    },

    minusQty: (state, action) => {
      const id = action.payload
      const existingItem = state.cartItems.find(item => item.id === id);
      if(existingItem) {
        if(existingItem.quantity > 1) {
          existingItem.quantity--
          state.totalQuantity--
        } else {
          existingItem.quantity = 1
        }
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      localStorage.setItem("totalAmountItems", JSON.stringify(state.totalAmount))
      localStorage.setItem("totalItems", JSON.stringify(state.totalQuantity))
    },

    addQty: (state, action) => {
      const id = action.payload
      const existingItem = state.cartItems.find(item => item.id === id);
      if(existingItem) {
        existingItem.quantity++
        state.totalQuantity++
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      localStorage.setItem("totalAmountItems", JSON.stringify(state.totalAmount))
      localStorage.setItem("totalItems", JSON.stringify(state.totalQuantity))
    },

    deleteItem: (state, action) => {
      const id = action.payload
      const existingItem = state.cartItems.find(item => item.id === id);

      if(existingItem) {
        state.cartItems = state.cartItems.filter(item => item.id !== id)
        state.totalQuantity = state.totalQuantity - existingItem.quantity
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),0
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      localStorage.setItem("totalAmountItems", JSON.stringify(state.totalAmount))
      localStorage.setItem("totalItems", JSON.stringify(state.totalQuantity))
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
