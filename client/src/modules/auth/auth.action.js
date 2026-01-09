import { createAsyncThunk } from "@reduxjs/toolkit";
import { currentUser, signIn, signOut, signUp } from "./auth.service";

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const results = await signIn(payload);
      const data = results?.data?.data;
      localStorage.setItem("accessToken", data.accessToken);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      await signUp(payload);
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await currentUser();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut();
  localStorage.removeItem("accessToken");
});
