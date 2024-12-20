import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="app-content flex h-full w-full items-center justify-center overflow-y-scroll bg-white p-8">
      <Outlet />
    </main>
  );
};

export default MainLayout;
