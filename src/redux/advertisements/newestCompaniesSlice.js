import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { BASEURL } from "../../utils/constants";

const initialState = {
  newestCompaniesStatus: "idle",
  newestCompaniesError: "",
  addNewestCompaniesStatus: "",
  addNewestCompaniesError: "",
  removeNewestCompaniesStatus: "idle",
  removeNewestCompaniesError: "",
  newestCompanies: [],
  count: 0,
};

let CancelToken;
let source;

export const getNewestCompanies = createAsyncThunk(
  "advertisement/newestCompanies",
  async ({ token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.get(
        `${BASEURL}/users?type=company&isActive=true&isNewest=true&page=1&limit=25`,
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

export const addToNewestCompanies = createAsyncThunk(
  "advertisement/addToNewestCompanies",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/users/isNewest/${id}`,
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

export const removeFromNewestCompanies = createAsyncThunk(
  "advertisement/removeFromNewestCompanies",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/users/isNewest/${id}`,
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
  name: "newestCompanies",
  initialState,
  reducers: {
    resetNewestCompaniesStatus: (state) => {
      state.newestCompaniesStatus = "idle";
      state.newestCompaniesError = "";
    },

    resetNewestCompaniesError: (state) => {
      state.newestCompaniesError = "";
    },

    resetAddNewestCompaniesStatus: (state) => {
      state.addNewestCompaniesStatus = "idle";
      state.addNewestCompaniesError = "";
    },

    resetAddNewestCompaniesError: (state) => {
      state.addNewestCompaniesError = "";
    },

    resetRemoveNewestCompaniesStatus: (state) => {
      state.removeNewestCompaniesStatus = "idle";
      state.removeNewestCompaniesError = "";
    },

    resetRemoveNewestCompaniesError: (state) => {
      state.removeNewestCompaniesError = "";
    },

    resetNewestCompanies: (state) => {
      state.newestCompaniesStatus = "idle";
      state.newestCompaniesError = "";
      state.addNewestCompaniesStatus = "idle";
      state.addNewestCompaniesError = "";
      state.removeNewestCompaniesStatus = "idle";
      state.removeNewestCompaniesError = "";
      state.newestCompanies = [];
      state.count = 0;
    },
  },

  extraReducers: {
    [getNewestCompanies.pending]: (state) => {
      state.newestCompaniesStatus = "loading";
    },
    [getNewestCompanies.fulfilled]: (state, action) => {
      state.newestCompaniesStatus = "succeeded";
      state.newestCompanies = action.payload.data.users;
      state.newestCompaniesError = "";
    },
    [getNewestCompanies.rejected]: (state, { payload }) => {
      state.newestCompaniesStatus = "failed";

      if (payload === "timeout") {
        state.newestCompaniesError = "timeout-msg";
      } else if (payload === "cancel") {
        state.newestCompaniesError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.newestCompaniesError = "network failed";
      } else state.newestCompaniesError = payload.message;
    },

    [addToNewestCompanies.pending]: (state) => {
      state.addNewestCompaniesStatus = "loading";
    },
    [addToNewestCompanies.fulfilled]: (state, action) => {
      state.addNewestCompaniesStatus = "succeeded";
      state.addNewestCompaniesError = "";
      state.newestCompanies = [
        ...state.newestCompanies,
        action.payload.data.user,
      ];
    },
    [addToNewestCompanies.rejected]: (state, { payload }) => {
      state.addNewestCompaniesStatus = "failed";

      if (payload === "timeout") {
        state.addNewestCompaniesError = "timeout-msg";
      } else if (payload === "cancel") {
        state.addNewestCompaniesError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.addNewestCompaniesError = "network failed";
      } else state.addNewestCompaniesError = payload.message;
    },

    [removeFromNewestCompanies.pending]: (state) => {
      state.removeNewestCompaniesStatus = "loading";
    },
    [removeFromNewestCompanies.fulfilled]: (state, action) => {
      state.removeNewestCompaniesStatus = "succeeded";
      state.removeNewestCompaniesError = "";
      state.newestCompanies = state.newestCompanies.filter(
        (company) => company._id !== action.payload.data.user._id
      );
    },
    [removeFromNewestCompanies.rejected]: (state, { payload }) => {
      state.removeNewestCompaniesStatus = "failed";

      if (payload === "timeout") {
        state.removeNewestCompaniesError = "timeout-msg";
      } else if (payload === "cancel") {
        state.removeNewestCompaniesError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.removeNewestCompaniesError = "network failed";
      } else state.removeNewestCompaniesError = payload.message;
    },
  },
});

export const selectNewestCompanies = (state) => state.newestCompanies;

export const {
  resetNewestCompaniesStatus,
  resetNewestCompaniesError,
  resetAddNewestCompaniesStatus,
  resetAddNewestCompaniesError,
  resetRemoveNewestCompaniesStatus,
  resetRemoveNewestCompaniesError,
  resetNewestCompanies,
} = favoritesCompaniesSlice.actions;

export default favoritesCompaniesSlice.reducer;
