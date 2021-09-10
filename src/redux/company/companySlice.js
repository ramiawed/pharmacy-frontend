import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../utils/constants";

let CancelToken;
let source;

const initialState = {
  status: "idle",
  companies: [],
  count: 0,
  error: "",
  pageState: {
    searchName: "",
    searchCity: "",
    displayType: "list",
    showFavorites: false,
    page: 1,
  },
};

export const cancelOperation = () => {
  if (source) {
    source.cancel("operation canceled by user");
  }
};

export const getCompanies = createAsyncThunk(
  "companies/getCompanies",
  async ({ token }, { rejectWithValue, getState }) => {
    const {
      companies: { pageState },
    } = getState();

    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source;

      let buildUrl = `${BASEURL}/users?type=company&page=${pageState.page}&limit=9`;

      if (pageState.searchName.trim() !== "") {
        buildUrl = buildUrl + `&name=${pageState.searchName}`;
      }

      if (pageState.searchCity.trim() !== "") {
        buildUrl = buildUrl + `&city=${pageState.searchCity}`;
      }

      buildUrl = buildUrl + `&isApproved=true`;

      buildUrl = buildUrl + `&isActive=true`;

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

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    changeSearchName: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchName: action.payload,
      };
    },

    changeSearchCity: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchCity: action.payload,
      };
    },

    changeDisplayType: (state, action) => {
      state.pageState = {
        ...state.pageState,
        displayType: action.payload,
      };
    },

    changePage: (state, action) => {
      state.pageState = {
        ...state.pageState,
        page: action.payload,
      };
    },

    changeShowFavorites: (state, action) => {
      state.pageState = {
        ...state.pageState,
        showFavorites: action.payload,
      };
    },

    resetCompaniesPageState: (state) => {
      state.pageState = {
        searchName: "",
        searchCity: "",
        displayType: "list",
        page: 1,
      };
    },

    resetError: (state) => {
      state.error = null;
    },

    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },

    resetCompanies: (state) => {
      state.status = "idle";
      state.companies = [];
      state.count = 0;
      state.error = null;
    },

    resetCount: (state) => {
      state.count = 0;
    },

    companySliceSignOut: (state) => {
      state.status = "idle";
      state.companies = [];
      state.count = 0;
      state.error = "";
      state.pageState = {
        searchName: "",
        searchCity: "",
        displayType: "list",
        showFavorites: false,
        page: 1,
      };
    },
  },
  extraReducers: {
    [getCompanies.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getCompanies.fulfilled]: (state, action) => {
      state.status = "success";
      state.companies = [...state.companies, ...action.payload.data.users];
      state.count = action.payload.count;
      state.error = null;
    },
    [getCompanies.rejected]: (state, { payload }) => {
      state.status = "failed";

      if (payload === "timeout") {
        state.error = "timeout";
      } else if (payload === "cancel") {
        state.error = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.error = "network failed";
      } else state.error = payload.message;
    },
  },
});

export const selectCompanies = (state) => state.companies;
export const selectCompaniesPageState = (state) => state.companies.pageState;

export const {
  resetError,
  resetStatus,
  resetCompanies,
  resetCompaniesPageState,
  changeSearchName,
  changeSearchCity,
  changeDisplayType,
  changePage,
  companySliceSignOut,
  changeShowFavorites,
} = companiesSlice.actions;

export default companiesSlice.reducer;
