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
  pageState: {
    searchName: "",
    searchCompanyName: "",
    searchWarehouse: "",
    searchDeletedItems: false,
    searchActiveItems: false,
    searchInWarehouse: false,
    searchOutWarehouse: false,
    sortNameField: 0,
    sortCaliberField: 0,
    sortPriceField: 0,
    sortCustomerPriceField: 0,
    sortFields: "",
    page: 1,
  },
};

export const getItems = createAsyncThunk(
  "items/getItems",
  async ({ queryString, token }, { rejectWithValue, getState }) => {
    CancelToken = axios.CancelToken;
    source = CancelToken.source;

    const {
      items: { pageState },
    } = getState();

    try {
      let buildUrl = `${BASEURL}/items?page=${queryString.page}&limit=9`;

      if (queryString.companyId) {
        buildUrl = buildUrl + `&companyId=${queryString.companyId}`;
      }

      if (queryString.warehouseId) {
        buildUrl = buildUrl + `&warehouseId=${queryString.warehouseId}`;
      }

      if (pageState.searchName.trim() !== "") {
        buildUrl = buildUrl + `&itemName=${pageState.searchName}`;
      }

      if (pageState.searchCompanyName.trim() !== "") {
        buildUrl = buildUrl + `&companyName=${pageState.searchCompanyName}`;
      }

      if (pageState.searchWarehouse.trim() !== "") {
        buildUrl = buildUrl + `&warehouseName=${pageState.searchWarehouse}`;
      }

      if (pageState.searchActiveItems) {
        buildUrl = buildUrl + `&isActive=${true}`;
      }

      if (pageState.searchDeletedItems) {
        buildUrl = buildUrl + `&isActive=${false}`;
      }

      if (pageState.searchInWarehouse) {
        buildUrl = buildUrl + `&inWarehouse=true`;
      }

      if (pageState.searchOutWarehouse) {
        buildUrl = buildUrl + `&outWarehouse=true`;
      }

      if (pageState.sortFields.length > 0) {
        buildUrl = buildUrl + `&sort=${pageState.sortFields}`;
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

export const addItem = createAsyncThunk(
  "items/addItem",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(`${BASEURL}/items`, obj, {
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

export const addItems = createAsyncThunk(
  "items/addItems",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(`${BASEURL}/items/excel`, obj, {
        timeout: 25000,
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
          timeout: 10000,
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

export const changeItemOffer = createAsyncThunk(
  "items/changeItemOffer",
  async ({ _id, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.get(`${BASEURL}/items/item/${_id}`, {
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

    setSearchName: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchName: action.payload,
      };
    },

    setSearchCompanyName: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchCompanyName: action.payload,
      };
    },

    setSearchWarehouse: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchWarehouse: action.payload,
      };
    },

    setSearchDeletedItems: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchDeletedItems: action.payload,
      };
    },

    setSearchActiveItems: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchActiveItems: action.payload,
      };
    },

    setSearchInWarehouse: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchInWarehouse: action.payload,
      };
    },

    setSearchOutWarehouse: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchOutWarehouse: action.payload,
      };
    },

    setSortNameField: (state, action) => {
      state.pageState = {
        ...state.pageState,
        sortNameField: action.payload,
      };
    },

    setSortCaliberField: (state, action) => {
      state.pageState = {
        ...state.pageState,
        sortCaliberField: action.payload,
      };
    },

    setSortPriceField: (state, action) => {
      state.pageState = {
        ...state.pageState,
        sortPriceField: action.payload,
      };
    },

    setSortCustomerPriceField: (state, action) => {
      state.pageState = {
        ...state.pageState,
        sortCustomerPriceField: action.payload,
      };
    },

    setSortFields: (state, action) => {
      state.pageState = {
        ...state.pageState,
        sortFields: action.payload,
      };
    },

    setPage: (state, action) => {
      state.pageState = {
        ...state.pageState,
        page: action.payload,
      };
    },

    resetPageState: (state) => {
      state.pageState = {
        searchName: "",
        searchCompanyName: "",
        searchWarehouse: "",
        searchDeletedItems: false,
        searchActiveItems: false,
        searchInWarehouse: false,
        searchOutWarehouse: false,
        sortNameField: 0,
        sortCaliberField: 0,
        sortPriceField: 0,
        sortCustomerPriceField: 0,
        sortFields: "",
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
        searchName: "",
        searchCompanyName: "",
        searchWarehouse: "",
        searchDeletedItems: false,
        searchActiveItems: false,
        searchInWarehouse: false,
        searchOutWarehouse: false,
        sortNameField: 0,
        sortCaliberField: 0,
        sortPriceField: 0,
        sortCustomerPriceField: 0,
        sortFields: "",
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
    [changeItemOffer.pending]: (state) => {
      state.changeOfferStatus = "loading";
    },
    [changeItemOffer.fulfilled]: (state, action) => {
      state.changeOfferStatus = "succeeded";
      const newItems = state.items.map((item) => {
        if (item._id === action.payload.data.item._id) {
          return action.payload.data.item;
        } else return item;
      });

      state.items = newItems;
    },
    [changeItemOffer.rejected]: (state, { payload }) => {
      state.changeOfferStatus = "failed";

      if (payload === "timeout") {
        state.changeOfferError = "timeout-msg";
      } else if (payload === "cancel") {
        state.changeOfferError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.changeOfferError = "network failed";
      } else state.changeOfferError = payload.message;
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
  setSearchName,
  setSearchCompanyName,
  setSearchWarehouse,
  setSearchDeletedItems,
  setSearchActiveItems,
  setSearchInWarehouse,
  setSearchOutWarehouse,
  setSortNameField,
  setSortCaliberField,
  setSortPriceField,
  setSortCustomerPriceField,
  setSortFields,
  setPage,
} = itemsSlice.actions;

export const selectItems = (state) => state.items;

export default itemsSlice.reducer;
