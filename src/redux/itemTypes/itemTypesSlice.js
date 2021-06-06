import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  itemTypes: [],
  error: "",
};

export const getTypes = createAsyncThunk(
  "itemTypes/getItemTypes",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/itemTypes`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const itemTypesSlice = createSlice({
  name: "itemTypes",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = "";
    },
    resetItemTypes: (state) => {
      state.status = "idle";
      state.itemTypes = [];
      state.error = "";
    },
  },
  extraReducers: {
    [getTypes.pending]: (state, action) => {
      state.status = "loading";
      state.error = "";
    },
    [getTypes.fulfilled]: (state, action) => {
      state.status = "success";
      state.itemTypes = action.payload.data.itemTypes;
    },
    [getTypes.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
    },
  },
});

export const { resetError, resetStatus, resetItemTypes } =
  itemTypesSlice.actions;

export const selectItemTypes = (state) => state.itemTypes.itemTypes;

export default itemTypesSlice.reducer;
