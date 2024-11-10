import { auth_url } from "./AuthConstants";
import { NavigateFunction } from "react-router-dom";
import { loginPath } from "../urlPaths/appUrlPaths";

interface LogoutUserProps {
  navigate: NavigateFunction;
  clearRole: () => void;
}

const LogoutUser = ({ navigate, clearRole }: LogoutUserProps) => {
  const handleLogout = async () => {
    try {
      const response = await fetch(`${auth_url}logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        // clear this user from zustand store
        clearRole();
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
