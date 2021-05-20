import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  user: null,
  token: "",
  error: "",
};

export const userSignin = createAsyncThunk(
  "user/signin",
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

export const userSignup = createAsyncThunk(
  "user/signup",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/signup", obj);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    [userSignin.pending]: (state, action) => {
      state.status = "loading";
    },
    [userSignin.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.token = action.payload.token;
      state.user = action.payload.data.user;
      state.error = "";
    },
    [userSignin.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.token = "";
      state.user = null;
      state.error = payload.message;
    },
  },
});

export const { resetError } = userSlice.actions;

export const selectToken = (state) => state.user.token;
export const selectUser = (state) => state.user.user;
export const selectError = (state) => state.user.error;
export const selectStatus = (state) => state.user.status;
export const selectUserData = (state) => state.user;

export default userSlice.reducer;
