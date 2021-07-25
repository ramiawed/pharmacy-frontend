import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  companies: [],
  count: 0,
  error: "",
  pageState: {
    searchName: "",
    searchCity: "",
    displayType: "list",
    page: 1,
  },
};

export const getCompanies = createAsyncThunk(
  "companies/getCompanies",
  async ({ queryString, token }, { rejectWithValue }) => {
    try {
      let buildUrl = `/users?type=company&page=${queryString.page}&limit=9`;

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
    resetSearchName: (state) => {
      state.pageState = {
        ...state.pageState,
        searchName: "",
      };
    },
    changeSearchCity: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchCity: action.payload,
      };
    },
    resetSearchCity: (state) => {
      state.pageState = {
        ...state.pageState,
        searchCity: "",
      };
    },
    changeDisplayType: (state, action) => {
      state.pageState = {
        ...state.pageState,
        displayType: action.payload,
      };
    },
    resetDisplayType: (state) => {
      state.pageState = {
        ...state.pageState,
        displayType: "list",
      };
    },
    changePage: (state) => {
      state.pageState = {
        ...state.pageState,
        page: state.pageState.page + 1,
      };
    },
    resetPage: (state) => {
      state.pageState = {
        ...state.pageState,
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
      // state.state = {
      //   searchName: "",
      //   searchCity: "",
      //   displayType: "list",
      //   page: 1,
      // };
    },
    resetCount: (state) => {
      state.count = 0;
    },
    resetCompaniesPageState: (state) => {
      state.pageState = {
        searchName: "",
        searchCity: "",
        displayType: "list",
        page: 1,
      };
    },
  },
  extraReducers: {
    [getCompanies.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [getCompanies.fulfilled]: (state, action) => {
      state.status = "success";
      state.companies = [...state.companies, ...action.payload.data.users];
      state.count = action.payload.count;
      state.error = null;
    },
    [getCompanies.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
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
  resetSearchName,
  resetSearchCity,
  resetDisplayType,
  resetPage,
} = companiesSlice.actions;

export default companiesSlice.reducer;
