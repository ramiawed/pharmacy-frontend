import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../utils/constants";

let CancelToken;
let source;

const initialState = {
  status: "idle",
  medicines: [],
  count: 0,
  error: "",
  addToWarehouseStatus: "idle",
  addToWarehouseError: "",
  removeFromWarehouseStatus: "idle",
  removeFromWarehouseError: "",
};

export const getMedicines = createAsyncThunk(
  "medicines/getMedicines",
  async ({ queryString, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source;
      let buildUrl = `${BASEURL}/items?page=${queryString.page}&limit=9`;

      if (queryString.companyId) {
        buildUrl = buildUrl + `&companyId=${queryString.companyId}`;
      }

      if (queryString.warehouseId) {
        buildUrl = buildUrl + `&warehouseId=${queryString.warehouseId}`;
      }

      if (queryString.name) {
        buildUrl = buildUrl + `&itemName=${queryString.name}`;
      }

      if (queryString.searchCompanyName) {
        buildUrl = buildUrl + `&companyName=${queryString.searchCompanyName}`;
      }

      if (queryString.searchWarehouseName) {
        buildUrl =
          buildUrl + `&warehouseName=${queryString.searchWarehouseName}`;
      }

      if (queryString.searchInWarehouse) {
        buildUrl = buildUrl + `&inWarehouse=true`;
      }

      if (queryString.searchOutWarehouse) {
        buildUrl = buildUrl + `&outWarehouse=true`;
      }

      const response = await axios.get(buildUrl, {
        timeout: 10000,
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export const addItemToWarehouse = createAsyncThunk(
  "medicines/addToWarehouse",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/items/warehouse/add-item/${obj.itemId}`,
        { warehouseId: obj.warehouseId },
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

export const removeItemFromWarehouse = createAsyncThunk(
  "medicines/removeFromWarehouse",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/items/warehouse/remove-item/${obj.itemId}`,
        { warehouseId: obj.warehouseId },
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

export const medicinesSlice = createSlice({
  name: "medicinesSlice",
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
      state.removeFromWarehouseStatus = "idle";
      state.removeFromWarehouseError = "";
    },
    resetRemoveFromWarehouseError: (state) => {
      state.removeFromWarehouseError = "";
    },
    resetMedicines: (state) => {
      state.status = "idle";
      state.medicines = [];
      state.count = 0;
      state.error = "";
      state.addToWarehouseStatus = "idle";
      state.addToWarehouseError = "";
      state.removeFromWarehouseStatus = "idle";
      state.removeFromWarehouseError = "";
    },
    medicinesSliceSignOut: (state) => {
      state.status = "idle";
      state.medicines = [];
      state.count = 0;
      state.error = "";
      state.addToWarehouseStatus = "idle";
      state.addToWarehouseError = "";
      state.removeFromWarehouseStatus = "idle";
      state.removeFromWarehouseError = "";
    },
  },
  extraReducers: {
    [getMedicines.pending]: (state, action) => {
      state.status = "loading";
    },
    [getMedicines.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.medicines = [...state.medicines, ...action.payload.data.items];
      state.count = action.payload.count;
      state.error = "";
    },
    [getMedicines.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";

      if (payload === "timeout") {
        state.error = payload;
      } else if (payload === "cancel") {
        state.error = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.error = "network failed";
      } else state.error = payload.message;
    },
    [addItemToWarehouse.pending]: (state, action) => {
      state.addToWarehouseStatus = "loading";
    },
    [addItemToWarehouse.fulfilled]: (state, action) => {
      state.addToWarehouseStatus = "succeeded";

      const newItems = state.medicines.map((item) => {
        if (item._id === action.payload.data.item._id) {
          return action.payload.data.item;
        } else return item;
      });

      state.medicines = newItems;
    },
    [addItemToWarehouse.rejected]: (state, { error, meta, payload }) => {
      state.addToWarehouseStatus = "failed";

      if (payload === "timeout") {
        state.addToWarehouseError = payload;
      } else if (payload === "cancel") {
        state.addToWarehouseError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.addToWarehouseError = "network failed";
      } else state.addToWarehouseError = payload.message;
    },
    [removeItemFromWarehouse.pending]: (state, action) => {
      state.RemoveFromWarehouseStatus = "loading";
    },
    [removeItemFromWarehouse.fulfilled]: (state, action) => {
      state.RemoveFromWarehouseStatus = "succeeded";
      const newItems = state.medicines.map((item) => {
        if (item._id === action.payload.data.item._id) {
          return action.payload.data.item;
        } else return item;
      });

      state.medicines = newItems;
    },
    [removeItemFromWarehouse.rejected]: (state, { error, meta, payload }) => {
      state.RemoveFromWarehouseStatus = "failed";

      if (payload === "timeout") {
        state.removeFromWarehouseError = payload;
      } else if (payload === "cancel") {
        state.removeFromWarehouseError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.removeFromWarehouseError = "network failed";
      } else state.removeFromWarehouseError = payload.message;
    },
  },
});

export const {
  resetStatus,
  resetError,
  resetMedicines,
  medicinesSliceSignOut,
} = medicinesSlice.actions;

export const selectMedicines = (state) => state.medicines;

export default medicinesSlice.reducer;
