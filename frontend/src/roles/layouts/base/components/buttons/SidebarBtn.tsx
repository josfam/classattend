import { IconType } from "react-icons/lib";

interface SideBarBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  Icon: IconType;
}

const SideBarBtn = ({ text, Icon, ...props }: SideBarBtnProps) => {
  return (
    <button
      {...props}
      className="btn-pri h-14 justify-start gap-3 rounded-none bg-sky-700"
    >
      <div>{Icon && <Icon className="text-3xl" />}</div>
      {text}
    </button>
  );
};

export default SideBarBtn;
