import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { persistCart } from './cart/slice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

persistCart(store);
