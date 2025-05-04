import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity(state, action) {
        const { id, quantity } = action.payload;
        const item = state.items.find(i => i.id === id);
        if (item && quantity > 0) {
          item.quantity = quantity;
        }
      },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  } = cartSlice.actions;
  

export default cartSlice.reducer;

// Функция для сохранения корзины в localStorage
export const persistCart = (store) => {
  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("cartItems", JSON.stringify(state.cart.items));
  });
};
