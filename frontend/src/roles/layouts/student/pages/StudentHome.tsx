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
      {data?.isEmpty ? (
        <h1>No data</h1>
      ) : (
        <>
          <ClassesGrid classList={data?.classes} />
        </>
      )}
    </>
  );
};

export default StudentHome;
