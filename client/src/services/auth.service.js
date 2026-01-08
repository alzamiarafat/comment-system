import api from "./axios.service";

export const signIn = (payload) => api.post("/auth/login", payload);
export const signUp = (payload) => api.post("/auth/register", payload);
export const signOut = () => api.post("/auth/logout");
export const refreshToken = (payload) => api.post("/auth/refresh", payload);
