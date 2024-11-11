import { useNavigate } from "react-router-dom";
// import { classroomsPath } from "@/utils/urlPaths/appUrlPaths";

const EmptyClassrooms = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <p className="text-2xl">You have no classrooms yet, add one here</p>
      <button className="btn-pri w-44" onClick={() => navigate(`add`)}>
        Add a class
      </button>
    </div>
  );
};

export default EmptyClassrooms;
