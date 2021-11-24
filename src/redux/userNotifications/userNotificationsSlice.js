import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { MdElectricalServices } from "react-icons/md";
import { BASEURL } from "../../utils/constants";

const initialState = {
  status: "idle",
  userNotifications: [],
  count: 0,
  error: "",
  page: 1,
};

let CancelToken = null;
let source = null;

export const getAllNotifications = createAsyncThunk(
  "userNotifications/getAllNotifications",
  async ({ token }, { rejectWithValue, getState }) => {
    const {
      userNotifications: { page },
    } = getState();
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.get(
        `${BASEURL}/notifications?page=${page}&limit=3`,
        {
          timeout: 10000,
          cancelToken: source.token,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

export const setNotificationRead = createAsyncThunk(
  "userNotifications/setNotificationRead",
  async ({ token, notificationId }, { rejectWithValue, getState }) => {
    const {
      userNotifications: { page },
    } = getState();
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/notifications/setread?notificationId=${notificationId}`,
        {},
        {
          timeout: 10000,
          cancelToken: source.token,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

export const UserNotificationsSlice = createSlice({
  name: "userNotifications",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = "";
    },
    resetError: (state) => {
      state.status = "idle";
      state.error = "";
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetNotifications: (state) => {
      state.status = "idle";
      state.error = "";
      state.userNotifications = [];
      state.count = 0;
      state.page = 1;
    },
  },
  extraReducers: {
    [getAllNotifications.pending]: (state) => {
      state.status = "loading";
    },
    [getAllNotifications.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.userNotifications = [
        ...state.userNotifications,
        ...action.payload.data.notifications,
      ];
      state.count = action.payload.count;
      state.error = "";
    },
    [getAllNotifications.rejected]: (state, { payload }) => {
      state.status = "failed";

      if (payload === "timeout") {
        state.error = "timeout-msg";
      } else if (payload === "cancel") {
        state.error = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.error = "network failed";
      } else state.error = payload.message;
    },
    [setNotificationRead.pending]: (state) => {
      state.status = "loading";
    },
    [setNotificationRead.fulfilled]: (state, action) => {
      const { updatedNotification } = action.payload.data;
      console.log(updatedNotification);
      state.status = "succeeded";
      const notifications = state.userNotifications.map((note) => {
        if (note._id === updatedNotification._id) return updatedNotification;
        else return note;
      });

      state.userNotifications = notifications;
      state.error = "";
    },
    [setNotificationRead.rejected]: (state, { payload }) => {
      state.status = "failed";

      if (payload === "timeout") {
        state.error = "timeout-msg";
      } else if (payload === "cancel") {
        state.error = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.error = "network failed";
      } else state.error = payload.message;
    },
  },
});

export const { resetError, resetStatus, resetNotifications, setPage } =
  UserNotificationsSlice.actions;

export const selectUserNotifications = (state) => state.userNotifications;

export default UserNotificationsSlice.reducer;
