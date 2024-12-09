import { NavigateFunction } from "react-router-dom";
import { loginPath } from "../urlPaths/appUrlPaths";
import { authApiPath } from "../urlPaths/apiPaths";
import FetchWithToken from "./FetchWithToken";

interface LogoutUserProps {
  navigate: NavigateFunction;
  clearRole: () => void;
}

const LogoutUser = ({ navigate, clearRole }: LogoutUserProps) => {
  const handleLogout = async () => {
    try {
      const response = await FetchWithToken({
        url: `${authApiPath}logout`,
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      });

      if (response.ok) {
        // clear this user from zustand store
        clearRole();
        // clear this user from local storage
        localStorage.removeItem("user-store");
        // clear the jwt token
        localStorage.removeItem("jwtToken");
        navigate(`${loginPath}`, {
          state: { showSuccessToast: true, message: "Logged out successfully" },
        });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleLogout();
};

export default LogoutUser;
