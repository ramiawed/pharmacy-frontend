import { createSlice } from "@reduxjs/toolkit";
import { OfferTypes } from "../../utils/constants";

const initialState = {
  cartWarehouse: [],
  cartItems: [],
};

const calculateOfferQty = (selectedWarehouse, qty) => {
  // check if the specified warehouse has an offer
  if (selectedWarehouse?.offer.offers.length > 0) {
    // through all the offers, check if the entered quantity has an offer
    for (let i = 0; i < selectedWarehouse.offer.offers.length; i++) {
      // check if the entered quantity has an offer
      if (qty >= selectedWarehouse.offer.offers[i].qty) {
        // if it has return:
        // 1- mode of the offer (pieces, percentage)
        // 2- bonus
        // 2-1: if the mode is pieces return the bonus * (entered qty / bonus qty)
        // 2-2: if the mode is percentage return the bonus
        if (selectedWarehouse.offer.mode === OfferTypes.PERCENTAGE) {
          return selectedWarehouse.offer.offers[i].bonus;
        } else {
          return (
            selectedWarehouse.offer.offers[i].bonus +
            calculateOfferQty(
              selectedWarehouse,
              qty - selectedWarehouse.offer.offers[i].qty
            )
          );
        }
      }
    }
  }

  return 0;
};

const calculatePoints = (selectedWarehouse, qty) => {
  // check if the specified warehouse has an offer
  if (selectedWarehouse?.points?.length > 0) {
    // through all the offers, check if the entered quantity has an offer
    for (let i = 0; i < selectedWarehouse.points.length; i++) {
      // check if the entered quantity has an offer
      if (qty >= selectedWarehouse.points[i].qty) {
        return (
          selectedWarehouse.points[i].bonus +
          calculatePoints(
            selectedWarehouse,
            qty - selectedWarehouse.points[i].qty
          )
        );
      }
    }
  }

  return 0;
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      // destructing field from action.payload
      const { item, warehouse, qty } = action.payload;
      const bonusQty = calculateOfferQty(warehouse, qty);

      const addedItem = {
        ...action.payload,
        bonus: bonusQty,
        bonusType: bonusQty > 0 ? warehouse.offer.mode : null,
        point: calculatePoints(warehouse, qty),
      };

      // check if you order anything from this warehouse
      // if not add it to the cartWarehouse
      if (
        !state.cartWarehouse
          .map((w) => w.name)
          .includes(action.payload.warehouse.warehouse.name)
      ) {
        state.cartWarehouse = [...state.cartWarehouse, warehouse.warehouse];
      }

      // check if the item is already in the cart
      const findItem = state.cartItems.find(
        (i) =>
          i.item._id === item._id &&
          i.warehouse.warehouse._id === warehouse.warehouse._id
      );

      // if the item is already in the cart, replace the item
      if (findItem) {
        const filteredArray = state.cartItems.filter(
          (i) =>
            !(
              i.item._id === item._id &&
              i.warehouse.warehouse._id === warehouse.warehouse._id
            )
        );

        state.cartItems = [...filteredArray, addedItem];
      } else {
        // if the item is not in the cart, add it to cart
        state.cartItems = [...state.cartItems, addedItem];
      }
    },

    increaseItemQty: (state, action) => {
      // destructing fields from action.payload
      const { item, warehouse } = action.payload;

      // if the item is in the cart, add one to its quantity
      state.cartItems = state.cartItems.map((i) => {
        if (
          i.item._id === item._id &&
          i.warehouse.warehouse._id === warehouse.warehouse._id
        ) {
          const bonusQty = calculateOfferQty(warehouse, i.qty + 1);

          return {
            ...i,
            qty: i.qty * 1 + 1,
            bonus: bonusQty,
            bonusType: bonusQty > 0 ? warehouse.offer.mode : null,
            point: calculatePoints(warehouse, i.qty + 1),
          };
        } else {
          return i;
        }
      });
    },

    decreaseItemQty: (state, action) => {
      // destructing fields from action.payload
      const { item, warehouse } = action.payload;

      // if the item is in the cart, add one to its quantity
      state.cartItems = state.cartItems.map((i) => {
        if (
          i.item._id === item._id &&
          i.warehouse.warehouse._id === warehouse.warehouse._id
        ) {
          const bonusQty = calculateOfferQty(warehouse, i.qty - 1);

          return {
            ...i,
            qty: i.qty * 1 - 1,
            bonus: bonusQty,
            bonusType: bonusQty > 0 ? warehouse.offer.mode : null,
            point: calculatePoints(warehouse, i.qty - 1),
          };
        } else {
          return i;
        }
      });
    },

    removeItemFromCart: (state, action) => {
      // destructing fields from action.payload
      const {
        item: { _id: itemId },
        warehouse: {
          warehouse: { _id: warehouseId, name: warehouseName },
        },
      } = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item.item._id === itemId &&
            item.warehouse.warehouse._id === warehouseId
          )
      );

      const findItemByWarehouse = state.cartItems.find(
        (item) => item.warehouse.warehouse._id === warehouseId
      );

      if (!findItemByWarehouse) {
        state.cartWarehouse = state.cartWarehouse.filter(
          (w) => w.name !== warehouseName
        );
      }
    },

    resetCartItems: (state, action) => {
      state.cartWarehouse = state.cartWarehouse.filter(
        (w) => w.name !== action.payload.name
      );
      state.cartItems = state.cartItems.filter(
        (item) => item.warehouse.warehouse.name !== action.payload.name
      );
    },
    cartSliceSignOut: (state) => {
      state.cartItems = [];
      state.cartWarehouse = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  resetCartItems,
  increaseItemQty,
  decreaseItemQty,
  cartSliceSignOut,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartWarehouse = (state) => state.cart.cartWarehouse;
export const selectCartItemCount = (state) => {
  let total = 0;
  state.cart.cartItems.forEach(
    (item) => (total = Number.parseInt(total) + Number.parseInt(item.qty))
  );
  return total;
};

export default cartSlice.reducer;
