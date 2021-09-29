import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { BASEURL } from "../../utils/constants";

const initialState = {
  newestItemsStatus: "idle",
  newestItemsError: "",
  addNewestItemsStatus: "",
  addNewestItemsError: "",
  removeNewestItemsStatus: "idle",
  removeNewestItemsError: "",
  newestItems: [],
  count: 0,
};

let CancelToken;
let source;

export const getNewestItems = createAsyncThunk(
  "advertisement/newestItems",
  async ({ token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.get(
        `${BASEURL}/items?isActive=true&isNewest=true&page=1&limit=25`,
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

export const addToNewestItems = createAsyncThunk(
  "advertisement/addToNewestItems",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      console.log("items");

      const response = await axios.post(
        `${BASEURL}/items/item/${id}`,
        {
          isNewest: true,
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

export const removeFromNewestItems = createAsyncThunk(
  "advertisement/removeFromNewestItems",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/items/item/${id}`,
        {
          isNewest: false,
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

export const newestItemsSlice = createSlice({
  name: "newestItems",
  initialState,
  reducers: {
    resetNewestItemsStatus: (state) => {
      state.newestItemsStatus = "idle";
      state.newestItemsError = "";
    },

    resetNewestItemsError: (state) => {
      state.newestItemsError = "";
    },

    resetAddNewestItemsStatus: (state) => {
      state.addNewestItemsStatus = "idle";
      state.addNewestItemsError = "";
    },

    resetAddNewestItemsError: (state) => {
      state.addNewestItemsError = "";
    },

    resetRemoveNewestItemsStatus: (state) => {
      state.removeNewestItemsStatus = "idle";
      state.removeNewestItemsError = "";
    },

    resetRemoveNewestItemsError: (state) => {
      state.removeNewestItemsError = "";
    },

    resetNewestItems: (state) => {
      state.newestItemsStatus = "idle";
      state.newestItemsError = "";
      state.addNewestItemsStatus = "idle";
      state.addNewestItemsError = "";
      state.removeNewestItemsStatus = "idle";
      state.removeNewestItemsError = "";
      state.newestItems = [];
      state.count = 0;
    },
  },

  extraReducers: {
    [getNewestItems.pending]: (state) => {
      state.newestItemsStatus = "loading";
    },
    [getNewestItems.fulfilled]: (state, action) => {
      state.newestItemsStatus = "succeeded";
      state.newestItems = action.payload.data.items;
      state.newestItemsError = "";
    },
    [getNewestItems.rejected]: (state, { payload }) => {
      state.newestItemsStatus = "failed";

      if (payload === "timeout") {
        state.newestItemsError = "timeout-msg";
      } else if (payload === "cancel") {
        state.newestItemsError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.newestItemsError = "network failed";
      } else state.newestItemsError = payload.message;
    },

    [addToNewestItems.pending]: (state) => {
      state.addNewestItemsStatus = "loading";
    },
    [addToNewestItems.fulfilled]: (state, action) => {
      state.addNewestItemsStatus = "succeeded";
      state.addNewestItemsError = "";
      state.newestItems = [...state.newestItems, action.payload.data.item];
    },
    [addToNewestItems.rejected]: (state, { payload }) => {
      state.addNewestItemsStatus = "failed";

      if (payload === "timeout") {
        state.addNewestItemsError = "timeout-msg";
      } else if (payload === "cancel") {
        state.addNewestItemsError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.addNewestItemsError = "network failed";
      } else state.addNewestItemsError = payload.message;
    },

    [removeFromNewestItems.pending]: (state) => {
      state.removeNewestItemsStatus = "loading";
    },
    [removeFromNewestItems.fulfilled]: (state, action) => {
      state.removeNewestItemsStatus = "succeeded";
      state.removeNewestItemsError = "";
      state.newestItems = state.newestItems.filter(
        (item) => item._id !== action.payload.data.item._id
      );
    },
    [removeFromNewestItems.rejected]: (state, { payload }) => {
      state.removeNewestItemsStatus = "failed";

      if (payload === "timeout") {
        state.removeNewestItemsError = "timeout-msg";
      } else if (payload === "cancel") {
        state.removeNewestItemsError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.removeNewestItemsError = "network failed";
      } else state.removeNewestItemsError = payload.message;
    },
  },
});

export const selectNewestItems = (state) => state.newestItems;

export const {
  resetNewestItemsStatus,
  resetNewestItemsError,
  resetAddNewestItemsStatus,
  resetAddNewestItemsError,
  resetRemoveNewestItemsStatus,
  resetRemoveNewestItemsError,
  resetNewestItems,
} = newestItemsSlice.actions;

export default newestItemsSlice.reducer;
