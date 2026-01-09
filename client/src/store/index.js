import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/auth.reducer";
import commentReducer from "../modules/comment/comment.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentReducer,
  },
});
