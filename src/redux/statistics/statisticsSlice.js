import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../utils/constants";

let CancelToken;
let source;

const initialState = {
  status: "idle",
  statistics: [],
  count: 0,
  error: "",
  pageState: {
    searchName: "",
    date: "",
    dateOption: "",
    page: 1,
  },
};

export const getStatistics = createAsyncThunk(
  "statistics/getStatistics",
  async ({ obj }, { rejectWithValue, getState }) => {
    const {
      statistics: { pageState },
    } = getState();
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      let response;
      let queryString = "";

      if (obj.type === "users") {
        queryString = `${BASEURL}/statistics/users?page=${pageState.page}&limit=${obj.limit}&field=${obj.field}`;
      } else {
        queryString = `${BASEURL}/statistics/items?page=${pageState.page}&limit=${obj.limit}&field=${obj.field}`;
      }

      if (obj.name) {
        queryString = queryString + `&name=${obj.name}`;
      }

      if (obj.date) {
        queryString = queryString + `&date=${obj.date}&date1=${obj.date1}`;
      }

      response = await axios.get(queryString, {
        timeout: 10000,
        cancelToken: source.token,
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

// user sign in
export const statisticsSignin = createAsyncThunk(
  "statistics/signin",
  async ({ token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/statistics/signin`,
        {},
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

// select a company
export const statisticsCompanySelected = createAsyncThunk(
  "statistics/selectedCompany",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/statistics/selectedCompany`,
        obj,
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

// orders
export const statisticsOrders = createAsyncThunk(
  "statistics/orders",
  async ({ token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/statistics/orders`,
        {},
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

// user added to another user's favorites
export const statisticsUserFavorites = createAsyncThunk(
  "statistics/favorite",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(`${BASEURL}/statistics/favorite`, obj, {
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

// item added to user item's favorites
export const statisticsItemFavorites = createAsyncThunk(
  "statistics/favoriteItem",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/statistics/favoriteItem`,
        obj,
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

// item added to cart
export const statisticsItemAddedToCart = createAsyncThunk(
  "statistics/itemAddedToCart",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/statistics/itemAddedToCart`,
        obj,
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

// item selected
export const statisticsItemSelected = createAsyncThunk(
  "statistics/selectedItem",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/statistics/selectedItem`,
        obj,
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

export const statisticsSlice = createSlice({
  name: "statisticsSlice",
  initialState,
  reducers: {
    resetStatisticsStatus: (state) => {
      state.status = "idle";
    },
    resetStatisticsError: (state) => {
      state.status = "idle";
      state.error = "";
    },
    resetStatistics: (state) => {
      state.status = "idle";
      state.statistics = [];
      state.count = 0;
      state.error = "";
    },
    resetPageState: (state) => {
      state.pageState = {
        searchName: "",
        date: "",
        dateOption: "",
        page: 1,
      };
    },

    setSearchName: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchName: action.payload,
      };
    },

    setSearchDate: (state, action) => {
      state.pageState = {
        ...state.pageState,
        date: action.payload,
      };
    },

    setDateOption: (state, action) => {
      state.pageState = {
        ...state.pageState,
        dateOption: action.payload,
      };
    },

    setPage: (state, action) => {
      state.pageState = {
        ...state.pageState,
        page: action.payload,
      };
    },

    statisticsSliceSignOut: (state) => {
      state.status = "idle";
      state.statistics = [];
      state.count = 0;
      state.error = "";
      state.pageState = {
        searchName: "",
        date: "",
        dateOption: "",
        page: 1,
      };
    },
  },
  extraReducers: {
    [getStatistics.pending]: (state) => {
      state.status = "loading";
    },
    [getStatistics.fulfilled]: (state, action) => {
      state.status = "success";
      state.statistics = [...state.statistics, ...action.payload.data.data];
      state.count = action.payload.count;
    },
    [getStatistics.rejected]: (state, { payload }) => {
      state.status = "failed";

      if (payload === "timeout") {
        state.error = payload;
      } else if (payload === "cancel") {
        state.error = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.error = "network failed";
      } else state.error = payload.message;
    },
  },
});

export const selectStatistics = (state) => state.statistics;

export const {
  resetStatisticsStatus,
  resetStatisticsError,
  resetStatistics,
  resetPageState,
  setSearchName,
  setSearchDate,
  setDateOption,
  setPage,
  statisticsSliceSignOut,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
