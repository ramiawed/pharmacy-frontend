import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { BASEURL } from "../../utils/constants";

const initialState = {
  itemsSectionTwoStatus: "idle",
  itemsSectionTwoError: "",
  addItemToSectionTwoStatus: "idle",
  addItemToSectionTwoError: "",
  removeItemFromSectionTwoStatus: "idle",
  removeItemFromSectionTwoError: "",
  itemsSectionTwo: [],
  count: 0,
  refresh: true,
};

let CancelToken;
let source;

export const getItemsSectionTwo = createAsyncThunk(
  "advertisement/itemsSectionTwo",
  async ({ token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.get(
        `${BASEURL}/items?isActive=true&inSectionTwo=true&page=1&limit=25`,
        {
          // timeout: 10000,
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

export const addItemToSectionTwo = createAsyncThunk(
  "advertisement/addItemToSectionTwo",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/items/item/${id}`,
        {
          inSectionTwo: true,
        },
        {
          // timeout: 10000,
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

export const removeItemFromSectionTwo = createAsyncThunk(
  "advertisement/removeItemFromSectionTwo",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/items/item/${id}`,
        {
          inSectionTwo: false,
        },
        {
          // timeout: 10000,
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

export const itemsSectionTwoSlice = createSlice({
  name: "itemsSectionTwo",
  initialState,
  reducers: {
    resetItemsSectionTwoStatus: (state) => {
      state.itemsSectionTwoStatus = "idle";
      state.itemsSectionTwoError = "";
    },

    resetItemsSectionTwoError: (state) => {
      state.itemsSectionTwoError = "";
    },

    resetAddItemToSectionTwoStatus: (state) => {
      state.addItemToSectionTwoStatus = "idle";
      state.addItemToSectionTwoError = "";
    },

    resetAddItemToSectionTwoError: (state) => {
      state.addItemToSectionTwoError = "";
    },

    resetRemoveItemFromSectionTwoStatus: (state) => {
      state.removeItemFromSectionTwoStatus = "idle";
      state.removeItemFromSectionTwoError = "";
    },

    resetRemoveItemFromSectionTwoError: (state) => {
      state.removeItemFromSectionTwoError = "";
    },

    setRefreshItemsSliceTwo: (state, action) => {
      state.refresh = action.payload;
    },

    addItemToSectionTwoSocket: (state, action) => {
      state.itemsSectionTwo = [...state.itemsSectionTwo, action.payload];
    },

    removeItemFromSectionTwoSocket: (state, action) => {
      state.itemsSectionTwo = state.itemsSectionTwo.filter(
        (c) => c._id !== action.payload
      );
    },

    resetItemsSectionTwo: (state) => {
      state.itemsSectionTwoStatus = "idle";
      state.itemsSectionTwoError = "";
      state.addItemToSectionTwoStatus = "idle";
      state.addItemToSectionTwoError = "";
      state.removeItemFromSectionTwoStatus = "idle";
      state.removeItemFromSectionTwoError = "";
      state.itemsSectionTwo = [];
      state.count = 0;
      state.refresh = true;
    },

    itemsSectionTwoSignOut: (state) => {
      state.itemsSectionTwoStatus = "idle";
      state.itemsSectionTwoError = "";
      state.addItemToSectionTwoStatus = "idle";
      state.addItemToSectionTwoError = "";
      state.removeItemFromSectionTwoStatus = "idle";
      state.removeItemFromSectionTwoError = "";
      state.itemsSectionTwo = [];
      state.count = 0;
      state.refresh = true;
    },
  },

  extraReducers: {
    [getItemsSectionTwo.pending]: (state) => {
      state.itemsSectionTwoStatus = "loading";
    },
    [getItemsSectionTwo.fulfilled]: (state, action) => {
      state.itemsSectionTwoStatus = "succeeded";
      state.itemsSectionTwo = action.payload.data.items;
      state.itemsSectionTwoError = "";
      state.refresh = false;
    },
    [getItemsSectionTwo.rejected]: (state, { payload }) => {
      state.itemsSectionTwoStatus = "failed";

      if (payload === "timeout") {
        state.itemsSectionTwoError = "timeout msg";
      } else if (payload === "cancel") {
        state.itemsSectionTwoError = "cancel operation msg";
      } else if (payload === "network failed") {
        state.itemsSectionTwoError = "network failed";
      } else state.itemsSectionTwoError = payload.message;
    },

    [addItemToSectionTwo.pending]: (state) => {
      state.addItemToSectionTwoStatus = "loading";
    },
    [addItemToSectionTwo.fulfilled]: (state, action) => {
      state.addItemToSectionTwoStatus = "succeeded";
      state.addItemToSectionTwoError = "";
      const filteredItem = state.itemsSectionTwo.filter(
        (item) => item._id === action.payload.data.item._id
      );

      if (filteredItem.length === 0)
        state.itemsSectionTwo = [
          ...state.itemsSectionTwo,
          action.payload.data.item,
        ];
    },
    [addItemToSectionTwo.rejected]: (state, { payload }) => {
      state.addItemToSectionTwoStatus = "failed";

      if (payload === "timeout") {
        state.addItemToSectionTwoError = "timeout msg";
      } else if (payload === "cancel") {
        state.addItemToSectionTwoError = "cancel operation msg";
      } else if (payload === "network failed") {
        state.addItemToSectionTwoError = "network failed";
      } else state.addItemToSectionTwoError = payload.message;
    },

    [removeItemFromSectionTwo.pending]: (state) => {
      state.removeItemFromSectionTwoStatus = "loading";
    },
    [removeItemFromSectionTwo.fulfilled]: (state, action) => {
      state.removeItemFromSectionTwoStatus = "succeeded";
      state.removeItemFromSectionTwoError = "";
      state.itemsSectionTwo = state.itemsSectionTwo.filter(
        (company) => company._id !== action.payload.data.item._id
      );
    },
    [removeItemFromSectionTwo.rejected]: (state, { payload }) => {
      state.removeItemFromSectionTwoStatus = "failed";

      if (payload === "timeout") {
        state.removeItemFromSectionTwoError = "timeout msg";
      } else if (payload === "cancel") {
        state.removeItemFromSectionTwoError = "cancel operation msg";
      } else if (payload === "network failed") {
        state.removeItemFromSectionTwoError = "network failed";
      } else state.removeItemFromSectionTwoError = payload.message;
    },
  },
});

export const selectItemsSectionTwo = (state) => state.itemsSectionTwo;

export const {
  itemsSectionTwoSignOut,
  resetItemsSectionTwoStatus,
  resetItemsSectionTwoError,
  resetAddItemToSectionTwoStatus,
  resetAddItemToSectionTwoError,
  resetRemoveItemFromSectionTwoStatus,
  resetRemoveItemFromSectionTwoError,
  resetFavoritesItems,
  setRefreshItemsSliceTwo,
  addItemToSectionTwoSocket,
  removeItemFromSectionTwoSocket,
} = itemsSectionTwoSlice.actions;

export default itemsSectionTwoSlice.reducer;
