import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  statue: "idle",
  items: [],
  error: "",
};

export const getItems = createAsyncThunk(
  "items/getItems",
  async ({ queryString, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/items", {
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

export const addItem = createAsyncThunk(
  "items/addItem",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      console.log(obj);
      console.log(token);
      const response = await axios.post("/items", obj, {
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
    resetItems: (state) => {
      state.status = "idle";
      state.items = [];
      state.error = "";
    },
  },
  extraReducers: {
    [getItems.pending]: (state, action) => {
      state.status = "loading";
    },
    [getItems.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload.data.items;
      state.error = "";
    },
    [getItems.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
    },
    [addItem.pending]: (state, action) => {
      state.status = "loading";
    },
    [addItem.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.items = [...state.items, action.payload.data.item];
      state.error = "";
    },
    [addItem.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
    },
  },
});

export const { resetStatus, resetError, resetItems } = itemsSlice.actions;

export const selectItems = (state) => state.items;

export default itemsSlice.reducer;
