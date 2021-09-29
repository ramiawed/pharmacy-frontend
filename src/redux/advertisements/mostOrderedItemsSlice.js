import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { BASEURL } from "../../utils/constants";

const initialState = {
  mostOrderedItemsStatus: "idle",
  mostOrderedItemsError: "",
  addMostOrderedItemsStatus: "",
  addMostOrderedItemsError: "",
  removeMostOrderedItemsStatus: "idle",
  removeMostOrderedItemsError: "",
  mostOrderedItems: [],
  count: 0,
};

let CancelToken;
let source;

export const getMostOrderedItems = createAsyncThunk(
  "advertisement/mostOrderedItems",
  async ({ token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.get(
        `${BASEURL}/items?isActive=true&isMostOrdered=true&page=1&limit=25`,
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

export const addToMostOrderedItems = createAsyncThunk(
  "advertisement/addToMostOrderedItems",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      console.log("items");

      const response = await axios.post(
        `${BASEURL}/items/item/${id}`,
        {
          isMostOrdered: true,
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

export const removeFromMostOrderedItems = createAsyncThunk(
  "advertisement/removeFromMostOrderedItems",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/items/item/${id}`,
        {
          isMostOrdered: false,
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

export const mostOrderedItemsSlice = createSlice({
  name: "mostOrderedItems",
  initialState,
  reducers: {
    resetMostOrderedItemsStatus: (state) => {
      state.mostOrderedItemsStatus = "idle";
      state.mostOrderedItemsError = "";
    },

    resetMostOrderedItemsError: (state) => {
      state.mostOrderedItemsError = "";
    },

    resetAddMostOrderedItemsStatus: (state) => {
      state.addMostOrderedItemsStatus = "idle";
      state.addMostOrderedItemsError = "";
    },

    resetAddMostOrderedItemsError: (state) => {
      state.addMostOrderedItemsError = "";
    },

    resetRemoveMostOrderedItemsStatus: (state) => {
      state.removeMostOrderedItemsStatus = "idle";
      state.removeMostOrderedItemsError = "";
    },

    resetRemoveMostOrderedItemsError: (state) => {
      state.removeMostOrderedItemsError = "";
    },

    resetMostOrderedItems: (state) => {
      state.mostOrderedItemsStatus = "idle";
      state.mostOrderedItemsError = "";
      state.addMostOrderedItemsStatus = "idle";
      state.addMostOrderedItemsError = "";
      state.removeMostOrderedItemsStatus = "idle";
      state.removeMostOrderedItemsError = "";
      state.mostOrderedItems = [];
      state.count = 0;
    },
  },

  extraReducers: {
    [getMostOrderedItems.pending]: (state) => {
      state.mostOrderedItemsStatus = "loading";
    },
    [getMostOrderedItems.fulfilled]: (state, action) => {
      state.mostOrderedItemsStatus = "succeeded";
      state.mostOrderedItems = action.payload.data.items;
      state.mostOrderedItemsError = "";
    },
    [getMostOrderedItems.rejected]: (state, { payload }) => {
      state.mostOrderedItemsStatus = "failed";

      if (payload === "timeout") {
        state.mostOrderedItemsError = "timeout-msg";
      } else if (payload === "cancel") {
        state.mostOrderedItemsError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.mostOrderedItemsError = "network failed";
      } else state.mostOrderedItemsError = payload.message;
    },

    [addToMostOrderedItems.pending]: (state) => {
      state.addMostOrderedItemsStatus = "loading";
    },
    [addToMostOrderedItems.fulfilled]: (state, action) => {
      state.addMostOrderedItemsStatus = "succeeded";
      state.addMostOrderedItemsError = "";
      state.mostOrderedItems = [
        ...state.mostOrderedItems,
        action.payload.data.item,
      ];
    },
    [addToMostOrderedItems.rejected]: (state, { payload }) => {
      state.addMostOrderedItemsStatus = "failed";

      if (payload === "timeout") {
        state.addMostOrderedItemsError = "timeout-msg";
      } else if (payload === "cancel") {
        state.addMostOrderedItemsError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.addMostOrderedItemsError = "network failed";
      } else state.addMostOrderedItemsError = payload.message;
    },

    [removeFromMostOrderedItems.pending]: (state) => {
      state.removeMostOrderedItemsStatus = "loading";
    },
    [removeFromMostOrderedItems.fulfilled]: (state, action) => {
      state.removeMostOrderedItemsStatus = "succeeded";
      state.removeMostOrderedItemsError = "";
      state.mostOrderedItems = state.mostOrderedItems.filter(
        (item) => item._id !== action.payload.data.item._id
      );
    },
    [removeFromMostOrderedItems.rejected]: (state, { payload }) => {
      state.removeMostOrderedItemsStatus = "failed";

      if (payload === "timeout") {
        state.removeMostOrderedItemsError = "timeout-msg";
      } else if (payload === "cancel") {
        state.removeMostOrderedItemsError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.removeMostOrderedItemsError = "network failed";
      } else state.removeMostOrderedItemsError = payload.message;
    },
  },
});

export const selectMostOrderedItems = (state) => state.mostOrderedItems;

export const {
  resetMostOrderedItemsStatus,
  resetMostOrderedItemsError,
  resetAddMostOrderedItemsStatus,
  resetAddMostOrderedItemsError,
  resetRemoveMostOrderedItemsStatus,
  resetRemoveMostOrderedItemsError,
  resetMostOrderedItems,
} = mostOrderedItemsSlice.actions;

export default mostOrderedItemsSlice.reducer;
