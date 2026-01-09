import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const { isAuth } = useSelector((s) => s.auth);
  if (!isAuth) return <Navigate to="/login" />;

  return children;
}
