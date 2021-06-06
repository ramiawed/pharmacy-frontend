import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";

import authSlice from "./redux/auth/authSlice";
import usersSlice from "./redux/users/usersSlice";
import companiesSlice from "./redux/company/companySlice";
import favoritesSlice from "./redux/favorites/favoritesSlice";
import warehousesSlice from "./redux/warehouse/warehousesSlice";
import categoriesSlice from "./redux/categories/categoriesSlice";
import itemTypesSlice from "./redux/itemTypes/itemTypesSlice";
import itemsSlice from "./redux/items/itemsSlices";

const reducers = combineReducers({
  auth: authSlice,
  users: usersSlice,
  companies: companiesSlice,
  warehouses: warehousesSlice,
  favorites: favoritesSlice,
  categories: categoriesSlice,
  itemTypes: itemTypesSlice,
  items: itemsSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
