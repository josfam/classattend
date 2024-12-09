import { useCallback, useEffect, useState } from "react";
import EmptyClassrooms from "./EmptyClassrooms";
import { SuccessToast } from "@/components/Toasts";
import { useLocation, useNavigate } from "react-router-dom";
import { ClassItem } from "../../../../utils/schemasAndTypes/Types";
import { lecturerApiPath } from "@/utils/urlPaths/apiPaths";
import ClassesGrid from "../../base/components/ClassesGrid";
import FetchWithToken from "@/utils/auth/FetchWithToken";

const LecturerHome = () => {
  const [classList, setClassList] = useState<ClassItem[] | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // memoize the getClasses function
  const getClasses = useCallback(async () => {
    try {
      const response = await FetchWithToken({
        url: `${lecturerApiPath}classrooms`,
        options: {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setClassList(data.data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getClasses();
  }, [getClasses]);

  // show successful login toast message from another page if stated
  useEffect(() => {
    if (location.state?.showSuccessToast) {
      const successMessage = location.state.message;
      SuccessToast({ message: successMessage });

      // clear success message toast
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
      <div className="w-full">
        <h1 className="text-xl text-sky-800">Your classes</h1>
        <div className="mb-8 mt-4 h-1 w-full rounded-sm bg-sky-100"></div>
      </div>
      {classList ? (
        <>
          <ClassesGrid classList={classList} />
          <button
            className="btn-pri absolute bottom-4 right-6 h-14 w-14 rounded-full shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300"
            onClick={() => navigate("/lecturer/classrooms/add")}
          >
            Add
          </button>
        </>
      ) : (
        <EmptyClassrooms />
      )}
    </>
  );
};

export default LecturerHome;
