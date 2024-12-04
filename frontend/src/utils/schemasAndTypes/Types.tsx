// for every class object
type ClassItem = {
  id: number;
  classCode: string;
  className: string;
  classDescription: string;
  attendanceOpen: boolean;
};

type StudentListType = {
  "first name": string;
  "last name": string;
  "student email": string;
};

type StudentDataInClassroom = {
  firstName: string;
  isPending: boolean;
  lastName: string;
  studentId: number;
};

type uploadedStudentPayload = {
  classId: number;
  students: StudentListType[];
};

export type {
  ClassItem,
  StudentListType,
  uploadedStudentPayload,
  StudentDataInClassroom,
};
