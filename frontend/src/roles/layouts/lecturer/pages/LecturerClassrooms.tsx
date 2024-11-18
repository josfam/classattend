import { useEffect, useState } from "react";
import EmptyClassrooms from "./EmptyClassrooms";
import { SuccessToast } from "@/components/Toasts";
import { useLocation, useNavigate } from "react-router-dom";

const LecturerClassrooms = () => {
  const [classesFound, setClassesFound] = useState<boolean>(false);
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
        const classes = data.data;
        console.log(classes); // DEBUG
        if (classes && classes.length === 0) {
          setClassesFound(false);
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
        <h1 className="text-3xl">Your classrooms</h1>
      ) : (
        <EmptyClassrooms />
      )}
    </>
  );
};

export default LecturerClassrooms;
