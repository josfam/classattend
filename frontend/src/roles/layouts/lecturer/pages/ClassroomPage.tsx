import { useLocation } from "react-router-dom";
import { ClassItem } from "../../base/types/Types";

const ClassroomPage = () => {
  const location = useLocation();
  const classItem: ClassItem = location.state?.classItem;

  return (
    <>
      <div className="flex w-full items-center justify-between rounded-lg bg-sky-200 px-4 py-3 text-sky-950">
        <div className="flex flex-col">
          <h1 className="self-start text-2xl">{`${classItem.className}`}</h1>
          <p className="self-start">{`(${classItem.classCode})`}</p>
        </div>
        <button className="btn-pri w-52"> Take attendance </button>
      </div>
    </>
  );
};

export default ClassroomPage;
