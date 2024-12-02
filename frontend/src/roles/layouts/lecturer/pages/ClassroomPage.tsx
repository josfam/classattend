import { useLocation } from "react-router-dom";
import { ClassItem } from "../../../../utils/schemasAndTypes/Types";
import { useQuery } from "@tanstack/react-query";
import { lecturerApiPath } from "@/utils/urlPaths/apiPaths";
import {
  refetchStudentListInterval,
  studentListStaleTime,
} from "@/utils/timings/timings";
import AddClassListInput from "../components/AddClassList";
import StudentsInClass from "../components/StudentsInClass";
import TakeAttendanceBtn from "../components/TakeAttendanceBtn";

const ClassroomPage = () => {
  const location = useLocation();
  const classItem: ClassItem = location.state?.classItem;

  // get the class list for display
  const { data, isLoading, isError } = useQuery({
    queryKey: ["classList"],
    queryFn: async () => {
      const response = await fetch(
        `${lecturerApiPath}getStudentList/${classItem.id}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch your class list, try again");
      }
      // returned to `data`
      return {
        isEmpty: result.data.length === 0,
        students: result.data,
      };
    },
    retry: 3,
    refetchInterval: refetchStudentListInterval,
    staleTime: studentListStaleTime,
  });

  if (isLoading || isError) {
    return <div>Loading...</div>;
  }
  console.log(`Data`, data);

  return (
    <>
      <div className="flex w-full min-w-[350px] flex-col items-center justify-between gap-3 rounded-lg border border-sky-300 bg-sky-100 px-10 py-4 text-sky-900 shadow-lg shadow-sky-100 md:flex-row">
        <div className="flex flex-col">
          <h1 className="self-start text-2xl">{`${classItem.className}`}</h1>
          <p className="self-center md:self-start">{`(${classItem.classCode})`}</p>
        </div>
        <TakeAttendanceBtn classHasStudents={!data?.isEmpty} />
      </div>
      <>
        {data?.isEmpty ? (
          <AddClassListInput classId={classItem.id} />
        ) : (
          <StudentsInClass studentList={data?.students} />
        )}
      </>
    </>
  );
};

export default ClassroomPage;
