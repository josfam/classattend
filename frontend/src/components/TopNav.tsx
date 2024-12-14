import { GiHamburgerMenu } from "react-icons/gi";

const TopNav = () => {
  return (
    <div className="absolute z-10 flex h-16 w-full items-center justify-end bg-sky-700 bg-opacity-95 px-4 backdrop-blur-md lg:hidden">
      <button className="btn-sec border border-sky-500">
        <GiHamburgerMenu className="text-3xl text-sky-200" />
      </button>
    </div>
  );
};

export default TopNav;
