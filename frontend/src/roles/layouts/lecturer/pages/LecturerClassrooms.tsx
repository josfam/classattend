import { useCallback, useEffect, useState } from "react";
import EmptyClassrooms from "./EmptyClassrooms";
import { SuccessToast } from "@/components/Toasts";
import { useLocation, useNavigate } from "react-router-dom";
import { ClassItem } from "../../base/types/Types";
import ClassesGrid from "../../base/components/ClassesGrid";

const LecturerClassrooms = () => {
  const [classList, setClassList] = useState<ClassItem[] | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
  const LECTURER_URL = import.meta.env.VITE_LECTURER_API_BASE_URL;
  const api_url = `${BACKEND_URL}${LECTURER_URL}`;
  const navigate = useNavigate();
  const location = useLocation();

  // memoize the getClasses function
  const getClasses = useCallback(async () => {
    try {
      const response = await fetch(`${api_url}classrooms`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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

export default LecturerClassrooms;
