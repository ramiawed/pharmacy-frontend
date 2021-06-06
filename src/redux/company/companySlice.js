import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  companies: [],
  count: 0,
  error: "",
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

export const { resetError, resetStatus, resetCompanies } =
  companiesSlice.actions;

export default companiesSlice.reducer;
