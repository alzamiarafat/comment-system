import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios.service";
import { signIn } from "../../services/auth.service";

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
      await api.post("/auth/register", payload);
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
  localStorage.removeItem("accessToken");
});
