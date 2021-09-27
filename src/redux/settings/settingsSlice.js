import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../utils/constants";

const initialState = {
  status: "idle",
  settings: {},
  error: "",
};

let CancelToken;
let source;

export const getAllSettings = createAsyncThunk(
  "settings/getAllSetting",
  async ({ token, rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.get(`${BASEURL}/settings`, {
        timeout: 10000,
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      if (err.code === "ECONNABORTED" && err.message.startsWith("timeout")) {
        return rejectWithValue("timeout");
      }
      if (axios.isCancel(err)) {
        return rejectWithValue("cancel");
      }

      if (!err.response) {
        return rejectWithValue("network failed");
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async ({ obj, token, rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(`${BASEURL}/settings`, obj, {
        timeout: 10000,
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      if (err.code === "ECONNABORTED" && err.message.startsWith("timeout")) {
        return rejectWithValue("timeout");
      }
      if (axios.isCancel(err)) {
        return rejectWithValue("cancel");
      }

      if (!err.response) {
        return rejectWithValue("network failed");
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    resetSettingStatus: (state) => {
      state.status = "idle";
    },
    resetSettingError: (state) => {
      state.status = "idle";
      state.error = "";
    },
    resetSetting: (state) => {
      state.status = "idle";
      state.error = "";
      state.settings = {};
    },
  },
  extraReducers: {
    [getAllSettings.pending]: (state) => {
      state.status = "loading";
    },
    [getAllSettings.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.settings = action.payload.data.settings[0];
    },
    [getAllSettings.rejected]: (state, { payload }) => {
      state.status = "failed";

      if (payload === "timeout") {
        state.error = payload;
      } else if (payload === "cancel") {
        state.error = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.error = "network failed";
      } else state.error = payload.message;
    },

    [updateSettings.pending]: (state) => {
      state.status = "loading";
    },
    [updateSettings.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log(action.payload.data);
      state.settings = action.payload.data.settings;
    },
    [updateSettings.rejected]: (state, { payload }) => {
      state.status = "failed";

      if (payload === "timeout") {
        state.error = payload;
      } else if (payload === "cancel") {
        state.error = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.error = "network failed";
      } else state.error = payload.message;
    },
  },
});

export const selectSettings = (state) => state.settings;

export const { resetSettingStatus, resetSettingError, resetSetting } =
  settingsSlice.actions;

export default settingsSlice.reducer;
