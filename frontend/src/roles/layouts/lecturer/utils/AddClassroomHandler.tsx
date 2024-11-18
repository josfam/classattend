import { z } from "zod";
import { AddClassroomSchema } from "@/utils/schemas/LecturerStudentSchemas";

// using z.infer to get the actual type of the schema
type classDataType = z.infer<typeof AddClassroomSchema>;

interface classDataProps {
  classData: classDataType;
}

const addClassroom = ({ classData }: classDataProps) => {
  console.log(`class data`, classData);
};

export default addClassroom;
