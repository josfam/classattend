import React from "react";
import LogoutBtn from "./buttons/LogoutBtn";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";

interface BaseSidebarProps {
  children: React.ReactNode;
}

const BaseSidebar = ({ children }: BaseSidebarProps) => {
  return (
    <>
      <div className="fixed left-0 top-0 z-20 flex h-16 w-full items-center justify-end bg-sky-700 px-5 py-2 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            {/* hamburger menu button to trigger the sheet motion*/}
            <button className="btn-sec h-full border border-sky-300">
              <GiHamburgerMenu className="text-3xl text-sky-200" />
            </button>
          </SheetTrigger>

          <SheetContent
            side={"right"}
            className="m-0 border-0 bg-sky-700 p-0 transition-all duration-75"
          >
            {/* sidebar contents */}
            <div className="flex h-full flex-col">
              {children} {/* Render child components */}
              <div className="mt-auto">
                <LogoutBtn />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* nav for large screens */}
      <nav
        className={`z-20 hidden h-screen min-w-48 flex-col overflow-hidden bg-sky-700 lg:flex`}
      >
        {children} {/* Render child components */}
        <div className="mt-auto">
          <LogoutBtn />
        </div>
      </nav>
    </>
  );
};

export default BaseSidebar;
