// src/redux/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: JSON.parse(localStorage.getItem('wishlistItems')) || [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlistItem: (state, action) => {
      const item = action.payload;
      const index = state.wishlistItems.findIndex(
        (i) => i.product_id === item.product_id
      );

      if (index >= 0) {
        // Item exists — remove
        state.wishlistItems.splice(index, 1);
      } else {
        // Item doesn't exist — add
        state.wishlistItems.push(item);
      }

      localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
    },
  },
});

export const { toggleWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
