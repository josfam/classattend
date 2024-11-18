import { useEffect, useState } from "react";
import EmptyClassrooms from "./EmptyClassrooms";
import { SuccessToast } from "@/components/Toasts";
import { useLocation, useNavigate } from "react-router-dom";
import { ClassItem } from "../../base/types/Types";
import ClassesGrid from "../../base/components/ClassesGrid";

const LecturerClassrooms = () => {
  const [classesFound, setClassesFound] = useState<boolean>(false);
  const [classList, setClassList] = useState<ClassItem[] | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
  const LECTURER_URL = import.meta.env.VITE_LECTURER_API_BASE_URL;
  const api_url = `${BACKEND_URL}${LECTURER_URL}`;
  const navigate = useNavigate();
  const location = useLocation();

  const getClasses = async () => {
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
        console.log(classList); // DEBUG
        if (classList && classList.length > 0) {
          setClassesFound(true);
        }
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

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
      {classesFound ? (
        <ClassesGrid classList={classList} />
      ) : (
        <EmptyClassrooms />
      )}
    </>
  );
};

export default LecturerClassrooms;
