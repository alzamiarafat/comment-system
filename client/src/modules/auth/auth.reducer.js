import { createSlice } from "@reduxjs/toolkit";
import { login, register, logout, checkAuth } from "./auth.action";

const initialState = {
  user: null,
  isAuth: false,
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

      .addCase(checkAuth.pending, setPending)
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuth = false;
        state.user = null;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
      });
  },
});

export default authSlice.reducer;
