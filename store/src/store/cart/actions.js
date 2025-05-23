export const selectCart = (state) => state.cart.items;
export const selectCartItemsCount = state =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
