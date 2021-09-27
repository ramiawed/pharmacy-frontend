import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { BASEURL } from "../../utils/constants";

const initialState = {
  favoritesCompaniesStatus: "idle",
  favoritesCompaniesError: "",
  addFavoritesCompaniesStatus: "",
  addFavoritesCompaniesError: "",
  removeFavoritesCompaniesStatus: "idle",
  removeFavoritesCompaniesError: "",
  favoritesCompanies: [],
  count: 0,
};

let CancelToken;
let source;

export const getFavoritesCompanies = createAsyncThunk(
  "advertisement/favoritesCompanies",
  async ({ token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.get(
        `${BASEURL}/users?type=company&isActive=true&isFavorite=true&page=1&limit=25`,
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

export const addToFavoritesCompanies = createAsyncThunk(
  "advertisement/addToFavoritesCompanies",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/users/isFavorite/${id}`,
        {
          option: true,
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

export const removeFromFavoritesCompanies = createAsyncThunk(
  "advertisement/removeFromFavoritesCompanies",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/users/isFavorite/${id}`,
        {
          option: false,
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

export const favoritesCompaniesSlice = createSlice({
  name: "favoritesCompanies",
  initialState,
  reducers: {
    resetFavoritesCompaniesStatus: (state) => {
      state.favoritesCompaniesStatus = "idle";
      state.favoritesCompaniesError = "";
    },

    resetFavoritesCompaniesError: (state) => {
      state.favoritesCompaniesError = "";
    },

    resetAddFavoritesCompaniesStatus: (state) => {
      state.addFavoritesCompaniesStatus = "idle";
      state.addFavoritesCompaniesError = "";
    },

    resetAddFavoritesCompaniesError: (state) => {
      state.addFavoritesCompaniesError = "";
    },

    resetRemoveFavoritesCompaniesStatus: (state) => {
      state.removeFavoritesCompaniesStatus = "idle";
      state.removeFavoritesCompaniesError = "";
    },

    resetRemoveFavoritesCompaniesError: (state) => {
      state.removeFavoritesCompaniesError = "";
    },

    resetFavoritesCompanies: (state) => {
      state.favoritesCompaniesStatus = "idle";
      state.favoritesCompaniesError = "";
      state.addFavoritesCompaniesStatus = "idle";
      state.addFavoritesCompaniesError = "";
      state.removeFavoritesCompaniesStatus = "idle";
      state.removeFavoritesCompaniesError = "";
      state.favoritesCompanies = [];
      state.count = 0;
    },
  },

  extraReducers: {
    [getFavoritesCompanies.pending]: (state) => {
      state.favoritesCompaniesStatus = "loading";
    },
    [getFavoritesCompanies.fulfilled]: (state, action) => {
      state.favoritesCompaniesStatus = "succeeded";
      state.favoritesCompanies = action.payload.data.users;
      state.favoritesCompaniesError = "";
    },
    [getFavoritesCompanies.rejected]: (state, { payload }) => {
      state.favoritesCompaniesStatus = "failed";

      if (payload === "timeout") {
        state.favoritesCompaniesError = "timeout-msg";
      } else if (payload === "cancel") {
        state.favoritesCompaniesError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.favoritesCompaniesError = "network failed";
      } else state.favoritesCompaniesError = payload.message;
    },

    [addToFavoritesCompanies.pending]: (state) => {
      state.addFavoritesCompaniesStatus = "loading";
    },
    [addToFavoritesCompanies.fulfilled]: (state, action) => {
      state.addFavoritesCompaniesStatus = "succeeded";
      state.addFavoritesCompaniesError = "";
      state.favoritesCompanies = [
        ...state.favoritesCompanies,
        action.payload.data.user,
      ];
    },
    [addToFavoritesCompanies.rejected]: (state, { payload }) => {
      state.addFavoritesCompaniesStatus = "failed";

      if (payload === "timeout") {
        state.addFavoritesCompaniesError = "timeout-msg";
      } else if (payload === "cancel") {
        state.addFavoritesCompaniesError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.addFavoritesCompaniesError = "network failed";
      } else state.addFavoritesCompaniesError = payload.message;
    },

    [removeFromFavoritesCompanies.pending]: (state) => {
      state.removeFavoritesCompaniesStatus = "loading";
    },
    [removeFromFavoritesCompanies.fulfilled]: (state, action) => {
      state.removeFavoritesCompaniesStatus = "succeeded";
      state.removeFavoritesCompaniesError = "";
      state.favoritesCompanies = state.favoritesCompanies.filter(
        (company) => company._id !== action.payload.data.user._id
      );
    },
    [removeFromFavoritesCompanies.rejected]: (state, { payload }) => {
      state.removeFavoritesCompaniesStatus = "failed";

      if (payload === "timeout") {
        state.removeFavoritesCompaniesError = "timeout-msg";
      } else if (payload === "cancel") {
        state.removeFavoritesCompaniesError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.removeFavoritesCompaniesError = "network failed";
      } else state.removeFavoritesCompaniesError = payload.message;
    },
  },
});

export const selectFavoritesCompanies = (state) => state.favoritesCompanies;

export const {
  resetFavoritesCompaniesStatus,
  resetFavoritesCompaniesError,
  resetAddFavoritesCompaniesStatus,
  resetAddFavoritesCompaniesError,
  resetRemoveFavoritesCompaniesStatus,
  resetRemoveFavoritesCompaniesError,
  resetFavoritesCompanies,
} = favoritesCompaniesSlice.actions;

export default favoritesCompaniesSlice.reducer;
