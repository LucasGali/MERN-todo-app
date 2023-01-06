import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';

export function HomeLayout() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}