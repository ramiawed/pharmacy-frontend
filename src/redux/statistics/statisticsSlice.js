import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  usersStatistics: [],
  itemsStatistics: [],
  error: "",
};

// user sign in
export const statisticsSignin = createAsyncThunk(
  "statistics/signin",
  async ({ token }, { rejectWithValue }) => {
    try {
      console.log("increment signin");
      const response = await axios.post(
        "/statistics/signin",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

// select a company
export const statisticsCompanySelected = createAsyncThunk(
  "statistics/selectedCompany",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/statistics/selectedCompany", obj, {
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

// orders
export const statisticsOrders = createAsyncThunk(
  "statistics/orders",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/statistics/orders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// user added to another user's favorites
export const statisticsUserFavorites = createAsyncThunk(
  "statistics/favorite",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/statistics/favorite", obj, {
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

// item added to user item's favorites
export const statisticsItemFavorites = createAsyncThunk(
  "statistics/favoriteItem",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/statistics/favoriteItem", obj, {
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

// item added to cart
export const statisticsItemAddedToCart = createAsyncThunk(
  "statistics/itemAddedToCart",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/statistics/itemAddedToCart", obj, {
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

// item selected
export const statisticsItemSelected = createAsyncThunk(
  "statistics/selectedItem",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/statistics/selectedItem", obj, {
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
    resetUsersStatistics: (state) => {
      state.status = "idle";
      state.usersStatistics = [];
      state.error = "";
    },
    resetItemsStatistics: (state) => {
      state.status = "idle";
      state.itemsStatistics = [];
      state.error = "";
    },
  },
  extraReducers: {
    [statisticsSignin.pending]: (state, action) => {
      state.status = "loading";
    },
    [statisticsSignin.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [statisticsSignin.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const selectUsersStatistics = (state) =>
  state.statistics.usersStatistics;
export const selectItemsStatistics = (state) =>
  state.statistics.itemsStatistics;

export const {
  resetStatisticsStatus,
  resetStatisticsError,
  resetUsersStatistics,
  resetItemsStatistics,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
