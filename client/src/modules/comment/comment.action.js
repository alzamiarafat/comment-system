import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllComments,
  createComment,
  reactionComment,
  updateComment,
  deleteComment,
} from "./comment.service";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (query, { rejectWithValue }) => {
    try {
      const res = await getAllComments(query);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addNewComment = createAsyncThunk(
  "comments/addNewComment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createComment(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const reactionCommentById = createAsyncThunk(
  "comments/reactionComment",
  async ({ id, type }, { rejectWithValue }) => {
    try {
      const res = await reactionComment(id, { type });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCommentById = createAsyncThunk(
  "comments/updateComment",
  async ({ id, content }, { rejectWithValue }) => {
    try {
      const res = await updateComment(id, { content });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCommentById = createAsyncThunk(
  "comments/deleteComment",
  async (id, { rejectWithValue }) => {
    try {
      const res = await deleteComment(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
