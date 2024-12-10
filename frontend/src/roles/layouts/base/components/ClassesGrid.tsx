import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ClassItem } from "../../../../utils/schemasAndTypes/Types";
import { useNavigate } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import useUserStore from "@/store/userStore";
import { Role } from "@/utils/schemasAndTypes/SchemaConstants";
import QuickAttendBtn from "../../student/components/QuickAttendBtn";

interface ClassListProps {
  classList: ClassItem[] | null;
}

const ClassesGrid: React.FC<ClassListProps> = ({ classList }) => {
  const navigate = useNavigate();
  // check role, for conditional rendering of items
  const role = useUserStore((state) => state.role);
  const isLecturer = role == Role.Lecturer;

  const handleOpen = (classItem: ClassItem) => {
    // pass the entire class item when navigating
    if (isLecturer) {
      navigate(`/lecturer/classrooms/${classItem.id}`, {
        state: { classItem },
      });
    } else {
      navigate(`/student/classrooms/${classItem.id}`, { state: { classItem } });
    }
  };

  return (
    <div className="custom-800:grid-cols-2 grid grid-cols-1 gap-5 gap-y-8 lg:grid-cols-2 xl:grid-cols-3">
      {classList &&
        classList.map((classItem) => (
          <Card
            key={classItem.id}
            className="flex h-52 w-[350px] flex-col gap-2 shadow-lg transition-all duration-150 hover:scale-105 hover:shadow-xl"
          >
            <CardHeader className="h-fit rounded-t-lg bg-slate-500 px-0 pt-4">
              <CardTitle className="flex flex-col items-center justify-center gap-2 text-slate-50">
                <div className="w-5/6 overflow-x-clip text-ellipsis text-nowrap text-xl">
                  {classItem.className}
                </div>
                <div className="text-xl font-normal">{classItem.classCode}</div>
              </CardTitle>
            </CardHeader>
            <div className="mb-4 mt-auto flex w-full items-center justify-between px-8">
              {isLecturer ? (
                <button className="btn-invisible text-lg">edit</button>
              ) : (
                <QuickAttendBtn
                  classId={classItem.id}
                  attendanceOpen={classItem.attendanceOpen}
                />
              )}

              <button
                className={`${isLecturer ? "btn-sec btn-ter" : "btn-invisible"} group flex w-40 flex-row items-center justify-center gap-4 hover:font-medium`}
                onClick={() => handleOpen(classItem)}
              >
                <p className="text-lg">Open</p>
                <div className="flex h-7 w-7 justify-end text-2xl transition-transform delay-75 group-hover:rotate-45">
                  <MdArrowOutward className="self-center" />
                </div>
              </button>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default ClassesGrid;
