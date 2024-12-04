import { ErrorToast, SuccessToast } from "@/components/Toasts";
import { classroomApiPath } from "@/utils/urlPaths/apiPaths";
import { useState } from "react";

interface TakeAttendanceBtnProps {
  classHasStudents: undefined | boolean;
  classId: number;
}

const TakeAttendanceBtn = ({
  classHasStudents,
  classId,
}: TakeAttendanceBtnProps) => {
  const [takingAttendanceNow, setTakingAttendanceNow] =
    useState<boolean>(false);
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
      setTakingAttendanceNow(data.attendanceOpen);
      SuccessToast({ message: data.message });
    } else {
      ErrorToast({ message: data.message });
    }
  };
  return (
    <button
      className={`btn-pri w-52 text-nowrap ${!classHasStudents ? "border-0 bg-gray-400 hover:bg-gray-400" : ""} ${takingAttendanceNow}`}
      disabled={!classHasStudents}
      onClick={handleAttendanceToggle}
    >
      {takingAttendanceNow ? "Taking attendance" : "Take Attendance"}
    </button>
  );
};

export default TakeAttendanceBtn;
