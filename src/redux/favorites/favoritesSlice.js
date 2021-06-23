import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  favorites: [],
  favorites_items: [],
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
      return rejectWithValue(err.response.data);
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

export const addFavoriteItem = createAsyncThunk(
  "favorites/addFavoriteItem",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/favorites/add/items",
        { favoriteItemId: obj.favoriteItemId },
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

export const removeFavoriteItem = createAsyncThunk(
  "favorites/removeFavoriteItem",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/favorites/remove/items",
        { favoriteItemId: obj.favoriteItemId },
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
      state.favorites_items = [];
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
      if (action.payload.data.favorites !== null) {
        state.favorites = action.payload.data.favorites.favorites;
        state.favorites_items = action.payload.data.favorites.favorites_items;
      }
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
    [addFavoriteItem.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [addFavoriteItem.fulfilled]: (state, action) => {
      state.status = "success";
      state.favorites_items = [
        ...state.favorites_items,
        action.payload.data.favorite,
      ];
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
        (fa) => fa._id !== action.payload.data.favorite
      );
      state.error = null;
    },
    [removeFavorite.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
    },
    [removeFavoriteItem.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [removeFavoriteItem.fulfilled]: (state, action) => {
      state.status = "success";
      state.favorites_items = state.favorites_items.filter(
        (fa) => fa._id !== action.payload.data.favorite
      );
      state.error = null;
    },
    [removeFavoriteItem.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.error = payload.message;
    },
  },
});

export const { resetFavorites } = favoritesSlice.actions;

export const selectFavoritesPartners = (state) => state.favorites.favorites;
export const selectFavoritesItems = (state) => state.favorites.favorites_items;
export const selectFavorites = (state) => state.favorites;

export default favoritesSlice.reducer;
