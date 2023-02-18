import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../utils/constants";

let CancelToken;
let source;

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
  changeLogoStatus: "idle",
  changeLogoError: "",
  changeOfferStatus: "idle",
  changeOfferError: "",
  removeFromWarehouseStatus: "idle",
  pageState: {
    role: null,
    company: null,
    warehouse: null,
    searchName: "",
    searchCompaniesIds: [],
    searchWarehousesIds: [],
    searchDeletedItems: false,
    searchActiveItems: false,
    searchInWarehouse: false,
    searchOutWarehouse: false,
    page: 1,
  },
};

export const cancelOperation = () => {
  if (source) {
    source.cancel("operation canceled by user");
  }
};

const resetCancelAndSource = () => {
  CancelToken = null;
  source = null;
};

export const getItems = createAsyncThunk(
  "items/getItems",
  async ({ token }, { rejectWithValue, getState }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const {
        items: { pageState },
        warehouses: { warehouses },
      } = getState();

      let buildUrl = `${BASEURL}/items?page=${pageState.page}&limit=15`;

      if (pageState.company) {
        buildUrl = buildUrl + `&companyId=${pageState.company._id}`;
      }

      if (pageState.warehouse) {
        buildUrl = buildUrl + `&warehouseId=${pageState.warehouse._id}`;
      }

      if (pageState.searchName.trim() !== "") {
        buildUrl = buildUrl + `&itemName=${pageState.searchName.trim()}`;
      }

      if (pageState.searchActiveItems) {
        buildUrl = buildUrl + `&isActive=${true}`;
      }

      if (pageState.searchDeletedItems) {
        buildUrl = buildUrl + `&isActive=${false}`;
      }

      const response = await axios.get(buildUrl, {
        params: {
          searchCompaniesIds: pageState.searchCompaniesIds.map(
            (company) => company.value
          ),
          searchWarehousesIds: pageState.searchWarehousesIds.map(
            (warehouse) => warehouse.value
          ),
          searchInWarehouses: pageState.searchInWarehouse
            ? warehouses.map((w) => w._id)
            : null,
          searchOutWarehouses: pageState.searchOutWarehouse
            ? warehouses.map((w) => w._id)
            : null,
          userWarehouses: warehouses ? warehouses.map((w) => w._id) : [],
        },
        // timeout: 10000,
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      resetCancelAndSource();

      return response.data;
    } catch (err) {
      resetCancelAndSource();
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

export const addItem = createAsyncThunk(
  "items/addItem",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(`${BASEURL}/items`, obj, {
        // timeout: 10000,
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

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/items/item/${obj._id}`,
        { ...obj },
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

export const addItems = createAsyncThunk(
  "items/addItems",
  async ({ obj, token, withUpdate }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/items/excel?withUpdate=${withUpdate}`,
        obj,
        {
          // timeout: 100000,
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

export const changeItemActiveState = createAsyncThunk(
  "items/changeActive",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/items/active/${obj.itemId}`,
        { action: obj.action },
        {
          // timeout: 10000,
          cancelToken: source.token,

          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
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

export const changeItemLogo = createAsyncThunk(
  "items/changeLogo",
  async ({ data, _id, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/items/upload/${_id}`,
        data,
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

export const removeItemFromWarehouse = createAsyncThunk(
  "items/removeFromWarehouse",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/items/warehouse/remove-item/${obj.itemId}`,
        { warehouseId: obj.warehouseId },
        {
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

export const changeItemWarehouseMaxQty = createAsyncThunk(
  "items/changeItemsMaxQty",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/items/warehouse/change-max-qty/${obj.itemId}`,
        { warehouseId: obj.warehouseId, qty: obj.qty },
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

// export const changeItemOffer = createAsyncThunk(
//   "items/changeItemOffer",
//   async ({ _id, token }, { rejectWithValue }) => {
//     try {
//       CancelToken = axios.CancelToken;
//       source = CancelToken.source();

//       const response = await axios.get(`${BASEURL}/items/item/${_id}`, {
//         // timeout: 10000,
//         cancelToken: source.token,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (err) {
//       if (err.code === "ECONNABORTED" && err.message.startsWith("timeout")) {
//         return rejectWithValue("timeout");
//       }
//       if (axios.isCancel(err)) {
//         return rejectWithValue("cancel");
//       }
//       if (!err.response) {
//         return rejectWithValue("network failed");
//       }
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const changeItemWarehouseOffer = createAsyncThunk(
  "items/changeItemsOffer",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/items/warehouse/change-offer/${obj.itemId}`,
        { warehouseId: obj.warehouseId, offer: obj.offer },
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
    resetChangeLogoStatus: (state) => {
      state.changeLogoStatus = "idle";
      state.changeLogoError = "";
    },
    resetChangeLogoError: (state) => {
      state.changeLogoError = "";
    },
    resetChangeOfferStatus: (state) => {
      state.changeOfferStatus = "idle";
      state.changeOfferError = "";
    },
    resetChangeOfferError: (state) => {
      state.changeOfferError = "";
    },
    setPageState: (state, action) => {
      state.pageState = {
        ...state.pageState,
        ...action.payload,
      };
    },
    warehouseAddBonusSocket: (state, action) => {
      state.items = state.items.map((m) => {
        if (m._id === action.payload.itemId) {
          return {
            ...m,
            warehouses: action.payload.warehouses,
          };
        }
        return m;
      });
    },

    clearFilter: (state) => {
      state.pageState = {
        ...state.pageState,
        searchName: "",
        searchCompaniesIds: [],
        searchWarehousesIds: [],
        searchDeletedItems: false,
        searchActiveItems: false,
        searchInWarehouse: false,
        searchOutWarehouse: false,
        page: 1,
      };
    },

    warehouseAddOrRemoveItemSocket: (state, action) => {
      state.items = state.items.map((m) => {
        if (m._id === action.payload.itemId) {
          return {
            ...m,
            warehouses: action.payload.warehouses,
          };
        }
        return m;
      });
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
      state.changeLogoStatus = "idle";
      state.changeLogoError = "";
    },

    setPage: (state, action) => {
      state.pageState = {
        ...state.pageState,
        page: action.payload,
      };
    },

    setRole: (state, action) => {
      state.pageState = {
        ...state.pageState,
        role: action.payload,
      };
    },

    setCompany: (state, action) => {
      state.pageState = {
        ...state.pageState,
        company: action.payload,
      };
    },

    setWarehouse: (state, action) => {
      state.pageState = {
        ...state.pageState,
        warehouse: action.payload,
      };
    },

    addIdToCompaniesIds: (state, action) => {
      const { value } = action.payload;
      if (
        state.pageState.searchCompaniesIds.filter(
          (company) => company.value === value
        ).length === 0
      ) {
        state.pageState = {
          ...state.pageState,
          searchCompaniesIds: [
            ...state.pageState.searchCompaniesIds,
            action.payload,
          ],
        };
      }
    },

    removeIdFromCompaniesId: (state, action) => {
      const id = action.payload;
      const filteredArray = state.pageState.searchCompaniesIds.filter(
        (i) => i.value !== id
      );
      state.pageState = {
        ...state.pageState,
        searchCompaniesIds: [...filteredArray],
      };
    },

    addIdToWarehousesIds: (state, action) => {
      const { value } = action.payload;
      if (
        state.pageState.searchWarehousesIds.filter(
          (warehouse) => warehouse.value === value
        ).length === 0
      ) {
        state.pageState = {
          ...state.pageState,
          searchWarehousesIds: [
            ...state.pageState.searchWarehousesIds,
            action.payload,
          ],
        };
      }
    },

    removeIdFromWarehousesId: (state, action) => {
      const id = action.payload;
      const filteredArray = state.pageState.searchWarehousesIds.filter(
        (i) => i.value !== id
      );
      state.pageState = {
        ...state.pageState,
        searchWarehousesIds: [...filteredArray],
      };
    },

    resetPageState: (state) => {
      state.pageState = {
        role: null,
        company: null,
        warehouse: null,
        searchName: "",
        searchCompaniesIds: [],
        searchWarehousesIds: [],
        searchDeletedItems: false,
        searchActiveItems: false,
        searchInWarehouse: false,
        searchOutWarehouse: false,
        page: 1,
      };
    },

    itemsSliceSignOut: (state) => {
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
      state.changeLogoStatus = "idle";
      state.changeLogoError = "";
      state.pageState = {
        role: null,
        company: null,
        warehouse: null,
        searchName: "",
        searchCompaniesIds: [],
        searchWarehousesIds: [],
        searchDeletedItems: false,
        searchActiveItems: false,
        searchInWarehouse: false,
        searchOutWarehouse: false,
        page: 1,
      };
    },
  },

  extraReducers: {
    [getItems.pending]: (state) => {
      state.status = "loading";
    },
    [getItems.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload.data.items;
      state.count = action.payload.count;
      state.error = "";
    },
    [getItems.rejected]: (state, { payload }) => {
      state.status = "failed";

      if (payload === "timeout") {
        state.error = "timeout-msg";
      } else if (payload === "cancel") {
        state.error = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.error = "network failed";
      } else state.error = payload.message;
    },
    [addItem.pending]: (state) => {
      state.addStatus = "loading";
    },
    [addItem.fulfilled]: (state) => {
      state.addStatus = "succeeded";
      state.addError = "";
    },
    [addItem.rejected]: (state, { payload }) => {
      state.addStatus = "failed";

      if (payload === "timeout") {
        state.addError = "timeout-msg";
      } else if (payload === "cancel") {
        state.addError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.addError = "network failed";
      } else state.addError = payload.message;
    },
    [addItems.pending]: (state) => {
      state.addStatus = "loading";
    },
    [addItems.fulfilled]: (state) => {
      state.addStatus = "succeeded";
      state.addError = "";
    },
    [addItems.rejected]: (state, { payload }) => {
      state.addStatus = "failed";

      if (payload === "timeout") {
        state.addError = "timeout-msg";
      } else if (payload === "cancel") {
        state.addError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.addError = "network failed";
      } else state.addError = payload.message;
    },
    [changeItemActiveState.pending]: (state) => {
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
    [changeItemActiveState.rejected]: (state, { payload }) => {
      state.activeStatus = "failed";

      if (payload === "timeout") {
        state.activeError = "timeout-msg";
      } else if (payload === "cancel") {
        state.activeError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.activeError = "network failed";
      } else state.activeError = payload.message;
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
    [updateItem.rejected]: (state, { payload }) => {
      state.updateStatus = "failed";

      if (payload === "timeout") {
        state.updateError = "timeout-msg";
      } else if (payload === "cancel") {
        state.updateError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.updateError = "network failed";
      } else state.updateError = payload.message;
    },
    [changeItemLogo.pending]: (state) => {
      state.changeLogoStatus = "loading";
    },
    [changeItemLogo.fulfilled]: (state) => {
      state.changeLogoStatus = "succeeded";
    },
    [changeItemLogo.rejected]: (state, { payload }) => {
      state.changeLogoStatus = "failed";

      if (payload === "timeout") {
        state.changeLogoError = "timeout-msg";
      } else if (payload === "cancel") {
        state.changeLogoError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.changeLogoError = "network failed";
      } else state.changeLogoError = payload.message;
    },
    [changeItemWarehouseOffer.pending]: (state, action) => {
      state.changeOfferStatus = "loading";
    },
    [changeItemWarehouseOffer.fulfilled]: (state, action) => {
      state.changeOfferStatus = "succeeded";
      state.items = state.items.map((item) => {
        if (item._id === action.payload.data.item._id) {
          return action.payload.data.item;
        } else return item;
      });
    },
    [changeItemWarehouseOffer.rejected]: (state, { payload }) => {
      state.changeOfferStatus = "failed";

      if (payload === "timeout") {
        state.changeOfferError = "timeout-msg";
      } else if (payload === "cancel") {
        state.changeOfferError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.changeOfferError = "network failed";
      } else state.changeOfferError = payload.message;
    },
    [removeItemFromWarehouse.pending]: (state) => {
      state.removeFromWarehouseStatus = "loading";
    },
    [removeItemFromWarehouse.fulfilled]: (state, action) => {
      state.removeFromWarehouseStatus = "succeeded";
      state.items = state.items.filter(
        (item) => item._id !== action.payload.data.item._id
      );
    },
    [removeItemFromWarehouse.rejected]: (state, action) => {
      state.removeFromWarehouseStatus = "failed";
      if (action.payload === "timeout") {
        state.removeFromWarehouseError = "timeout-msg";
      } else if (action.payload === "cancel") {
        state.removeFromWarehouseError = "cancel-operation-msg";
      } else if (action.payload === "network failed") {
        state.removeFromWarehouseError = "network failed";
      } else state.removeFromWarehouseError = action.payload.message;
    },
    [changeItemWarehouseMaxQty.pending]: (state) => {
      state.updateStatus = "loading";
    },
    [changeItemWarehouseMaxQty.fulfilled]: (state, action) => {
      state.updateStatus = "succeeded";
    },
    [changeItemWarehouseMaxQty.rejected]: (state, { payload }) => {
      state.updateStatus = "failed";

      if (payload === "timeout") {
        state.changeMaxQtyError = "timeout-msg";
      } else if (payload === "cancel") {
        state.changeMaxQtyError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.changeMaxQtyError = "network failed";
      } else state.changeMaxQtyError = payload.message;
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
  resetChangeLogoStatus,
  resetChangeLogoError,
  resetChangeOfferStatus,
  resetChangeOffersError,
  itemsSliceSignOut,
  resetPageState,
  setPage,
  clearFilter,
  addIdToCompaniesIds,
  removeIdFromCompaniesId,
  addIdToWarehousesIds,
  removeIdFromWarehousesId,
  warehouseAddBonusSocket,
  warehouseAddOrRemoveItemSocket,
  setPageState,
} = itemsSlice.actions;

export const selectItems = (state) => state.items;

export default itemsSlice.reducer;
