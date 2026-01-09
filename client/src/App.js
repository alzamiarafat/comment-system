import { Routes } from "react-router-dom";
import { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import routes from "./routes";
import PageLoader from "./components/common/PageLoader";
import renderRoutes from "./components/common/RouteRenderer";
import { checkAuth } from "./modules/auth/auth.action";

export default function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) return <PageLoader></PageLoader>;

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>{renderRoutes(routes)}</Routes>
    </Suspense>
  );
}
