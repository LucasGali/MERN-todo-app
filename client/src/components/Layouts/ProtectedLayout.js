import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import Navbar from "../Navbar/Navbar";

export function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}