import { z } from "zod";
import { AddClassroomSchema } from "@/utils/schemas/LecturerStudentSchemas";

// using z.infer to get the actual type of the schema
type classDataType = z.infer<typeof AddClassroomSchema>;

interface classDataProps {
  classData: classDataType;
}

const addClassroom = async ({ classData }: classDataProps) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
  const LECTURER_URL = import.meta.env.VITE_LECTURER_API_BASE_URL;
  const api_url = `${BACKEND_URL}${LECTURER_URL}`;

  try {
    const response = await fetch(`${api_url}addclassroom`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
      credentials: "include",
    });
    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "something went wrong" };
  }
};

export default addClassroom;
