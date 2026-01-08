import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export default function renderRoutes(routes) {
  return routes.map((r, i) => {
    const Page = r.element;

    const wrapped = r.public ? (
      <Page />
    ) : (
      <ProtectedRoute roles={r.roles}>
        <Page />
      </ProtectedRoute>
    );

    return <Route key={i} path={r.path} element={wrapped} />;
  });
}
