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
  async ({ type, token, page, name }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/users/${type}?page=${page}&name=${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      return response.data;
    } catch (err) {
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
