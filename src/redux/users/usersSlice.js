import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/pharmacy";

const initialState = {
  status: "idle",
  users: null,
  error: "",
  count: 0,
};

export const getUsers = createAsyncThunk(
  "users/get",
  async ({ queryString, token }, { rejectWithValue }) => {
    console.log(queryString);
    try {
      let buildUrl = `/users?page=${queryString.page}`;

      if (queryString.name) {
        buildUrl = buildUrl + `&name=${queryString.name}`;
      }

      if (queryString.type) {
        buildUrl = buildUrl + `&type=${queryString.type}`;
      }

      if (queryString.approve !== undefined) {
        buildUrl = buildUrl + `&isApproved=${queryString.approve}`;
      }

      if (queryString.active !== undefined) {
        buildUrl = buildUrl + `&isActive=${queryString.active}`;
      }

      console.log(buildUrl);
      const response = await axios.get(buildUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      return response.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message.data);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
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
  },
});

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
