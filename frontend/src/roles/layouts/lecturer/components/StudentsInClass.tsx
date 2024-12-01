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
          className={`flex h-14 w-full items-center justify-start rounded-sm px-6 text-center font-medium transition-all duration-100 hover:font-semibold hover:shadow-sm ${studentData.isPending ? "border border-gray-400 bg-gray-200 text-gray-500 hover:shadow-gray-400" : "border border-sky-300 bg-sky-100 text-sky-800 hover:shadow-sky-300"} `}
          key={studentData.studentId}
        >
          <div className={`flex w-full justify-between text-lg`}>
            <div className="self-start">
              {studentData.firstName} {studentData.lastName}
            </div>
            <div className="flex items-center text-xl">
              <BsThreeDots />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentsInClass;