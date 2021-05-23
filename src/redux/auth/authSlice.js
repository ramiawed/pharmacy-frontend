import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  user: null,
  token: "",
  error: "",
};

export const authSign = createAsyncThunk(
  "auth/signin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/signin", {
        username,
        password,
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSignup = createAsyncThunk(
  "auth/signup",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/signup", obj);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
    signOut: (state) => {
      console.log("sign out");
      state.status = "idle";
      state.user = null;
      state.token = "";
      state.error = "";
    },
  },
  extraReducers: {
    [authSign.pending]: (state, action) => {
      state.status = "loading";
    },
    [authSign.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.token = action.payload.token;
      state.user = action.payload.data.user;
      state.error = "";
    },
    [authSign.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.token = "";
      state.user = null;
      state.error = payload.message;
    },
  },
});

export const { resetError, signOut } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;
export const selectError = (state) => state.auth.error;
export const selectStatus = (state) => state.auth.status;
export const selectUserData = (state) => state.auth;

export default authSlice.reducer;
