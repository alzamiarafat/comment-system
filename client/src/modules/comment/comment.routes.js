import { lazy } from "react";

const Comment = lazy(() => import("./Comment.page.jsx"));

const commentRoutes = [{ path: "/comments", element: Comment, public: false }];

export default commentRoutes;
