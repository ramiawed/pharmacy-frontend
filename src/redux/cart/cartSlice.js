import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartWarehouse: [],
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      // check if you order anything from this warehouse
      // if not add it to the cartWarehouse
      if (
        !state.cartWarehouse.includes(action.payload.warehouse.warehouse.name)
      ) {
        state.cartWarehouse = [
          ...state.cartWarehouse,
          action.payload.warehouse.warehouse.name,
        ];
      }

      // check if the item is already in the cart
      const findItem = state.cartItems.find(
        (item) =>
          item.item._id === action.payload.item._id &&
          item.warehouse.warehouse._id ===
            action.payload.warehouse.warehouse._id
      );

      // if the item is already in the cart, replace the item
      if (findItem) {
        const filteredArray = state.cartItems.filter(
          (item) =>
            !(
              item.item._id === action.payload.item._id &&
              item.warehouse.warehouse._id ===
                action.payload.warehouse.warehouse._id
            )
        );

        state.cartItems = [...filteredArray, action.payload];

        // state.cartItems = state.cartItems.map((item) => {
        //   if (
        //     item.item._id === action.payload.item._id &&
        //     item.warehouse.warehouse._id ===
        //       action.payload.warehouse.warehouse._id
        //   ) {
        //     return {
        //       ...item,
        //       qty:
        //         item.warehouse.maxQty !== 0 &&
        //         item.qty + action.payload.qty > item.warehouse.maxQty
        //           ? item.warehouse.maxQty
        //           : item.qty + action.payload.qty,
        //     };
        //   } else {
        //     return item;
        //   }
        // });
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },

    increaseItemQty: (state, action) => {
      const findItem = state.cartItems.find(
        (item) =>
          item.item._id === action.payload.item._id &&
          item.warehouse.warehouse._id ===
            action.payload.warehouse.warehouse._id
      );

      if (findItem) {
        state.cartItems = state.cartItems.map((item) => {
          if (
            item.item._id === action.payload.item._id &&
            item.warehouse.warehouse._id ===
              action.payload.warehouse.warehouse._id
          ) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    },

    decreaseItemQty: (state, action) => {
      const findItem = state.cartItems.find(
        (item) =>
          item.item._id === action.payload.item._id &&
          item.warehouse.warehouse._id ===
            action.payload.warehouse.warehouse._id
      );

      if (findItem) {
        state.cartItems = state.cartItems.map((item) => {
          if (
            item.item._id === action.payload.item._id &&
            item.warehouse.warehouse._id ===
              action.payload.warehouse.warehouse._id
          ) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    },

    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item.item._id === action.payload.item._id &&
            item.warehouse.warehouse._id ===
              action.payload.warehouse.warehouse._id
          )
      );

      const findItemByWarehouse = state.cartItems.find(
        (item) =>
          item.warehouse.warehouse._id ===
          action.payload.warehouse.warehouse._id
      );

      if (!findItemByWarehouse) {
        state.cartWarehouse = state.cartWarehouse.filter(
          (w) => w !== action.payload.warehouse.warehouse.name
        );
      }
    },
    resetCartItems: (state) => {
      state.cartWarehouse = [];
      state.cartItems = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  resetCartItems,
  increaseItemQty,
  decreaseItemQty,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartWarehouse = (state) => state.cart.cartWarehouse;
export const selectCartItemCount = (state) => {
  let total = 0;
  state.cart.cartItems.forEach((item) => (total = total + item.qty));
  return total;
};

export default cartSlice.reducer;
