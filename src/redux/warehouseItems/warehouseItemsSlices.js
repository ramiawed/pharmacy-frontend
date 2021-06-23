import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  warehouseItems: [],
  count: 0,
  error: "",
  removeFromWarehouseStatus: "idle",
  removeFromWarehouseError: "",
};

export const getWarehouseItems = createAsyncThunk(
  "warehouseItems/getItems",
  async ({ queryString, token }, { rejectWithValue }) => {
    try {
      let buildUrl = `/items/warehouseItems?page=${queryString.page}&limit=9`;

      if (queryString.name) {
        buildUrl = buildUrl + `&name=${queryString.name}`;
      }

      if (queryString.companyName) {
        buildUrl = buildUrl + `&companyName=${queryString.companyName}`;
      }

      // if (queryString.isActive !== undefined) {
      //   buildUrl = buildUrl + `&isActive=${queryString.isActive}`;
      // }

      const response = await axios.get(buildUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeItemFromWarehouse = createAsyncThunk(
  "warehouseItems/removeFromWarehouse",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/items/warehouse/remove-item/${obj.itemId}`,
        { warehouseId: obj.warehouseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const warehouseItemsSlice = createSlice({
  name: "warehouseItemsSlice",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = "";
    },
    resetError: (state) => {
      state.error = "";
    },
    resetAddToWarehouseError: (state) => {
      state.addToWarehouseError = "";
    },
    resetRemoveFromWarehouseStatus: (state) => {
      state.removeFromWarehouseStatus = "idle";
      state.removeFromWarehouseError = "";
    },
    resetRemoveFromWarehouseError: (state) => {
      state.RemoveFromWarehouseError = "";
    },
    resetWarehouseItems: (state) => {
      state.status = "idle";
      state.warehouseItems = [];
      state.count = 0;
      state.error = "";
      state.removeFromWarehouseStatus = "idle";
      state.removeFromWarehouseError = "";
    },
  },
  extraReducers: {
    [getWarehouseItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [getWarehouseItems.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.warehouseItems = action.payload.data.items;
      state.count = action.payload.count[0] ? action.payload.count[0].price : 0;
      state.error = "";
    },
    [getWarehouseItems.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
    },
    [removeItemFromWarehouse.pending]: (state, action) => {
      state.removeFromWarehouseStatus = "loading";
    },
    [removeItemFromWarehouse.fulfilled]: (state, action) => {
      state.removeFromWarehouseStatus = "succeeded";
      // const newItems = state.warehouseItems.map((item) => {
      //   if (item._id === action.payload.data.item._id) {
      //     return action.payload.data.item;
      //   } else return item;
      // });

      // state.warehouseItems = newItems;
      // state.count = state.count - 1;
    },
    [removeItemFromWarehouse.rejected]: (state, { error, meta, payload }) => {
      state.removeFromWarehouseStatus = "failed";
      state.removeFromWarehouseError = payload.message;
    },
  },
});

export const {
  resetStatus,
  resetError,
  resetWarehouseItems,
  resetRemoveFromWarehouseStatus,
} = warehouseItemsSlice.actions;

export const selectWarehouseItems = (state) => state.warehouseItems;

export default warehouseItemsSlice.reducer;
