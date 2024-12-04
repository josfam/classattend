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
    const response = await fetch(
      `${classroomApiPath}toggleAttendanceStatus/${classId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
    const data = await response.json();
    if (response.ok) {
      console.log(`Attendance toggle data: `, data); // DEBUG
    } else {
      console.error(`Attendance toggle error: `, data.message); // DEBUG
    }
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
