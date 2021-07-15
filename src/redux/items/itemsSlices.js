import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  items: [],
  count: 0,
  error: "",
  addStatus: "idle",
  addError: "",
  activeStatus: "idle",
  activeError: "",
  updateStatus: "idle",
  updateError: "",
};

export const getItems = createAsyncThunk(
  "items/getItems",
  async ({ queryString, token }, { rejectWithValue }) => {
    try {
      let buildUrl = `/items?page=${queryString.page}&limit=9`;

      if (queryString.companyId) {
        buildUrl = buildUrl + `&companyId=${queryString.companyId}`;
      }

      if (queryString.name) {
        buildUrl = buildUrl + `&itemName=${queryString.name}`;
      }
      if (queryString.warehouseName) {
        buildUrl = buildUrl + `&warehouseName=${queryString.warehouseName}`;
      }

      if (queryString.isActive !== undefined) {
        buildUrl = buildUrl + `&isActive=${queryString.isActive}`;
      }

      if (queryString.sort) {
        buildUrl = buildUrl + `&sort=${queryString.sort}`;
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

export const addItem = createAsyncThunk(
  "items/addItem",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/items", obj, {
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

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/items/item/${obj._id}`,
        { ...obj },
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

export const addItems = createAsyncThunk(
  "items/addItems",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/items/excel", obj, {
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

export const changeItemActiveState = createAsyncThunk(
  "items/changeActive",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/items/active/${obj.itemId}`,
        { action: obj.action },
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

export const itemsSlice = createSlice({
  name: "itemsSlice",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = "";
    },
    resetError: (state) => {
      state.error = "";
    },
    resetActiveStatus: (state) => {
      state.activeStatus = "idle";
      state.activeError = "";
    },
    resetActiveError: (state) => {
      state.activeError = "";
    },
    resetAddStatus: (state) => {
      state.addStatus = "idle";
      state.addError = "";
    },
    resetAddError: (state) => {
      state.addError = "";
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = "idle";
      state.updateError = "";
    },
    resetUpdateError: (state) => {
      state.updateError = "";
    },
    resetItems: (state) => {
      state.status = "idle";
      state.items = [];
      state.count = 0;
      state.error = "";
      state.addStatus = "";
      state.addError = "";
      state.activeStatus = "idle";
      state.activeError = "";
      state.updateStatus = "idle";
      state.updateError = "";
    },
  },
  extraReducers: {
    [getItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [getItems.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload.data.items;
      state.count = action.payload.count;
      state.error = "";
    },
    [getItems.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
    },
    [addItem.pending]: (state, action) => {
      state.addStatus = "loading";
    },
    [addItem.fulfilled]: (state, action) => {
      state.addStatus = "succeeded";
      // state.items = [...state.items, action.payload.data.item];
      state.addError = "";
    },
    [addItem.rejected]: (state, { error, meta, payload }) => {
      state.addStatus = "failed";
      state.addError = payload.message;
    },
    [addItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [addItems.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // state.items = [...state.items, action.payload.data.items];
      state.error = "";
    },
    [addItems.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
    },
    [changeItemActiveState.pending]: (state, action) => {
      state.activeStatus = "loading";
    },
    [changeItemActiveState.fulfilled]: (state, action) => {
      state.activeStatus = "succeeded";
      const newItems = state.items.map((item) => {
        if (item._id === action.payload.data.item._id) {
          return action.payload.data.item;
        } else return item;
      });

      state.items = newItems;
    },
    [changeItemActiveState.rejected]: (state, { error, meta, payload }) => {
      state.activeStatus = "failed";
      state.activeError = payload.message;
    },
    [updateItem.pending]: (state, action) => {
      state.updateStatus = "loading";
    },
    [updateItem.fulfilled]: (state, action) => {
      state.updateStatus = "succeeded";
      const newItems = state.items.map((item) => {
        if (item._id === action.payload.data.item._id) {
          return action.payload.data.item;
        } else return item;
      });

      state.items = newItems;
    },
    [updateItem.rejected]: (state, { error, meta, payload }) => {
      state.updateStatus = "failed";
      state.updateError = payload.message;
    },
  },
});

export const {
  resetStatus,
  resetError,
  resetItems,
  resetActiveStatus,
  resetActiveError,
  resetAddStatus,
  resetAddError,
  resetUpdateError,
  resetUpdateStatus,
} = itemsSlice.actions;

export const selectItems = (state) => state.items;

export default itemsSlice.reducer;
