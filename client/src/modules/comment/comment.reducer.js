import { createSlice } from "@reduxjs/toolkit";
import {
  addNewComment,
  deleteCommentById,
  getComments,
  reactionCommentById,
  updateCommentById,
} from "./comment.action";

const initialState = {
  comments: [],
  totalPages: 1,
  page: 1,
  status: "idle",
  error: null,
};

const replaceCommentWithCounts = (comments, updated) => {
  for (let i = 0; i < comments.length; i++) {
    const c = comments[i];

    if (c._id === updated._id) {
      comments[i] = {
        ...c,
        ...updated,
        likesCount: updated.likes?.length ?? 0,
        dislikesCount: updated.dislikes?.length ?? 0,
      };
      return true;
    }

    if (c.replies?.length) {
      const found = replaceCommentWithCounts(c.replies, updated);
      if (found) return true;
    }
  }
  return false;
};

const replaceComment = (comments, updated) => {
  const index = comments.findIndex((c) => c._id === updated._id);
  if (index !== -1) comments[index] = updated;
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentAddedRealtime: (state, { payload }) => {
      const exists = state.comments.some((c) => c._id === payload._id);
      if (!exists) {
        state.comments.unshift(payload);
      }
    },

    commentUpdatedRealtime: (state, { payload }) => {
      replaceComment(state.comments, payload);
    },

    commentReactionRealtime: (state, { payload }) => {
      replaceCommentWithCounts(state.comments, payload);
    },

    commentDeletedRealtime: (state, { payload }) => {
      state.comments = state.comments.filter((c) => c._id !== payload._id);
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== GET COMMENTS =====
      .addCase(getComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getComments.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.comments = payload.rows;
        state.totalPages = payload.pagination.totalPages;
        state.page = payload.pagination.page;
      })
      .addCase(getComments.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })

      // ===== ADD COMMENT =====
      .addCase(addNewComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewComment.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
      })

      // ===== REACTION / UPDATE =====
      .addCase(reactionCommentById.fulfilled, (state, { payload }) => {
        replaceCommentWithCounts(state.comments, payload.data);
      })
      // .addCase(updateCommentById.pending, (state) => {
      //   state.status = "loading";
      // })
      .addCase(updateCommentById.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        replaceComment(state.comments, payload.data);
      })
      .addCase(updateCommentById.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })

      // ===== DELETE =====
      .addCase(deleteCommentById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCommentById.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.comments = state.comments.filter(
          (comment) => comment._id !== payload._id
        );
      })
      .addCase(deleteCommentById.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const {
  commentAddedRealtime,
  commentUpdatedRealtime,
  commentReactionRealtime,
  commentDeletedRealtime,
} = commentSlice.actions;

export default commentSlice.reducer;
