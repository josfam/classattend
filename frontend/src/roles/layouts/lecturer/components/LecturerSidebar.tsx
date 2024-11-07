import { BiLogOut } from "react-icons/bi";
import SideBarBtn from "../../base/components/SidebarBtn";

const LecturerSidebar = () => {
  return (
    <nav className="flex h-screen w-56 flex-col overflow-hidden bg-sky-700">
      {/* buttons */}
      <div id="bottom-nav" className="mt-auto">
        <SideBarBtn text="Logout" Icon={BiLogOut} />
      </div>
    </nav>
  );
};

export default LecturerSidebar;
