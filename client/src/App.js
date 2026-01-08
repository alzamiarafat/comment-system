import { Routes } from "react-router-dom";
import { Suspense } from "react";
import routes from "./routes";
import PageLoader from "./components/common/PageLoader";
import renderRoutes from "./components/common/RouteRenderer";

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>{renderRoutes(routes)}</Routes>
    </Suspense>
  );
}
