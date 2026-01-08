import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/auth.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
