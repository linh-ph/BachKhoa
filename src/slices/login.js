import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { apiLinks } from "../utils";

export const loginAuth = createAsyncThunk(
  "login/loginAuth",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiLinks.auth.token, data);
      sessionStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    // token: null,
    error: null,
    loginLoading: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoggedUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [loginAuth.pending]: (state, action) => {
      state.loginLoading = true;
    },
    [loginAuth.fulfilled]: (state, action) => {
      state.loginLoading = false;
      state.user = action.payload;
      //   state.token = action.payload.token;
    },
    [loginAuth.rejected]: (state, action) => {
      state.loginLoading = false;
      state.error = action.error;
    },
  },
});

export const { setToken, setLoggedUser } = loginSlice.actions;
export default loginSlice.reducer;
