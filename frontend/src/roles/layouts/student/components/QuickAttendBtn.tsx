interface QuickAttendBtnProps {
  classId: number;
  attendanceOpen: boolean;
}

const QuickAttendBtn = ({ classId, attendanceOpen }: QuickAttendBtnProps) => {
  console.log(classId);
  return (
    <button className="btn-sec relative text-base">
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
