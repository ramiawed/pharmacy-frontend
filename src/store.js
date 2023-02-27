import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";

import authSlice from "./redux/auth/authSlice";
import usersSlice from "./redux/users/usersSlice";
import companiesSlice from "./redux/company/companySlice";
import favoritesSlice from "./redux/favorites/favoritesSlice";
import warehousesSlice from "./redux/warehouse/warehousesSlice";
import itemsSlice from "./redux/items/itemsSlices";
import cartSlice from "./redux/cart/cartSlice";
import statisticsSlice from "./redux/statistics/statisticsSlice";
import onlineSlice from "./redux/online/onlineSlice";
import settingsSlice from "./redux/settings/settingsSlice";
import companiesSectionOneSlice from "./redux/advertisements/companiesSectionOneSlice";
import companiesSectionTwoSlice from "./redux/advertisements/companiesSectionTwoSlice";
import warehousesSectionOneSlice from "./redux/advertisements/warehousesSectionOneSlice";
import itemsSectionOneSlice from "./redux/advertisements/itemsSectionOneSlice";
import itemsSectionTwoSlice from "./redux/advertisements/itemsSectionTwoSlice";
import itemsSectionThreeSlice from "./redux/advertisements/itemsSectionThreeSlice";
import medicinesSlice from "./redux/medicines/medicinesSlices";
import ordersSlice from "./redux/orders/ordersSlice";
import advertisementsSlice from "./redux/advertisements/advertisementsSlice";
import NotificationsSlice from "./redux/notifications/notificationsSlice";
import UserNotificationsSlice from "./redux/userNotifications/userNotificationsSlice";
import navigationSlice from "./redux/navs/navigationSlice";
import itemsWithOffersSlice from "./redux/itemsWithOffer/itemsWithOffersSlices";
import savedItemsSlice from "./redux/savedItems/savedItemsSlice";
import basketsSlice from "./redux/baskets/basketsSlice";
import itemsWithPointsSlice from "./redux/itemsWithPoints/itemsWithPointsSlices";

const reducers = combineReducers({
  auth: authSlice,
  users: usersSlice,
  companies: companiesSlice,
  warehouses: warehousesSlice,
  favorites: favoritesSlice,
  items: itemsSlice,
  medicines: medicinesSlice,
  cart: cartSlice,
  statistics: statisticsSlice,
  online: onlineSlice,
  companiesSectionOne: companiesSectionOneSlice,
  companiesSectionTwo: companiesSectionTwoSlice,
  warehousesSectionOne: warehousesSectionOneSlice,
  itemsSectionOne: itemsSectionOneSlice,
  itemsSectionTwo: itemsSectionTwoSlice,
  itemsSectionThree: itemsSectionThreeSlice,
  settings: settingsSlice,
  orders: ordersSlice,
  advertisements: advertisementsSlice,
  notifications: NotificationsSlice,
  userNotifications: UserNotificationsSlice,
  navigationSlice: navigationSlice,
  itemsWithOffers: itemsWithOffersSlice,
  savedItems: savedItemsSlice,
  baskets: basketsSlice,
  itemsWithPoints: itemsWithPointsSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "settings", "items", "advertisements"],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
