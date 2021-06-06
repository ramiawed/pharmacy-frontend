import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  categories: [],
  error: "",
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/categories`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = "";
    },
    resetCategories: (state) => {
      state.status = "idle";
      state.categories = [];
      state.error = "";
    },
  },
  extraReducers: {
    [getCategories.pending]: (state, action) => {
      state.status = "loading";
      state.error = "";
    },
    [getCategories.fulfilled]: (state, action) => {
      state.status = "success";
      state.categories = action.payload.data.categories;
    },
    [getCategories.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
    },
  },
});

export const { resetError, resetStatus, resetCategories } =
  categoriesSlice.actions;

export const selectCategories = (state) => state.categories.categories;

export default categoriesSlice.reducer;
