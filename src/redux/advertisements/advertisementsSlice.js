import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { BASEURL } from "../../utils/constants";

const initialState = {
  advertisementStatus: "idle",
  advertisementError: "",

  favoritesCompanies: [],
  newestCompanies: [],
  favoritesItems: [],
  newestItems: [],
  mostOrderItems: [],
};

let CancelToken;
let source;

export const getFavoritesCompanies = createAsyncThunk(
  "advertisement/favoritesCompanies",
  async ({}, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.get(`${BASEURL}/users/isFavorite`, {
        timeout: 10000,
        cancelToken: source.token,
      });

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

export const changeFavoriteCompanyStatus = createAsyncThunk(
  "advertisement/favoriteCompanyStatus",
  async ({ token, userId, option }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/users/isFavorite/${userId}`,
        {
          option,
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

export const advertisementsSlice = createSlice({
  name: "advertisementsSlice",
  initialState,
  reducers: {
    resetAdvertisementStatus: (state) => {
      state.advertisementStatus = "idle";
      state.advertisementError = "";
    },
    resetAdvertisementError: (state) => {
      state.advertisementError = "";
    },

    resetFavoritesCompanies: (state) => {
      state.favoritesCompanies = [];
    },

    resetAdvertisement: (state) => {
      state.advertisementStatus = "idle";
      state.advertisementError = "";

      state.favoritesCompanies = [];
      state.newestCompanies = [];
      state.favoritesItems = [];
      state.newestItems = [];
      state.mostOrderItems = [];
    },
  },

  extraReducers: {
    [getFavoritesCompanies.pending]: (state) => {
      state.advertisementStatus = "loading";
    },
    [getFavoritesCompanies.fulfilled]: (state, action) => {
      state.advertisementStatus = "succeeded";
      state.favoritesCompanies = action.payload.data.favoritesCompanies;
      state.advertisementError = "";
    },
    [getFavoritesCompanies.rejected]: (state, { payload }) => {
      state.advertisementStatus = "failed";

      if (payload === "timeout") {
        state.advertisementError = "timeout-msg";
      } else if (payload === "cancel") {
        state.advertisementError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.advertisementError = "network failed";
      } else state.advertisementError = payload.message;
    },

    [changeFavoriteCompanyStatus.pending]: (state) => {
      state.advertisementStatus = "loading";
    },
    [changeFavoriteCompanyStatus.fulfilled]: (state, action) => {
      state.advertisementStatus = "succeeded";
      state.favoritesCompanies = [
        ...state.favoritesCompanies,
        action.payload.data.user,
      ];

      state.advertisementError = "";
    },
    [changeFavoriteCompanyStatus.rejected]: (state, { payload }) => {
      state.advertisementStatus = "failed";

      if (payload === "timeout") {
        state.advertisementError = "timeout-msg";
      } else if (payload === "cancel") {
        state.advertisementError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.advertisementError = "network failed";
      } else state.advertisementError = payload.message;
    },
  },
});

export const selectAdvertisements = (state) => state.advertisements;

export const {
  resetAdvertisement,
  resetAdvertisementStatus,
  resetAdvertisementError,
} = advertisementsSlice.actions;

export default advertisementsSlice.reducer;
