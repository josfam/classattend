import SideBarBtn from "./SidebarBtn";
import { BiLogOut } from "react-icons/bi";
import LogoutUser from "@/utils/auth/LogoutUser";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const clearRole = useUserStore((state) => state.clearRole);

  return (
    <SideBarBtn
      text="Logout"
      Icon={BiLogOut}
      onClick={() => LogoutUser({ navigate, clearRole })}
    />
  );
};

export default LogoutBtn;
