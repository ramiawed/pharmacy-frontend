import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  users: null,
  error: "",
  count: 0,
  activationDeleteStatus: "idle",
  activationDeleteStatusMsg: "",
};

// get the users
export const getUsers = createAsyncThunk(
  "users/get",
  async ({ queryString, token }, { rejectWithValue }) => {
    try {
      let buildUrl = `/users?page=${queryString.page}&limit=9`;

      if (queryString.name) {
        buildUrl = buildUrl + `&name=${queryString.name}`;
      }

      if (queryString.type) {
        buildUrl = buildUrl + `&type=${queryString.type}`;
      }

      if (queryString.city) {
        buildUrl = buildUrl + `&city=${queryString.city}`;
      }

      if (queryString.district) {
        buildUrl = buildUrl + `&district=${queryString.district}`;
      }

      if (queryString.street) {
        buildUrl = buildUrl + `&street=${queryString.street}`;
      }

      if (queryString.employeeName) {
        buildUrl = buildUrl + `&employeeName=${queryString.employeeName}`;
      }

      if (queryString.certificateName) {
        buildUrl = buildUrl + `&certificateName=${queryString.certificateName}`;
      }

      if (queryString.companyName) {
        buildUrl = buildUrl + `&companyName=${queryString.companyName}`;
      }

      if (queryString.jobTitle) {
        buildUrl = buildUrl + `&jobTitle=${queryString.jobTitle}`;
      }

      if (queryString.job) {
        buildUrl = buildUrl + `&job=${queryString.job}`;
      }

      if (queryString.approve !== undefined) {
        buildUrl = buildUrl + `&isApproved=${queryString.approve}`;
      }

      if (queryString.active !== undefined) {
        buildUrl = buildUrl + `&isActive=${queryString.active}`;
      }

      const response = await axios.get(buildUrl, {
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

// change the approve state for a specific user
export const userApproveChange = createAsyncThunk(
  "users/approve",
  async ({ status, userId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/users/approve/${userId}`,
        {
          action: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("error");
      return rejectWithValue(err.message.data);
    }
  }
);

// delete a user
export const deleteUser = createAsyncThunk(
  "users/delete",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/users/delete/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message.data);
    }
  }
);

// undo delete a user
export const undoDeleteUser = createAsyncThunk(
  "users/undoDelete",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/users/reactivate/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message.data);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetActivationDeleteStatus: (state) => {
      state.activationDeleteStatus = "idle";
      state.activationDeleteStatusMsg = "";
    },
  },
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.users = action.payload.data.users;
      state.count = action.payload.count;
      state.error = "";
    },
    [getUsers.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";
      state.users = null;
      state.error = payload.message;
    },
    [userApproveChange.pending]: (state, action) => {
      state.activationDeleteStatus = "loading";
      state.activationDeleteStatusMsg = "";
    },
    [userApproveChange.fulfilled]: (state, action) => {
      state.activationDeleteStatus = "success";
      if (action.payload.status === "activation success") {
        state.activationDeleteStatusMsg = "user-approved-success";
      } else {
        state.activationDeleteStatusMsg = "user-disapproved-success";
      }
    },
    [userApproveChange.rejected]: (state, { error, meta, payload }) => {
      state.activationDeleteStatus = "failed";
      state.activationDeleteStatusMsg = "user-approved-failed";
    },
    [deleteUser.pending]: (state, action) => {
      state.activationDeleteStatus = "loading";
      state.activationDeleteStatusMsg = "";
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.activationDeleteStatus = "success";
      state.activationDeleteStatusMsg = "user-delete-success";
    },
    [deleteUser.rejected]: (state, { error, meta, payload }) => {
      state.activationDeleteStatus = "failed";
      state.activationDeleteStatusMsg = "user-delete-failed";
    },
    [undoDeleteUser.pending]: (state, action) => {
      state.activationDeleteStatus = "loading";
      state.activationDeleteStatusMsg = "";
    },
    [undoDeleteUser.fulfilled]: (state, action) => {
      state.activationDeleteStatus = "success";
      state.activationDeleteStatusMsg = "user-undo-delete-success";
    },
    [undoDeleteUser.rejected]: (state, { error, meta, payload }) => {
      state.activationDeleteStatus = "failed";
      state.activationDeleteStatusMsg = "user-undo-delete-failed";
    },
  },
});

export const selectUsers = (state) => state.users;
export const selectActivationDeleteStatus = (state) =>
  state.users.activationDeleteStatus;
export const selectActivationDeleteMsg = (state) =>
  state.users.activationDeleteStatusMsg;

export const { resetActivationDeleteStatus } = usersSlice.actions;

export default usersSlice.reducer;
