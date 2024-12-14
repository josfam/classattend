import React from "react";
import LogoutBtn from "./buttons/LogoutBtn";
import TopNav from "./TopNav";

interface BaseSidebarProps {
  children: React.ReactNode;
}

const BaseSidebar = ({ children }: BaseSidebarProps) => {
  return (
    <>
      <TopNav />
      <nav className="hidden h-screen min-w-48 flex-col overflow-hidden bg-sky-700 lg:flex">
        {children} {/* Render child components */}
        <div className="mt-auto">
          <LogoutBtn />
        </div>
      </nav>
    </>
  );
};

export default BaseSidebar;
