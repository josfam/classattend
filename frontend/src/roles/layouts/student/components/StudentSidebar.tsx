import { BiLogOut } from "react-icons/bi";
import SideBarBtn from "../../base/components/SidebarBtn";
import LogoutUser from "@/utils/auth/LogoutUser";
import { useNavigate } from "react-router-dom";

const StudentSidebar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex h-screen w-56 flex-col overflow-hidden bg-sky-700">
      {/* buttons */}
      <div id="bottom-nav" className="mt-auto">
        <SideBarBtn text="Logout" Icon={BiLogOut} 
        onClick={() => LogoutUser({ navigate })}
        />
      </div>
    </nav>
  );
};

export default StudentSidebar;
