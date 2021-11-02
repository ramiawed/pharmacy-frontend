import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../api/pharmacy";
import axios from "axios";
import {
  BASEURL,
  GuestJob,
  UserActiveState,
  UserApprovedState,
  UserTypeConstants,
} from "../../utils/constants";

let CancelToken;
let source;

const initialState = {
  status: "idle",
  users: null,
  error: "",
  count: 0,
  refresh: true,
  pageState: {
    searchName: "",
    searchCity: "",
    searchDistrict: "",
    searchStreet: "",
    searchEmployeeName: "",
    searchCertificateName: "",
    searchCompanyName: "",
    searchJobTitle: "",
    approved: UserApprovedState.ALL,
    active: UserActiveState.ALL,
    userType: UserTypeConstants.ALL,
    searchJob: GuestJob.NONE,
    orderBy: {},
    page: 1,
  },
  // field holds the activation or deleting status
  activationDeleteStatus: "idle",
  // field holds the activation or deleting message
  activationDeleteStatusMsg: "",
  resetUserPasswordStatus: "idle",
  resetUserPasswordError: "",
};

export const cancelOperation = () => {
  source.cancel("operation canceled by user");
};

// get the users
export const getUsers = createAsyncThunk(
  "users/get",
  async ({ token }, { rejectWithValue, getState }) => {
    const {
      users: { pageState },
    } = getState();

    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      let buildUrl = `/users?page=${pageState.page}&limit=9&details=all`;

      if (pageState.searchName.trim() !== "") {
        buildUrl = buildUrl + `&name=${pageState.searchName}`;
      }

      if (pageState.searchCity.trim() !== "") {
        buildUrl = buildUrl + `&city=${pageState.searchCity}`;
      }

      if (pageState.searchDistrict.trim() !== "") {
        buildUrl = buildUrl + `&district=${pageState.searchDistrict}`;
      }

      if (pageState.searchStreet.trim() !== "") {
        buildUrl = buildUrl + `&street=${pageState.searchStreet}`;
      }

      if (pageState.searchEmployeeName.trim() !== "") {
        buildUrl = buildUrl + `&employeeName=${pageState.searchEmployeeName}`;
      }

      if (pageState.userType !== UserTypeConstants.ALL) {
        buildUrl = buildUrl + `&type=${pageState.userType}`;
      }

      if (pageState.searchCertificateName.trim() !== "") {
        buildUrl =
          buildUrl + `&certificateName=${pageState.searchCertificateName}`;
      }

      if (pageState.searchCompanyName.trim() !== "") {
        buildUrl = buildUrl + `&companyName=${pageState.searchCompanyName}`;
      }

      if (pageState.searchJobTitle.trim() !== "") {
        buildUrl = buildUrl + `&jobTitle=${pageState.searchJobTitle}`;
      }

      if (pageState.searchJob !== GuestJob.NONE) {
        buildUrl = buildUrl + `&job=${pageState.searchJob}`;
      }

      if (pageState.approved === UserApprovedState.APPROVED) {
        buildUrl = buildUrl + `&isApproved=${true}`;
      }

      if (pageState.approved === UserApprovedState.NOT_APPROVED) {
        buildUrl = buildUrl + `&isApproved=${false}`;
      }

      if (pageState.active === UserActiveState.ACTIVE) {
        buildUrl = buildUrl + `&isActive=${true}`;
      }

      if (pageState.active === UserActiveState.INACTIVE) {
        buildUrl = buildUrl + `&isActive=${false}`;
      }

      let sortArray = [];
      let sort;
      Object.keys(pageState.orderBy).forEach((key) => {
        if (pageState.orderBy[key] === 1) {
          sortArray.push(`${key}`);
        } else {
          sortArray.push(`-${key}`);
        }
      });

      if (sortArray.length > 0) {
        sort = sortArray.join(",");
      }

      if (sort) {
        buildUrl = buildUrl + `&sort=${sort.replace(/,/g, " ")}`;
      }

      const response = await axios.get(`${BASEURL}${buildUrl}`, {
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

// change the approve state for a specific user
export const userApproveChange = createAsyncThunk(
  "users/approve",
  async ({ status, userId, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/users/approve/${userId}`,
        {
          action: status,
        },
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

// delete a user
export const deleteUser = createAsyncThunk(
  "users/delete",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/users/delete/${userId}`,
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

// undo delete a user
export const undoDeleteUser = createAsyncThunk(
  "users/undoDelete",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/users/reactivate/${userId}`,
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

export const resetUserPassword = createAsyncThunk(
  "users/resetPassword",
  async (
    { userId, newPassword, newPasswordConfirm, token },
    { rejectWithValue }
  ) => {
    try {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      const response = await axios.post(
        `${BASEURL}/users/resetUserPassword`,
        {
          userId,
          newPassword,
          newPasswordConfirm,
        },
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

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.status = "idle";
      state.users = null;
      state.error = "";
      state.count = 0;
      state.activationDeleteStatus = "idle";
      state.activationDeleteStatusMsg = "";
      state.resetUserPasswordStatus = "idle";
      state.resetUserPasswordError = "";
    },
    resetError: (state) => {
      state.status = "idle";
      state.error = "";
    },
    resetActivationDeleteStatus: (state) => {
      state.activationDeleteStatus = "idle";
      state.activationDeleteStatusMsg = "";
    },
    resetUserChangePasswordStatus: (state) => {
      state.resetUserPasswordStatus = "idle";
    },
    resetUserChangePasswordError: (state) => {
      state.resetUserPasswordError = "";
    },
    setSearchName: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchName: action.payload,
      };
    },

    setSearchCity: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchCity: action.payload,
      };
    },

    setSearchDistrict: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchDistrict: action.payload,
      };
    },

    setSearchStreet: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchStreet: action.payload,
      };
    },

    setSearchEmployeeName: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchEmployeeName: action.payload,
      };
    },

    setSearchCertificateName: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchCertificateName: action.payload,
      };
    },

    setSearchCompanyName: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchCompanyName: action.payload,
      };
    },

    setSearchJobTitle: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchJobTitle: action.payload,
      };
    },

    setUserApproved: (state, action) => {
      state.pageState = {
        ...state.pageState,
        approved: action.payload,
      };
    },

    setUserActive: (state, action) => {
      state.pageState = {
        ...state.pageState,
        active: action.payload,
      };
    },

    setUserType: (state, action) => {
      state.pageState = {
        ...state.pageState,
        userType: action.payload,
      };
    },

    setSearchJob: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchJob: action.payload,
      };
    },

    setPage: (state, action) => {
      state.pageState = {
        ...state.pageState,
        page: action.payload,
      };
    },

    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },

    setOrderBy: (state, action) => {
      state.pageState = {
        ...state.pageState,
        orderBy: action.payload,
      };
    },

    resetPageState: (state) => {
      state.pageState = {
        searchName: "",
        searchCity: "",
        searchDistrict: "",
        searchStreet: "",
        searchEmployeeName: "",
        searchCertificateName: "",
        searchCompanyName: "",
        searchJobTitle: "",
        approved: UserApprovedState.ALL,
        active: UserActiveState.ALL,
        userType: UserTypeConstants.ALL,
        searchJob: GuestJob.NONE,
        orderBy: {},
        page: 1,
      };
    },

    usersSliceSignOut: (state) => {
      state.status = "idle";
      state.users = null;
      state.error = "";
      state.count = 0;
      state.refresh = true;
      state.activationDeleteStatus = "idle";
      state.activationDeleteStatusMsg = "";
      state.resetUserPasswordStatus = "idle";
      state.resetUserPasswordError = "";

      state.pageState = {
        searchName: "",
        searchCity: "",
        searchDistrict: "",
        searchStreet: "",
        searchEmployeeName: "",
        searchCertificateName: "",
        searchCompanyName: "",
        searchJobTitle: "",
        approved: UserApprovedState.ALL,
        active: UserActiveState.ALL,
        userType: UserTypeConstants.ALL,
        searchJob: GuestJob.NONE,
        orderBy: {},
        page: 1,
      };
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.users = action.payload.data.users;
      state.count = action.payload.count;
      state.error = "";
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.status = "failed";

      if (payload === "timeout") {
        state.error = "timeout-msg";
      } else if (payload === "cancel") {
        state.error = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.error = "network failed";
      } else state.error = payload.message;
    },
    [userApproveChange.pending]: (state) => {
      state.activationDeleteStatus = "loading";
      state.activationDeleteStatusMsg = "";
    },
    [userApproveChange.fulfilled]: (state, action) => {
      state.activationDeleteStatus = "succeeded";
      const newUsers = state.users.map((user) => {
        if (user._id === action.payload.data.user._id) {
          return action.payload.data.user;
        } else return user;
      });

      state.users = newUsers;
      if (action.payload.status === "activation success") {
        state.activationDeleteStatusMsg = "user-approved-success";
      } else {
        state.activationDeleteStatusMsg = "user-disapproved-success";
      }
    },
    [userApproveChange.rejected]: (state, { payload }) => {
      state.activationDeleteStatus = "failed";

      if (payload === "timeout") {
        state.activationDeleteStatusMsg = "timeout-msg";
      } else if (payload === "cancel") {
        state.activationDeleteStatusMsg = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.activationDeleteStatusMsg = "network failed";
      } else state.activationDeleteStatusMsg = payload.message;
    },
    [deleteUser.pending]: (state) => {
      state.activationDeleteStatus = "loading";
      state.activationDeleteStatusMsg = "";
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.activationDeleteStatus = "succeeded";
      const newUsers = state.users.map((user) => {
        if (user._id === action.payload.data.user._id) {
          return action.payload.data.user;
        } else return user;
      });
      state.users = newUsers;
      state.activationDeleteStatusMsg = "user-delete-success";
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.activationDeleteStatus = "failed";

      if (payload === "timeout") {
        state.activationDeleteStatusMsg = "timeout-msg";
      } else if (payload === "cancel") {
        state.activationDeleteStatusMsg = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.activationDeleteStatusMsg = "network failed";
      } else state.activationDeleteStatusMsg = payload.message;
    },
    [undoDeleteUser.pending]: (state, action) => {
      state.activationDeleteStatus = "loading";
      state.activationDeleteStatusMsg = "";
    },
    [undoDeleteUser.fulfilled]: (state, action) => {
      state.activationDeleteStatus = "succeeded";
      const newUsers = state.users.map((user) => {
        if (user._id === action.payload.data.user._id) {
          return action.payload.data.user;
        } else return user;
      });
      state.users = newUsers;
      state.activationDeleteStatusMsg = "user-undo-delete-success";
    },
    [undoDeleteUser.rejected]: (state, { payload }) => {
      state.activationDeleteStatus = "failed";

      if (payload === "timeout") {
        state.activationDeleteStatusMsg = "timeout-msg";
      } else if (payload === "cancel") {
        state.activationDeleteStatusMsg = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.activationDeleteStatusMsg = "network failed";
      } else state.activationDeleteStatusMsg = payload.message;
    },
    [resetUserPassword.pending]: (state) => {
      state.resetUserPasswordStatus = "loading";
    },
    [resetUserPassword.fulfilled]: (state) => {
      state.resetUserPasswordStatus = "succeeded";
      state.resetUserPasswordError = "";
    },
    [resetUserPassword.rejected]: (state, { payload }) => {
      state.resetUserPasswordStatus = "failed";

      if (payload === "timeout") {
        state.resetUserPasswordError = "timeout-msg";
      } else if (payload === "cancel") {
        state.resetUserPasswordError = "cancel-operation-msg";
      } else if (payload === "network failed") {
        state.resetUserPasswordError = "network failed";
      } else state.resetUserPasswordError = payload.message;
    },
  },
});

export const selectUsers = (state) => state.users;
export const selectActivationDeleteStatus = (state) =>
  state.users.activationDeleteStatus;
export const selectActivationDeleteMsg = (state) =>
  state.users.activationDeleteStatusMsg;

export const {
  resetActivationDeleteStatus,
  resetUsers,
  resetUserChangePasswordStatus,
  resetUserChangePasswordError,
  resetError,
  resetPageState,
  usersSliceSignOut,
  setSearchName,
  setSearchCity,
  setSearchDistrict,
  setSearchStreet,
  setSearchEmployeeName,
  setSearchCertificateName,
  setSearchCompanyName,
  setSearchJobTitle,
  setUserApproved,
  setUserActive,
  setUserType,
  setSearchJob,
  setPage,
  setRefresh,
  setOrderBy,
} = usersSlice.actions;

export default usersSlice.reducer;
