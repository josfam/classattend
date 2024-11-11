import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";
import UnauthorizedPage from "@/pages/errorPages/Unauthorized";
import { redirectDuration } from "@/utils/errors/errorConstants";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const role = useUserStore((state) => state.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (!role || !allowedRoles.includes(role)) {
      const timer = setTimeout(() => {
        navigate(-1);
      }, redirectDuration);

      return () => clearTimeout(timer);
    }
  }, [role, allowedRoles, navigate]);

  // Do not render protected content
  if (!role || !allowedRoles.includes(role)) {
    return <UnauthorizedPage />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
