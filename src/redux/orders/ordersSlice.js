import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL, DateOptions, UserTypeConstants } from "../../utils/constants";

const initialState = {
  status: "idle",
  orders: [],
  count: 0,
  unreadCount: 0,
  // unreadCountDiff: 0,
  // unreadMsg: "",
  error: "",
  forceRefresh: false,
  refresh: true,
  pageState: {
    searchPharmacyName: "",
    searchWarehouseName: "",
    date: "",
    dateOption: "",
    page: 1,
  },
};

let CancelToken;
let source;

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async ({ obj, token }, { rejectWithValue, getState }) => {
    const {
      orders: { pageState },
    } = getState();

    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const { page } = obj;

      let buildUrl = `${BASEURL}/orders?page=${page}&limit=9`;

      if (pageState.searchPharmacyName.length > 0) {
        buildUrl = buildUrl + `&pharmacyName=${pageState.searchPharmacyName}`;
      }

      if (pageState.searchWarehouseName.length > 0) {
        buildUrl = buildUrl + `&warehouseName=${pageState.searchWarehouseName}`;
      }

      // One Day
      if (
        pageState.dateOption === DateOptions.ONE_DAY &&
        pageState.date !== ""
      ) {
        let nextDay = new Date(pageState.date);
        nextDay.setDate(nextDay.getDate() + 1);
        buildUrl =
          buildUrl + `&date=${new Date(pageState.date)}&date1=${nextDay}`;
      }

      // Three Days
      if (
        pageState.dateOption === DateOptions.THREE_DAY &&
        pageState.date !== ""
      ) {
        let nextThreeDays = new Date(pageState.date);
        nextThreeDays.setDate(nextThreeDays.getDate() + 3);
        buildUrl =
          buildUrl + `&date=${new Date(pageState.date)}&date1=${nextThreeDays}`;
      }

      // One Week
      if (
        pageState.dateOption === DateOptions.ONE_WEEK &&
        pageState.date !== ""
      ) {
        let nextWeek = new Date(pageState.date);
        nextWeek.setDate(nextWeek.getDate() + 7);
        buildUrl =
          buildUrl + `&date=${new Date(pageState.date)}&date1=${nextWeek}`;
      }

      // Two Week
      if (
        pageState.dateOption === DateOptions.TWO_WEEK &&
        pageState.date !== ""
      ) {
        let nextTwoWeek = new Date(pageState.date);
        nextTwoWeek.setDate(nextTwoWeek.getDate() + 14);
        buildUrl =
          buildUrl + `&date=${new Date(pageState.date)}&date1=${nextTwoWeek}`;
      }

      // One Month
      if (
        pageState.dateOption === DateOptions.ONE_MONTH &&
        pageState.date !== ""
      ) {
        let nextMonth = new Date(pageState.date);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        buildUrl =
          buildUrl + `&date=${new Date(pageState.date)}&date1=${nextMonth}`;
      }

      // Two Month
      if (
        pageState.dateOption === DateOptions.TWO_MONTH &&
        pageState.date !== ""
      ) {
        let nextTwoMonth = new Date(pageState.date);
        nextTwoMonth.setMonth(nextTwoMonth.getMonth() + 2);

        buildUrl =
          buildUrl + `&date=${new Date(pageState.date)}&date1=${nextTwoMonth}`;
      }

      // Six Month
      if (
        pageState.dateOption === DateOptions.SIX_MONTH &&
        pageState.date !== ""
      ) {
        let nextSixMonth = new Date(pageState.date);
        nextSixMonth.setMonth(nextSixMonth.getMonth() + 6);

        buildUrl =
          buildUrl + `&date=${new Date(pageState.date)}&date1=${nextSixMonth}`;
      }

      // One Year
      if (
        pageState.dateOption === DateOptions.ONE_YEAR &&
        pageState.date !== ""
      ) {
        let nextYear = new Date(pageState.date);
        nextYear.setFullYear(nextYear.getFullYear() + 1);

        buildUrl =
          buildUrl + `&date=${new Date(pageState.date)}&date1=${nextYear}`;
      }

      const response = await axios.get(buildUrl, {
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

export const saveOrder = createAsyncThunk(
  "orders/saveOrder",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(`${BASEURL}/orders`, obj, {
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

// export const getUnreadOrders = createAsyncThunk(
//   "orders/getUnreadOrders",
//   async ({ token }, { rejectWithValue }) => {
//     try {
//       CancelToken = axios.CancelToken;
//       source = CancelToken.source();

//       const response = await axios.get(`${BASEURL}/orders/unread`, {
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

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async ({ token, orderId }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/orders/delete`,
        {
          orderId,
        },
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

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = "";
    },
    resetOrders: (state) => {
      state.status = "idle";
      state.orders = [];
      state.error = "";
      state.count = 0;
    },
    resetError: (state) => {
      state.status = "idle";
      state.error = "";
    },
    setSearchDate: (state, action) => {
      state.pageState = {
        ...state.pageState,
        date: action.payload,
      };
    },

    setForceRefresh: (state, action) => {
      state.forceRefresh = action.payload;
    },

    setDateOption: (state, action) => {
      state.pageState = {
        ...state.pageState,
        dateOption: action.payload,
      };
    },
    setSearchPharmacyName: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchPharmacyName: action.payload,
      };
    },
    setSearchWarehouseName: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchWarehouseName: action.payload,
      };
    },
    setPage: (state, action) => {
      state.pageState = {
        ...state.pageState,
        page: action.payload,
      };
    },

    // setUnreadMsg: (state) => {
    // state.unreadMsg = "";
    // state.unreadCountDiff = 0;
    // },

    resetPageState: (state) => {
      state.pageState = {
        searchPharmacyName: "",
        searchWarehouseName: "",
        date: "",
        dateOption: "",
        page: 1,
      };
    },

    getOrderById: (state, action) => {
      const { orderId, userType } = action.payload;

      if (userType === UserTypeConstants.ADMIN) {
        state.unreadCount = state.unreadCount - 1;
        state.orders = state.orders.map((o) => {
          if (o._id === orderId) {
            return { ...o, seenByAdmin: true };
          } else {
            return o;
          }
        });
      }

      if (userType === UserTypeConstants.WAREHOUSE) {
        state.unreadCount = state.unreadCount - 1;
        state.orders = state.orders.map((o) => {
          if (o._id === orderId) {
            return { ...o, seenByWarehouse: true };
          } else {
            return o;
          }
        });
      }
    },
    orderSliceSignOut: (state) => {
      state.status = "idle";
      state.orders = [];
      state.count = 0;
      state.error = "";
      state.unreadCount = 0;
      // state.unreadCountDiff = 0;
      // state.unreadMsg = "";
      state.forceRefresh = false;
      state.refresh = true;
      state.pageState = {
        searchPharmacyName: "",
        searchWarehouseName: "",
        date: "",
        dateOption: "",
        page: 1,
      };
    },
  },

  extraReducers: {
    [getOrders.pending]: (state) => {
      state.status = "loading";
    },
    [getOrders.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.orders = action.payload.data.orders;
      state.count = action.payload.count;
      state.error = "";
      state.forceRefresh = false;
      state.refresh = false;
    },
    [getOrders.rejected]: (state, { payload }) => {
      state.status = "failed";

      if (payload === "timeout") {
        state.error = "timeout-msg";
      } else if (payload === "cancel") {
        state.error = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.error = "network failed";
      } else state.error = payload.message;
    },
    [deleteOrder.pending]: (state) => {
      state.status = "loading";
    },
    [deleteOrder.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.orders = state.orders.filter(
        (o) => o._id !== action.payload.data.orderId
      );
      state.error = "";
    },
    [deleteOrder.rejected]: (state, { payload }) => {
      state.status = "failed";

      if (payload === "timeout") {
        state.error = "timeout-msg";
      } else if (payload === "cancel") {
        state.error = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.error = "network failed";
      } else state.error = payload.message;
    },
    // [getUnreadOrders.fulfilled]: (state, action) => {
    //   if (state.unreadCount * 1 !== action.payload.data.count * 1) {
    //     if (state.unreadCount * 1 < action.payload.data.count * 1) {
    // state.unreadMsg = "new-orders";
    //     }
    // state.unreadCountDiff =
    //       action.payload.data.count * 1 - state.unreadCount;
    //     state.unreadCount = action.payload.data.count;
    //   }
    // },
  },
});

export const selectOrders = (state) => state.orders;

export const {
  resetStatus,
  resetOrders,
  resetError,
  setSearchPharmacyName,
  setSearchWarehouseName,
  setPage,
  resetPageState,
  setRefresh,
  setDateOption,
  // setUnreadMsg,
  setSearchDate,
  orderSliceSignOut,
  getOrderById,
  setForceRefresh,
} = ordersSlice.actions;

export default ordersSlice.reducer;
