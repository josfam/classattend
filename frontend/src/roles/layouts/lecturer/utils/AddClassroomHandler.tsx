import { z } from "zod";
import { AddClassroomSchema } from "@/utils/schemasAndTypes/LecturerStudentSchemas";
import { lecturerApiPath } from "@/utils/urlPaths/apiPaths";
import FetchWithToken from "@/utils/auth/FetchWithToken";

// using z.infer to get the actual type of the schema
type classDataType = z.infer<typeof AddClassroomSchema>;

interface classDataProps {
  classData: classDataType;
}

const addClassroom = async ({ classData }: classDataProps) => {
  try {
    const response = await FetchWithToken({
      url: `${lecturerApiPath}addclassroom`,
      options: {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classData),
        credentials: "include",
      },
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
