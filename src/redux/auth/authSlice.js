import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  updateStatus: "idle",
  user: null,
  token: "",
  error: "",
  passwordError: "",
  deleteError: "",
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
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/signup", obj, {
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

export const updateUserInfo = createAsyncThunk(
  "auth/updateUser",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/updateMe", obj, {
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

export const changeMyPassword = createAsyncThunk(
  "auth/changeMyPassword",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/changeMyPassword", obj, {
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

export const deleteMe = createAsyncThunk(
  "auth/deleteMe",
  async ({ obj, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/deleteMe", obj, {
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.status = "idle";
      state.error = "";
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = "";
    },
    signOut: (state) => {
      state.status = "idle";
      state.updateStatus = "idle";
      state.user = null;
      state.token = "";
      state.error = "";
      state.passwordError = "";
      state.deleteError = "";
    },
    resetPasswordError: (state) => {
      state.passwordError = "";
    },
    resetDeleteError: (state) => {
      state.deleteError = "";
    },
  },
  extraReducers: {
    [authSign.pending]: (state, action) => {
      state.status = "loading";
      state.error = "";
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
    [updateUserInfo.pending]: (state, action) => {
      state.updateStatus = "loading";
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      state.updateStatus = "succeeded";
      state.user = action.payload.data.user;
    },
    // [updateUserInfo.rejected]: (state, { error, meta, payload }) => {
    //   state.status = "failed";
    //   state.error = payload.message;
    // },
    [changeMyPassword.pending]: (state, action) => {
      state.status = "loading";
      state.passwordError = "";
    },
    [changeMyPassword.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.data.user;
    },
    [changeMyPassword.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.passwordError = payload.message;
    },
    [deleteMe.pending]: (state, action) => {
      state.status = "loading";
      state.deleteError = "";
    },
    [deleteMe.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = null;
    },
    [deleteMe.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.deleteError = payload.message;
    },
  },
});

export const {
  resetError,
  resetStatus,
  signOut,
  resetPasswordError,
  resetDeleteError,
} = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;
export const selectError = (state) => state.auth.error;
export const selectStatus = (state) => state.auth.status;
export const selectUserData = (state) => state.auth;

export default authSlice.reducer;
