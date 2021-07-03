import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  companyItems: [],
  count: 0,
  error: "",
  addToWarehouseStatus: "idle",
  addToWarehouseError: "",
  removeFromWarehouseStatus: "idle",
  removeFromWarehouseError: "",
};

export const getCompanyItems = createAsyncThunk(
  "companyItems/getItems",
  async ({ queryString, token }, { rejectWithValue }) => {
    try {
      let buildUrl = `/items/${queryString.companyId}?page=${queryString.page}&limit=9`;

      if (queryString.name) {
        buildUrl = buildUrl + `&name=${queryString.name}`;
      }

      if (queryString.isActive !== undefined) {
        buildUrl = buildUrl + `&isActive=${queryString.isActive}`;
      }

      if (queryString.inWarehouse) {
        buildUrl = buildUrl + `&inWarehouse=true`;
      }

      if (queryString.outWarehouse) {
        buildUrl = buildUrl + `&outWarehouse=true`;
      }

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

export const addItemToWarehouse = createAsyncThunk(
  "companyItems/addToWarehouse",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/items/warehouse/add-item/${obj.itemId}`,
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

export const removeItemFromWarehouse = createAsyncThunk(
  "companyItems/removeFromWarehouse",
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

export const companyItemsSlice = createSlice({
  name: "companyItemsSlice",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = "";
    },
    resetError: (state) => {
      state.error = "";
    },
    resetAddToWarehouseStatus: (state) => {
      state.addToWarehouseStatus = "idle";
      state.addToWarehouseError = "";
    },
    resetAddToWarehouseError: (state) => {
      state.addToWarehouseError = "";
    },
    resetRemoveFromWarehouseStatus: (state) => {
      state.RemoveFromWarehouseStatus = "idle";
      state.RemoveFromWarehouseError = "";
    },
    resetRemoveFromWarehouseError: (state) => {
      state.RemoveFromWarehouseError = "";
    },
    resetCompanyItems: (state) => {
      state.status = "idle";
      state.companyItems = [];
      state.count = 0;
      state.error = "";
      state.addToWarehouseStatus = "idle";
      state.addToWarehouseError = "";
      state.RemoveFromWarehouseStatus = "idle";
      state.RemoveFromWarehouseError = "";
    },
  },
  extraReducers: {
    [getCompanyItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCompanyItems.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.companyItems = [
        ...state.companyItems,
        ...action.payload.data.items,
      ];
      state.count = action.payload.count;
      state.error = "";
    },
    [getCompanyItems.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
    },
    [addItemToWarehouse.pending]: (state, action) => {
      state.addToWarehouseStatus = "loading";
    },
    [addItemToWarehouse.fulfilled]: (state, action) => {
      state.addToWarehouseStatus = "succeeded";

      const newItems = state.companyItems.map((item) => {
        if (item._id === action.payload.data.item._id) {
          return action.payload.data.item;
        } else return item;
      });

      state.companyItems = newItems;
    },
    [addItemToWarehouse.rejected]: (state, { error, meta, payload }) => {
      state.addToWarehouseStatus = "failed";
      state.addToWarehouseError = payload.message;
    },
    [removeItemFromWarehouse.pending]: (state, action) => {
      state.RemoveFromWarehouseStatus = "loading";
    },
    [removeItemFromWarehouse.fulfilled]: (state, action) => {
      state.RemoveFromWarehouseStatus = "succeeded";
      const newItems = state.companyItems.map((item) => {
        if (item._id === action.payload.data.item._id) {
          return action.payload.data.item;
        } else return item;
      });

      state.companyItems = newItems;
    },
    [removeItemFromWarehouse.rejected]: (state, { error, meta, payload }) => {
      state.RemoveFromWarehouseStatus = "failed";
      state.removeFromWarehouseError = payload.message;
    },
  },
});

export const { resetStatus, resetError, resetCompanyItems } =
  companyItemsSlice.actions;

export const selectCompanyItems = (state) => state.companyItems;

export default companyItemsSlice.reducer;
