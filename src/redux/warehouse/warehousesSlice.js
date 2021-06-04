import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  warehouses: [],
  count: 0,
  error: "",
};

export const getWarehouses = createAsyncThunk(
  "warehouses/getWarehouses",
  async ({ queryString, token }, { rejectWithValue }) => {
    try {
      let buildUrl = `/users?type=warehouse&page=${queryString.page}&limit=9`;

      if (queryString.name) {
        buildUrl = buildUrl + `&name=${queryString.name}`;
      }

      if (queryString.city) {
        buildUrl = buildUrl + `&city=${queryString.city}`;
      }

      if (queryString.approve !== undefined) {
        buildUrl = buildUrl + `&isApproved=${queryString.approve}`;
      }

      if (queryString.active !== undefined) {
        buildUrl = buildUrl + `&isActive=${queryString.active}`;
      }

      const response = await axios.get(buildUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message.data);
    }
  }
);

export const warehousesSlice = createSlice({
  name: "warehouses",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
    resetWarehouse: (state) => {
      state.status = "idle";
      state.warehouses = [];
      state.count = 0;
      state.error = null;
    },
    resetCount: (state) => {
      state.count = 0;
    },
  },
  extraReducers: {
    [getWarehouses.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [getWarehouses.fulfilled]: (state, action) => {
      state.status = "success";
      state.warehouses = [...state.warehouses, ...action.payload.data.users];
      state.count = action.payload.count;
      state.error = null;
    },
    [getWarehouses.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
    },
  },
});

export const selectWarehouses = (state) => state.warehouses;

export const { resetError, resetStatus, resetWarehouse } =
  warehousesSlice.actions;

export default warehousesSlice.reducer;
