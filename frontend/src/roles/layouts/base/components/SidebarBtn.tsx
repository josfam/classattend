import { IconType } from "react-icons/lib";

interface SideBarBtnProps {
  text: string;
  Icon: IconType;
}

const SideBarBtn = ({ text, Icon }: SideBarBtnProps) => {
  return (
    <button className="btn-pri border-t-w-3 border-t-1 flex h-14 flex-row items-center justify-center gap-6 rounded-none border-t-sky-500 bg-sky-700 text-xl">
      <div className="h-6 w-6">{Icon && <Icon className="text-2xl" />}</div>
      {text}
    </button>
  );
};

export default SideBarBtn;
