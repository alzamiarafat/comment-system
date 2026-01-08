import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  // const { isAuth, role } = useSelector((s) => s.auth);
  const isAuth = true;
  if (!isAuth) return <Navigate to="/login" />;
  // if (roles && !roles.includes(role)) return <Navigate to="/403" />;

  return children;
}
