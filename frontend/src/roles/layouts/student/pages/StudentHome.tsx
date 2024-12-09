import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SuccessToast } from "@/components/Toasts";
import { studentApiPath } from "@/utils/urlPaths/apiPaths";
import ClassesGrid from "../../base/components/ClassesGrid";
import { useQuery } from "@tanstack/react-query";
import {
  refetchStudentClassesInterval,
  studentClassesStaleTime,
} from "@/utils/timings/timings";

const StudentHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // get student classes periodically
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentClasses"],
    queryFn: async () => {
      const response = await fetch(`${studentApiPath}getclasses`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch your class list, try again");
      }
      // return the data
      return {
        isEmpty: result.data.length === 0,
        classes: result.data,
      };
    },
    retry: 3,
    refetchInterval: refetchStudentClassesInterval,
    staleTime: studentClassesStaleTime,
  });

  useEffect(() => {
    if (location.state?.showSuccessToast) {
      SuccessToast({ message: location.state.message });
    }
  }, [location.state]);

  useEffect(() => {
    // clear state
    navigate(location.pathname, { replace: true });
  }, [location.pathname, navigate]);

  if (isLoading || isError) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full">
        <h1 className="text-xl text-sky-800">Your classes</h1>
        <div className="mb-8 mt-4 h-1 w-full rounded-sm bg-sky-100"></div>
      </div>
      {data?.isEmpty ? (
        <div className="flex h-fit w-full flex-col gap-2 rounded-lg border-sky-300 bg-sky-100 p-8 text-xl text-sky-900">
          <p>You have not been enrolled in any classes</p>
          <p>Please ask your lecturer to enroll you and then try again</p>
        </div>
      ) : (
        <>
          <ClassesGrid classList={data?.classes} />
        </>
      )}
    </>
  );
};

export default StudentHome;
