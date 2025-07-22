import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import categoryReducer from './categorySlice'

import wishlistReducer from './WishListSlice'

// Save cart state to localStorage on every update
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.cart);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.warn('Error saving cart to localStorage', e);
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    category:categoryReducer,
  },
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
