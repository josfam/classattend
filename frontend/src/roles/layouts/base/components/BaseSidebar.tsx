import React from "react";
import LogoutBtn from "./buttons/LogoutBtn";

interface BaseSidebarProps {
  children: React.ReactNode;
}

const BaseSidebar = ({ children }: BaseSidebarProps) => {
  return (
    <nav className="flex h-screen min-w-48 flex-col overflow-hidden bg-sky-700">
      {children} {/* Render child components */}
      <div className="mt-auto">
        <LogoutBtn />
      </div>
    </nav>
  );
};

export default BaseSidebar;
