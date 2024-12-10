import { BiGroup } from "react-icons/bi";
import SideBarBtn from "../../base/components/buttons/SidebarBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { classroomsPath } from "@/utils/urlPaths/appUrlPaths";
import BaseSidebar from "../../base/components/BaseSidebar";

const LecturerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCurrentlySelected = location.pathname.includes("classrooms");

  const navigateToClassrooms = () => {
    navigate(classroomsPath, { replace: true });
  };

  return (
    <BaseSidebar>
      {/* buttons */}
      <SideBarBtn
        text="Classrooms"
        Icon={BiGroup}
        onClick={navigateToClassrooms}
        className={`${isCurrentlySelected ? "bg-sky-900 hover:bg-sky-900" : ""}`}
      />
    </BaseSidebar>
  );
};

export default LecturerSidebar;
