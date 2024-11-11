import LogoutBtn from "../../base/components/buttons/LogoutBtn";

const StudentSidebar = () => {
  return (
    <nav className="flex h-screen w-48 flex-col overflow-hidden bg-sky-700">
      {/* buttons */}
      <div className="mt-auto">
        <LogoutBtn />
      </div>
    </nav>
  );
};

export default StudentSidebar;
