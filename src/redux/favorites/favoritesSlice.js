import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  favorites: [],
  error: "",
};

export const getFavorites = createAsyncThunk(
  "favorites/getFavorites",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message.data);
    }
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/favorites/add",
        { favoriteId: obj.favoriteId },
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

export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/favorites/remove",
        { favoriteId: obj.favoriteId },
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

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    resetFavorites: (state) => {
      state.status = "idle";
      state.favorites = [];
      state.error = "";
    },
    resetFavoriteError: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    [getFavorites.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [getFavorites.fulfilled]: (state, action) => {
      state.status = "success";
      state.favorites = action.payload.data.favorites;
      state.error = null;
    },
    [getFavorites.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
    },
    [addFavorite.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [addFavorite.fulfilled]: (state, action) => {
      state.status = "success";
      state.favorites = [...state.favorites, action.payload.data.favorite];
      state.error = null;
    },
    [addFavorite.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
    },
    [removeFavorite.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [removeFavorite.fulfilled]: (state, action) => {
      state.status = "success";
      state.favorites = state.favorites.filter(
        (fa) => fa !== action.payload.data.favorite
      );
      state.error = null;
    },
    [removeFavorite.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
    },
  },
});

export const { resetFavorites } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.favorites;

export default favoritesSlice.reducer;
