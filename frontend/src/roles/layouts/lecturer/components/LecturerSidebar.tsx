import { BiGroup } from "react-icons/bi";
import LogoutBtn from "../../base/components/buttons/LogoutBtn";
import SideBarBtn from "../../base/components/buttons/SidebarBtn";

const LecturerSidebar = () => {
  return (
    <nav className="flex h-screen min-w-48 flex-col overflow-hidden bg-sky-700">
      {/* buttons */}
      <SideBarBtn text="Classrooms" Icon={BiGroup} />
      <div className="mt-auto">
        <LogoutBtn />
      </div>
    </nav>
  );
};

export default LecturerSidebar;
