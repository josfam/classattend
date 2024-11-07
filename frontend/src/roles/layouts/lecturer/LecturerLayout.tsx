/** General layout for students pages */

import { Outlet } from "react-router-dom";
import LecturerSidebar from "./components/LecturerSidebar";

const LecturerLayout = () => {
  return (
    <div className="flex flex-row">
      {/* Sidebar */}
      <LecturerSidebar />
      {/* Main content area */}
      <main className="flex h-screen w-full flex-col items-center justify-center overflow-y-scroll px-8 bg-sky-50">
        <Outlet /> {/* Rendering nested routes */}
      </main>
    </div>
  );
};

export default LecturerLayout;
