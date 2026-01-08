import { createSlice } from "@reduxjs/toolkit";
import { login, register, logout } from "./auth.action";

const initialState = {
  isAuth: false,
  role: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    const setPending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const setRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      // Login
      .addCase(login.pending, setPending)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, setRejected)

      // Register
      .addCase(register.pending, setPending)
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, setRejected)

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
      });
  },
});

export default authSlice.reducer;
