import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { BASEURL } from "../../utils/constants";

const initialState = {
  favoritesItemsStatus: "idle",
  favoritesItemsError: "",
  addFavoritesItemsStatus: "",
  addFavoritesItemsError: "",
  removeFavoritesItemsStatus: "idle",
  removeFavoritesItemsError: "",
  favoritesItems: [],
  count: 0,
};

let CancelToken;
let source;

export const getFavoritesItems = createAsyncThunk(
  "advertisement/favoritesItems",
  async ({ token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.get(
        `${BASEURL}/items?isActive=true&isFavorite=true&page=1&limit=25`,
        {
          timeout: 10000,
          cancelToken: source.token,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      if (err.code === "ECONNABORTED" && err.message.startsWith("timeout")) {
        return rejectWithValue("timeout");
      }
      if (axios.isCancel(err)) {
        return rejectWithValue("cancel");
      }

      if (!err.response) {
        return rejectWithValue("network failed");
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const addToFavoritesItems = createAsyncThunk(
  "advertisement/addToFavoritesItems",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      console.log("items");

      const response = await axios.post(
        `${BASEURL}/items/item/${id}`,
        {
          isFavorite: true,
        },
        {
          timeout: 10000,
          cancelToken: source.token,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      if (err.code === "ECONNABORTED" && err.message.startsWith("timeout")) {
        return rejectWithValue("timeout");
      }
      if (axios.isCancel(err)) {
        return rejectWithValue("cancel");
      }

      if (!err.response) {
        return rejectWithValue("network failed");
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const removeFromFavoritesItems = createAsyncThunk(
  "advertisement/removeFromFavoritesItems",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/items/item/${id}`,
        {
          isFavorite: false,
        },
        {
          timeout: 10000,
          cancelToken: source.token,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      if (err.code === "ECONNABORTED" && err.message.startsWith("timeout")) {
        return rejectWithValue("timeout");
      }
      if (axios.isCancel(err)) {
        return rejectWithValue("cancel");
      }

      if (!err.response) {
        return rejectWithValue("network failed");
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const favoritesItemsSlice = createSlice({
  name: "favoritesItems",
  initialState,
  reducers: {
    resetFavoritesItemsStatus: (state) => {
      state.favoritesItemsStatus = "idle";
      state.favoritesItemsError = "";
    },

    resetFavoritesItemsError: (state) => {
      state.favoritesItemsError = "";
    },

    resetAddFavoritesItemsStatus: (state) => {
      state.addFavoritesItemsStatus = "idle";
      state.addFavoritesItemsError = "";
    },

    resetAddFavoritesItemsError: (state) => {
      state.addFavoritesItemsError = "";
    },

    resetRemoveFavoritesItemsStatus: (state) => {
      state.removeFavoritesItemsStatus = "idle";
      state.removeFavoritesItemsError = "";
    },

    resetRemoveFavoritesItemsError: (state) => {
      state.removeFavoritesItemsError = "";
    },

    resetFavoritesItems: (state) => {
      state.favoritesItemsStatus = "idle";
      state.favoritesItemsError = "";
      state.addFavoritesItemsStatus = "idle";
      state.addFavoritesItemsError = "";
      state.removeFavoritesItemsStatus = "idle";
      state.removeFavoritesItemsError = "";
      state.favoritesItems = [];
      state.count = 0;
    },
  },

  extraReducers: {
    [getFavoritesItems.pending]: (state) => {
      state.favoritesItemsStatus = "loading";
    },
    [getFavoritesItems.fulfilled]: (state, action) => {
      state.favoritesItemsStatus = "succeeded";
      state.favoritesItems = action.payload.data.items;
      state.favoritesItemsError = "";
    },
    [getFavoritesItems.rejected]: (state, { payload }) => {
      state.favoritesItemsStatus = "failed";

      if (payload === "timeout") {
        state.favoritesItemsError = "timeout-msg";
      } else if (payload === "cancel") {
        state.favoritesItemsError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.favoritesItemsError = "network failed";
      } else state.favoritesItemsError = payload.message;
    },

    [addToFavoritesItems.pending]: (state) => {
      state.addFavoritesItemsStatus = "loading";
    },
    [addToFavoritesItems.fulfilled]: (state, action) => {
      state.addFavoritesItemsStatus = "succeeded";
      state.addFavoritesItemsError = "";
      state.favoritesItems = [
        ...state.favoritesItems,
        action.payload.data.item,
      ];
    },
    [addToFavoritesItems.rejected]: (state, { payload }) => {
      state.addFavoritesItemsStatus = "failed";

      if (payload === "timeout") {
        state.addFavoritesItemsError = "timeout-msg";
      } else if (payload === "cancel") {
        state.addFavoritesItemsError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.addFavoritesItemsError = "network failed";
      } else state.addFavoritesItemsError = payload.message;
    },

    [removeFromFavoritesItems.pending]: (state) => {
      state.removeFavoritesItemsStatus = "loading";
    },
    [removeFromFavoritesItems.fulfilled]: (state, action) => {
      state.removeFavoritesItemsStatus = "succeeded";
      state.removeFavoritesItemsError = "";
      state.favoritesItems = state.favoritesItems.filter(
        (item) => item._id !== action.payload.data.item._id
      );
    },
    [removeFromFavoritesItems.rejected]: (state, { payload }) => {
      state.removeFavoritesItemsStatus = "failed";

      if (payload === "timeout") {
        state.removeFavoritesItemsError = "timeout-msg";
      } else if (payload === "cancel") {
        state.removeFavoritesItemsError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.removeFavoritesItemsError = "network failed";
      } else state.removeFavoritesItemsError = payload.message;
    },
  },
});

export const selectFavoritesItems = (state) => state.favoritesItems;

export const {
  resetFavoritesItemsStatus,
  resetFavoritesItemsError,
  resetAddFavoritesItemsStatus,
  resetAddFavoritesItemsError,
  resetRemoveFavoritesItemsStatus,
  resetRemoveFavoritesItemsError,
  resetFavoritesItems,
} = favoritesItemsSlice.actions;

export default favoritesItemsSlice.reducer;
