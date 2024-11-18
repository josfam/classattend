/** General layout for students pages */

import { Outlet } from "react-router-dom";
import LecturerSidebar from "./components/LecturerSidebar";

const LecturerLayout = () => {
  return (
    <div className="flex flex-row">
      {/* Sidebar */}
      <LecturerSidebar />
      {/* Main content area */}
      <main className="flex h-screen w-full flex-col items-center overflow-y-scroll bg-white px-8 pt-8">
        <Outlet /> {/* Rendering nested routes */}
      </main>
    </div>
  );
};

export default LecturerLayout;
