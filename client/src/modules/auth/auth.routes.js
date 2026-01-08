import { lazy } from "react";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const authRoutes = [
  { path: "/login", element: Login, public: true },
  { path: "/register", element: Register, public: true },
];

export default authRoutes;
