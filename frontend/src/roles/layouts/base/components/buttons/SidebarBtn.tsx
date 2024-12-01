import { IconType } from "react-icons/lib";
import clsx from "clsx";

interface SideBarBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  Icon: IconType;
}

const SideBarBtn = ({ text, Icon, className, ...props }: SideBarBtnProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "btn-pri h-14 justify-start gap-3 rounded-none bg-sky-700",
        className,
      )}
    >
      <div>{Icon && <Icon className="text-3xl" />}</div>
      {text}
    </button>
  );
};

export default SideBarBtn;
