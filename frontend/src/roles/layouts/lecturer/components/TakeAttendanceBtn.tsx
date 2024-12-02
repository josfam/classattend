import { classroomApiPath } from "@/utils/urlPaths/apiPaths";

interface TakeAttendanceBtnProps {
  classHasStudents: undefined | boolean;
  classId: number;
}

const TakeAttendanceBtn = ({
  classHasStudents,
  classId,
}: TakeAttendanceBtnProps) => {
  const handleAttendanceToggle = async () => {
    await fetch(`${classroomApiPath}toggleAttendanceStatus/${classId}`, {
      method: "patch",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  };
  return (
    <button
      className={`btn-pri w-52 text-nowrap ${!classHasStudents ? "border-0 bg-gray-400 hover:bg-gray-400" : ""}`}
      disabled={!classHasStudents}
      onClick={handleAttendanceToggle}
    >
      Take attendance
    </button>
  );
};

export default TakeAttendanceBtn;
