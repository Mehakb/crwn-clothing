import { createSelector } from "reselect";

const selectCart = state => state.cart;
export const selectCartItems = createSelector([selectCart], cart => cart.cartitems);

export const selectCartItemsCount = createSelector([selectCartItems], cartItems => cartItems.reduce((accumaltedQuantity, cartItem) => accumaltedQuantity + cartItem.quantity, 0))