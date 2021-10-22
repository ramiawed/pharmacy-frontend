import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";

import authSlice from "./redux/auth/authSlice";
import usersSlice from "./redux/users/usersSlice";
import companiesSlice from "./redux/company/companySlice";
import favoritesSlice from "./redux/favorites/favoritesSlice";
import warehousesSlice from "./redux/warehouse/warehousesSlice";
import itemsSlice from "./redux/items/itemsSlices";
import companyItemsSlice from "./redux/companyItems/companyItemsSlices";
import warehouseItemsSlices from "./redux/warehouseItems/warehouseItemsSlices";
import cartSlice from "./redux/cart/cartSlice";
import statisticsSlice from "./redux/statistics/statisticsSlice";
import onlineSlice from "./redux/online/onlineSlice";
import settingsSlice from "./redux/settings/settingsSlice";
import companiesSectionOneSlice from "./redux/advertisements/companiesSectionOneSlice";
import companiesSectionTwoSlice from "./redux/advertisements/companiesSectionTwoSlice";
import itemsSectionOneSlice from "./redux/advertisements/itemsSectionOneSlice";
import itemsSectionTwoSlice from "./redux/advertisements/itemsSectionTwoSlice";
import itemsSectionThreeSlice from "./redux/advertisements/itemsSectionThreeSlice";
import medicinesSlice from "./redux/medicines/medicinesSlices";
import ordersSlice from "./redux/orders/ordersSlice";

const reducers = combineReducers({
  auth: authSlice,
  users: usersSlice,
  companies: companiesSlice,
  warehouses: warehousesSlice,
  favorites: favoritesSlice,
  items: itemsSlice,
  companyItems: companyItemsSlice,
  medicines: medicinesSlice,
  warehouseItems: warehouseItemsSlices,
  cart: cartSlice,
  statistics: statisticsSlice,
  online: onlineSlice,
  companiesSectionOne: companiesSectionOneSlice,
  companiesSectionTwo: companiesSectionTwoSlice,
  itemsSectionOne: itemsSectionOneSlice,
  itemsSectionTwo: itemsSectionTwoSlice,
  itemsSectionThree: itemsSectionThreeSlice,
  settings: settingsSlice,
  orders: ordersSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "settings"],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
