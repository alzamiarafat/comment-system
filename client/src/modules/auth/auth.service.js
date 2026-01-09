import api from "../../services/axios.service";

export const signIn = (payload) => api.post("/auth/login", payload);
export const signUp = (payload) => api.post("/auth/register", payload);
export const signOut = () => api.post("/auth/logout");
export const refreshToken = (payload) => api.post("/auth/refresh", payload);
export const currentUser = () => api.get("/auth/me");
