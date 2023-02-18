import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL, DateOptions } from "../../utils/constants";

let CancelToken;
let source;

const initialState = {
  status: "idle",
  statistics: [],
  count: 0,
  error: "",
  pageState: {
    actionType: "",
    searchName: "",
    date: "",
    date1: "",
    dateOption: "",
    page: 1,
  },
};

export const addStatistics = createAsyncThunk(
  "statistics/addStatistics",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(`${BASEURL}/statistics`, obj, {
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

export const getStatistics = createAsyncThunk(
  "statistics/getStatistics",
  async ({ token }, { rejectWithValue, getState }) => {
    const {
      statistics: { pageState },
    } = getState();
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      let response;
      let queryString = `${BASEURL}/statistics?actiontype=${pageState.actionType}&page=${pageState.page}&limit=15`;

      if (pageState.searchName.trim() !== "") {
        queryString = queryString + `&name=${pageState.searchName}`;
      }

      // One Day
      if (
        pageState.dateOption === DateOptions.ONE_DAY &&
        pageState.date !== ""
      ) {
        let nextDay = new Date(pageState.date);
        nextDay.setDate(nextDay.getDate() + 1);
        queryString =
          queryString + `&date=${new Date(pageState.date)}&date1=${nextDay}`;
      }

      // Three Days
      if (
        pageState.dateOption === DateOptions.THREE_DAY &&
        pageState.date !== ""
      ) {
        let nextThreeDays = new Date(pageState.date);
        nextThreeDays.setDate(nextThreeDays.getDate() + 3);
        queryString =
          queryString +
          `&date=${new Date(pageState.date)}&date1=${nextThreeDays}`;
      }

      // One Week
      if (
        pageState.dateOption === DateOptions.ONE_WEEK &&
        pageState.date !== ""
      ) {
        let nextWeek = new Date(pageState.date);
        nextWeek.setDate(nextWeek.getDate() + 7);
        queryString =
          queryString + `&date=${new Date(pageState.date)}&date1=${nextWeek}`;
      }

      // Two Week
      if (
        pageState.dateOption === DateOptions.TWO_WEEK &&
        pageState.date !== ""
      ) {
        let nextTwoWeek = new Date(pageState.date);
        nextTwoWeek.setDate(nextTwoWeek.getDate() + 14);
        queryString =
          queryString +
          `&date=${new Date(pageState.date)}&date1=${nextTwoWeek}`;
      }

      // One Month
      if (
        pageState.dateOption === DateOptions.ONE_MONTH &&
        pageState.date !== ""
      ) {
        let nextMonth = new Date(pageState.date);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        queryString =
          queryString + `&date=${new Date(pageState.date)}&date1=${nextMonth}`;
      }

      // Two Month
      if (
        pageState.dateOption === DateOptions.TWO_MONTH &&
        pageState.date !== ""
      ) {
        let nextTwoMonth = new Date(pageState.date);
        nextTwoMonth.setMonth(nextTwoMonth.getMonth() + 2);

        queryString =
          queryString +
          `&date=${new Date(pageState.date)}&date1=${nextTwoMonth}`;
      }

      // Six Month
      if (
        pageState.dateOption === DateOptions.SIX_MONTH &&
        pageState.date !== ""
      ) {
        let nextSixMonth = new Date(pageState.date);
        nextSixMonth.setMonth(nextSixMonth.getMonth() + 6);

        queryString =
          queryString +
          `&date=${new Date(pageState.date)}&date1=${nextSixMonth}`;
      }

      // One Year
      if (
        pageState.dateOption === DateOptions.ONE_YEAR &&
        pageState.date !== ""
      ) {
        let nextYear = new Date(pageState.date);
        nextYear.setFullYear(nextYear.getFullYear() + 1);

        queryString =
          queryString + `&date=${new Date(pageState.date)}&date1=${nextYear}`;
      }

      response = await axios.get(queryString, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        actionType: "",
        searchName: "",
        date: "",
        date1: "",
        dateOption: "",
        page: 1,
      };
    },

    setActionType: (state, action) => {
      state.pageState = {
        ...state.pageState,
        actionType: action.payload,
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

    resetStatisticsArray: (state) => {
      state.statistics = [];
    },

    statisticsSliceSignOut: (state) => {
      state.status = "idle";
      state.statistics = [];
      state.count = 0;
      state.error = "";
      state.pageState = {
        actionType: "",
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
      state.pageState = {
        ...state.pageState,
        page: state.pageState.page + 1,
      };
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
  setActionType,
  resetStatisticsArray,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
