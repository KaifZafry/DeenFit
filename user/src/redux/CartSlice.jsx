import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : { cartItems: [] };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialCart(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) =>
          item.product_id === action.payload.product_id &&
          item.size === action.payload.size // 👈 also check size
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) =>
          item.product_id !== action.payload.product_id ||
          item.size !== action.payload.size
      );
    },
    incrementQty: (state, action) => {
      const item = state.cartItems.find((i) => i.product_id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQty: (state, action) => {
      const item = state.cartItems.find((i) => i.product_id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart"); // 🧹 clear from localStorage also
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
