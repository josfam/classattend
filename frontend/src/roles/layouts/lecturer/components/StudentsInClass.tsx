import { StudentDataInClassroom } from "@/utils/schemasAndTypes/Types";
import { BsThreeDots } from "react-icons/bs";

interface studentListProps {
  studentList: StudentDataInClassroom[];
}

const StudentsInClass = ({ studentList }: studentListProps) => {
  return (
    <div className="mb-8 mt-8 flex h-fit w-full min-w-[350px] flex-col gap-3 rounded-lg border border-slate-300 bg-slate-50 px-8 py-8">
      {studentList.map((studentData) => (
        <div
          className={`flex h-16 w-full items-center justify-start rounded-sm px-6 text-center font-medium transition-all duration-100 ${studentData.isPending ? "border border-gray-400 bg-gray-200 text-gray-600" : "border border-blue-400 bg-blue-200 text-sky-800 hover:font-semibold hover:shadow-sm hover:shadow-sky-300"} ${studentData.hasTakenAttendance ? "bg-emerald-400 text-emerald-700" : ""}}`}
          key={studentData.studentId}
        >
          <div className={`flex w-full justify-between text-lg`}>
            <div className="flex w-full justify-between gap-2 self-start">
              <div className="flex gap-2">
                <div>{studentData.firstName}</div>
                <div>{studentData.lastName}</div>
              </div>
              {studentData.isPending && <p>No account</p>}
            </div>
            <div className="flex items-center text-xl">
              {!studentData.isPending && (
                <button className={`btn-sec rounded-full border-0 p-1`}>
                  <BsThreeDots />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentsInClass;
