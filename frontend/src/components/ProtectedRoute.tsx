import { Outlet, useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";
import UnauthorizedPage from "@/pages/errorPages/Unauthorized";
import {
  redirectDuration,
  loginRefetchInterval,
} from "@/utils/timings/timings";
import { authApiPath } from "@/utils/urlPaths/apiPaths";
import { loginPath } from "@/utils/urlPaths/appUrlPaths";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import FetchWithToken from "@/utils/auth/FetchWithToken";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const role = useUserStore((state) => state.role);
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string>("");

  const {
    data: isLoggedIn,
    isLoading,
    isPending,
    error,
  } = useQuery({
    queryKey: ["checkLoggedIn"],
    queryFn: async () => {
      const response = await FetchWithToken({
        url: `${authApiPath}checkloggedin`,
        options: {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      });

      const data = await response.json();
      if (response.ok) {
        return true;
      } else {
        setToastMessage(data.message);
        throw new Error(data.message);
      }
    },
    retry: 1,
    refetchInterval: loginRefetchInterval,
  });

  useEffect(() => {
    if (!role || !allowedRoles.includes(role)) {
      const timer = setTimeout(() => {
        navigate(-1);
      }, redirectDuration);

      return () => clearTimeout(timer);
    }
  }, [role, allowedRoles, navigate]);

  useEffect(() => {
    // Redirect to login page
    if (error || isLoggedIn === false) {
      // clear local storage
      localStorage.removeItem("user-store");
      navigate(`${loginPath}`, {
        replace: true,
        state: { showErrorToast: true, message: toastMessage },
      });
    }
  }, [error, isLoggedIn, navigate, toastMessage]);

  if (isLoading || isPending) {
    return <div>Loading...</div>;
  }

  // Do not render protected content
  if (!role || !allowedRoles.includes(role)) {
    return <UnauthorizedPage />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
