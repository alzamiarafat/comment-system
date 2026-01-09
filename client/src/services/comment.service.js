import api from "./axios.service";

export const getAllComments = (query) =>
  api.get("/comments", { params: query });

export const createComment = (payload) => api.post("/comments", payload);

export const updateComment = (id, payload) =>
  api.put(`/comments/${id}`, payload);

export const reactionComment = (id, payload) =>
  api.post(`/comments/${id}/reactions`, payload);

export const deleteComment = (id) => {
  return api.delete(`/comments/${id}`);
};
