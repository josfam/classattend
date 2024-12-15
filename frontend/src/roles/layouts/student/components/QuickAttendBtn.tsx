import { ErrorToast, SuccessToast } from "@/components/Toasts";
import FetchWithToken from "@/utils/auth/FetchWithToken";
import { AttendanceData, decodedJWTToken } from "@/utils/schemasAndTypes/Types";
import { attendanceApiPath } from "@/utils/urlPaths/apiPaths";

interface QuickAttendBtnProps {
  classId: number;
  attendanceOpen: boolean;
  attendanceData: null | AttendanceData;
  lecturerId: number;
}

const QuickAttendBtn = ({
  classId,
  attendanceOpen,
  attendanceData,
  lecturerId,
}: QuickAttendBtnProps) => {
  console.log(classId);

  const handleAttendance = async (attendanceData: null | AttendanceData) => {
    if (!attendanceData) {
      ErrorToast({ message: "No attendance data found" });
      return;
    }
    try {
      const response = await FetchWithToken({
        url: `${attendanceApiPath}registerAttendance/${attendanceData.attendance_id}/${classId}/${lecturerId}`,
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      });
      const data = await response.json();
      if (response.ok) {
        SuccessToast({ message: data.message });
      } else {
        ErrorToast({ message: data.message });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      className="btn-sec relative text-base"
      onClick={() => handleAttendance(attendanceData)}
    >
      <span className="absolute left-1 top-1 flex h-4 w-4">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${attendanceOpen ? "animate-ping bg-emerald-700" : "bg-gray-300"}`}
        ></span>
        <span
          className={`relative inline-flex h-4 w-4 rounded-full ${attendanceOpen ? "bg-emerald-700" : "bg-gray-300"}`}
        ></span>
      </span>
      <div className="flex">
        <p>Attend</p>
      </div>
    </button>
  );
};

export default QuickAttendBtn;
