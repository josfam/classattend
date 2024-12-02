import { BiGroup } from "react-icons/bi";
import LogoutBtn from "../../base/components/buttons/LogoutBtn";
import SideBarBtn from "../../base/components/buttons/SidebarBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { classroomsPath } from "@/utils/urlPaths/appUrlPaths";

const LecturerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCurrentlySelected = location.pathname.includes("classrooms");

  const navigateToClassrooms = () => {
    navigate(classroomsPath, { replace: true });
  };

  return (
    <nav className="flex h-screen min-w-48 flex-col overflow-hidden bg-sky-700">
      {/* buttons */}
      <SideBarBtn
        text="Classrooms"
        Icon={BiGroup}
        onClick={navigateToClassrooms}
        className={`${isCurrentlySelected ? "bg-sky-900 hover:bg-sky-900" : ""}`}
      />
      <div className="mt-auto">
        <LogoutBtn />
      </div>
    </nav>
  );
};

export default LecturerSidebar;
