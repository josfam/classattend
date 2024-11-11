import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useUserStore from "@/store/userStore";
import { toast } from "sonner";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const role = useUserStore((state) => state.role);

  useEffect(() => {
    if (!role || !allowedRoles.includes(role)) {
      toast.error("You are not allowed to view that page");
    }
  }, [role, allowedRoles]);

  // Do not render protected content
  if (!role || !allowedRoles.includes(role)) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
