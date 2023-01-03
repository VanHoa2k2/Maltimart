import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  favoriteItems: localStorage.getItem("loveItems") ? JSON.parse(localStorage.getItem("loveItems")) : [],
  totalLoveProduct: localStorage.getItem("totalLoveItems") ? JSON.parse(localStorage.getItem("totalLoveItems")) : 0,
};

const favoriteSlice = createSlice({

  name: "favorite",
  initialState,
  reducers: {
    addFavoriteItem: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.favoriteItems.find(
        (item) => item.id === newItem.id
      );

      if(!existingItem) {
        state.favoriteItems.push({
          id: newItem.id,
          imgUrl: newItem.imgUrl,
          productName: newItem.productName,
          category: newItem.category,
          price: newItem.price,
        });
        state.totalLoveProduct++
      }

      localStorage.setItem("loveItems", JSON.stringify(state.favoriteItems))
      localStorage.setItem("totalLoveItems", JSON.stringify(state.totalLoveProduct))
    },

    deleteLoveItem: (state, action) => {
      const id = action.payload
      const existingItem = state.favoriteItems.find(item => item.id === id);

      if(existingItem) {
        state.favoriteItems = state.favoriteItems.filter(item => item.id !== id)
        state.totalLoveProduct = state.totalLoveProduct - 1
      }

      localStorage.setItem("loveItems", JSON.stringify(state.favoriteItems))
      localStorage.setItem("totalLoveItems", JSON.stringify(state.totalLoveProduct))
    },
  }
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice.reducer;
