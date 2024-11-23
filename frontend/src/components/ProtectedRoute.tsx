import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";
import UnauthorizedPage from "@/pages/errorPages/Unauthorized";
import { redirectDuration } from "@/utils/errors/errorConstants";
import { authApiPath } from "@/utils/urlPaths/apiPaths";
import { loginPath } from "@/utils/urlPaths/appUrlPaths";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const role = useUserStore((state) => state.role);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");

  const checkLoggedIn = useCallback(async () => {
    // check if the user is logged in
    try {
      const response = await fetch(`${authApiPath}checkloggedin`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setToastMessage(data.message);
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    console.log(`The location path: `, location.pathname);
    checkLoggedIn();
  }, [checkLoggedIn]);

  useEffect(() => {
    if (!role || !allowedRoles.includes(role)) {
      const timer = setTimeout(() => {
        navigate(-1);
      }, redirectDuration);

      return () => clearTimeout(timer);
    }
  }, [role, allowedRoles, navigate]);

  if (isLoggedIn === null) {
    return <div>Loading ...</div>;
  }

  // Redirect to login page
  if (isLoggedIn === false) {
    // clear local storage
    localStorage.removeItem("user-store");
    navigate(`${loginPath}`, {
      replace: true,
      state: { showErrorToast: true, message: toastMessage },
    });
  }
  // Do not render protected content
  if (!isLoggedIn || !role || !allowedRoles.includes(role)) {
    return <UnauthorizedPage />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
