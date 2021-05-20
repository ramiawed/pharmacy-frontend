import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";

import userSlice from "./redux/user/userSlice";

const reducers = combineReducers({
  user: userSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
