import { useState } from "react";
import EmptyClassrooms from "./EmptyClassrooms";

const LecturerClassrooms = () => {
  const [classesFound, setClassesFound] = useState<boolean>(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
  const LECTURER_URL = import.meta.env.VITE_LECTURER_API_BASE_URL;
  const api_url = `${BACKEND_URL}${LECTURER_URL}`;
  const getClasses = async () => {
    try {
      const response = await fetch(`${api_url}classrooms`, {
        method: "POST",
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
  getClasses();

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
