import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../ContextApi/AuthContext/AuthContext";
import Loading from "../Components/Page/Loading/Loading";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoutes = ({ allowedRoles }: ProtectedRouteProps) => {
  const { users, loading } = useAuth();

  if (loading) return <Loading />;

  if (!users) return <Navigate to="/" replace />;

  if (allowedRoles && !allowedRoles.includes(users.user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
