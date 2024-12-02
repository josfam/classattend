import { classroomApiPath } from "@/utils/urlPaths/apiPaths";
import { useCallback, useEffect, useState } from "react";
import { ErrorToast } from "@/components/Toasts";

interface QuickAttendBtnProps {
  classId: number;
}

const QuickAttendBtn = ({ classId }: QuickAttendBtnProps) => {
  const [attendanceOpen, setAttendanceOpen] = useState<boolean>(false);

  const checkAttendanceIsOpen = useCallback(async () => {
    // check if the class is currently taking attendance
    try {
      const response = await fetch(
        `${classroomApiPath}isAttendanceOpen/${classId}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const data = await response.json();
      if (response.ok) {
        setAttendanceOpen(data.attendanceOpen);
      } else {
        ErrorToast({ message: data.message });
      }
    } catch (error) {
      console.error(error);
    }
  }, [classId]);

  useEffect(() => {
    checkAttendanceIsOpen();
  }, [checkAttendanceIsOpen]);

  return (
    <button className="btn-sec relative text-base">
      <span className="absolute left-1 top-1 flex h-4 w-4">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${!attendanceOpen ? "animate-ping bg-emerald-700" : "bg-gray-300"}`}
        ></span>
        <span
          className={`relative inline-flex h-4 w-4 rounded-full ${!attendanceOpen ? "bg-emerald-700" : "bg-gray-300"}`}
        ></span>
      </span>
      <div className="flex">
        <p>Attend</p>
      </div>
    </button>
  );
};

export default QuickAttendBtn;
