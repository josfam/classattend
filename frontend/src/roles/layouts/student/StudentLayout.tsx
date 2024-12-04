/** General layout for students pages */

import { Outlet } from "react-router-dom";
import StudentSidebar from "./components/StudentSidebar";

const StudentLayout = () => {
  return (
    <div className="flex flex-row">
      {/* Sidebar */}
      <StudentSidebar />
      {/* Main content area */}
      <main className="flex h-screen w-full flex-col items-center overflow-y-scroll bg-white px-11 pt-8">
        <Outlet /> {/* Rendering nested routes */}
      </main>
    </div>
  );
};

export default StudentLayout;
